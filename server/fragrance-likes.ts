import { createHash } from 'node:crypto';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import type { DatabaseSync } from 'node:sqlite';
import { Redis } from '@upstash/redis';
import { emptyLikeCounts, fragranceSlugs, isFragranceSlug, type FragranceSlug, type LikesSnapshot } from '../app/work/amodira/fragrance-likes-contract';

// One atomic Redis operation deduplicates the vote, increments the total and reads results.
const voteScript = `
if ARGV[1] ~= '' then
  if redis.call('SADD', KEYS[2], ARGV[1]) == 1 then
    redis.call('HINCRBY', KEYS[1], ARGV[1], 1)
  end
end
if redis.call('EXISTS', KEYS[2]) == 1 then redis.call('EXPIRE', KEYS[2], 86400) end
return {redis.call('HGETALL', KEYS[1]), redis.call('SMEMBERS', KEYS[2])}
`;

function snapshot(totals: Array<[string, number]>, votes: string[]): LikesSnapshot {
  const liked = votes.filter(isFragranceSlug);
  if (!liked.length) return { liked, counts: null };
  const counts = emptyLikeCounts();
  for (const [slug, count] of totals) if (isFragranceSlug(slug)) counts[slug] = count;
  return { liked, counts };
}

async function redisSnapshot(url: string, token: string, session: string, slug?: FragranceSlug): Promise<LikesSnapshot> {
  const redis = new Redis({ url, token, automaticDeserialization: false, enableTelemetry: false, enableAutoPipelining: false, signal: () => AbortSignal.timeout(8000) });
  const [flatTotals, votes] = await redis.eval<string[], [string[], string[]]>(voteScript,
    ['portfolio:{amodira-likes}:totals', `portfolio:{amodira-likes}:visit:${session}`], [slug ?? '']);
  const totals: Array<[string, number]> = [];
  for (let i = 0; i < flatTotals.length; i += 2) totals.push([flatTotals[i], Number(flatTotals[i + 1])]);
  return snapshot(totals, votes);
}

const cache = globalThis as typeof globalThis & { fragranceLikesDb?: Promise<DatabaseSync> };

async function localDatabase() {
  if (!cache.fragranceLikesDb) {
    cache.fragranceLikesDb = (async () => {
      const location = process.env.FRAGRANCE_LIKES_DB_PATH ?? path.join(process.cwd(), '.data', 'fragrance-likes.sqlite');
      await mkdir(path.dirname(location), { recursive: true });
      const { DatabaseSync } = await import('node:sqlite');
      const db = new DatabaseSync(location);
      db.exec(`
        PRAGMA busy_timeout = 5000;
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS fragrance_totals (slug TEXT PRIMARY KEY, total INTEGER NOT NULL DEFAULT 0);
        CREATE TABLE IF NOT EXISTS fragrance_votes (visit TEXT NOT NULL, slug TEXT NOT NULL, PRIMARY KEY (visit, slug));
      `);
      const insert = db.prepare('INSERT OR IGNORE INTO fragrance_totals (slug) VALUES (?)');
      for (const slug of fragranceSlugs) insert.run(slug);
      return db;
    })().catch((error) => { delete cache.fragranceLikesDb; throw error; });
  }
  return cache.fragranceLikesDb;
}

async function localSnapshot(session: string, slug?: FragranceSlug): Promise<LikesSnapshot> {
  const db = await localDatabase();
  db.exec('BEGIN IMMEDIATE');
  try {
    if (slug) {
      const { changes } = db.prepare('INSERT OR IGNORE INTO fragrance_votes (visit, slug) VALUES (?, ?)').run(session, slug);
      if (changes) db.prepare('UPDATE fragrance_totals SET total = total + 1 WHERE slug = ?').run(slug);
    }
    const votes = db.prepare('SELECT slug FROM fragrance_votes WHERE visit = ?').all(session) as { slug: string }[];
    const totals = db.prepare('SELECT slug, total FROM fragrance_totals').all() as { slug: string; total: number }[];
    const result = snapshot(totals.map(({ slug: key, total }) => [key, total]), votes.map(({ slug: key }) => key));
    db.exec('COMMIT');
    return result;
  } catch (error) { db.exec('ROLLBACK'); throw error; }
}

export async function readOrLike(visitId: string, slug?: FragranceSlug): Promise<LikesSnapshot> {
  const session = createHash('sha256').update(visitId).digest('hex');
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (url && token) return redisSnapshot(url, token, session, slug);
  if (url || token || (process.env.NODE_ENV === 'production' && !process.env.FRAGRANCE_LIKES_DB_PATH)) {
    // Serverless disks cannot provide shared totals. Never silently use an ephemeral file there.
    throw new Error('Configure a shared likes database.');
  }
  return localSnapshot(session, slug);
}
