import { createHash } from 'node:crypto';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import type { DatabaseSync } from 'node:sqlite';
import { Redis } from '@upstash/redis';

export type FeedbackNote = { message: string; name?: string; page: string; createdAt: string };
const cache = globalThis as typeof globalThis & { portfolioFeedbackDb?: Promise<DatabaseSync> };

async function localDatabase() {
  if (!cache.portfolioFeedbackDb) {
    cache.portfolioFeedbackDb = (async () => {
      const location = process.env.FEEDBACK_DB_PATH ?? path.join(process.cwd(), '.data', 'feedback.sqlite');
      await mkdir(path.dirname(location), { recursive: true });
      const { DatabaseSync } = await import('node:sqlite');
      const db = new DatabaseSync(location);
      db.exec(`PRAGMA busy_timeout = 5000; PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS feedback (visit TEXT PRIMARY KEY, note TEXT NOT NULL);`);
      return db;
    })().catch(error => { delete cache.portfolioFeedbackDb; throw error; });
  }
  return cache.portfolioFeedbackDb;
}

export async function saveFeedback(visitId: string, note: FeedbackNote) {
  const session = createHash('sha256').update(visitId).digest('hex');
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (url && token) {
    const redis = new Redis({ url, token, enableTelemetry: false, enableAutoPipelining: false, signal: () => AbortSignal.timeout(8000) });
    // One note per visit. Retrying a timed-out request cannot duplicate a note.
    await redis.hsetnx('portfolio:feedback:notes', session, JSON.stringify(note));
    return;
  }
  if (url || token || (process.env.NODE_ENV === 'production' && !process.env.FEEDBACK_DB_PATH)) {
    throw new Error('Configure persistent feedback storage.');
  }
  const db = await localDatabase();
  db.prepare('INSERT OR IGNORE INTO feedback (visit, note) VALUES (?, ?)').run(session, JSON.stringify(note));
}
