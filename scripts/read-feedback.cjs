// Private owner tool; no public route can read visitor notes.
require('@next/env').loadEnvConfig(process.cwd());
const path = require('node:path');
const fs = require('node:fs');

async function main() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  let notes;
  if (url && token) {
    const { Redis } = require('@upstash/redis');
    const redis = new Redis({ url, token, automaticDeserialization: false, enableTelemetry: false, signal: () => AbortSignal.timeout(8000) });
    notes = (await redis.hvals('portfolio:feedback:notes')).map(value => JSON.parse(value));
  } else if (url || token) {
    throw new Error('Both Redis URL and token are required.');
  } else {
    const location = process.env.FEEDBACK_DB_PATH || path.join(process.cwd(), '.data', 'feedback.sqlite');
    if (!fs.existsSync(location)) notes = [];
    else {
      const { DatabaseSync } = require('node:sqlite');
      const db = new DatabaseSync(location, { readOnly: true });
      try { notes = db.prepare('SELECT note FROM feedback').all().map(row => JSON.parse(row.note)); }
      finally { db.close(); }
    }
  }
  notes.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  process.stdout.write(`${JSON.stringify(notes, null, 2)}\n`);
}

main().catch(() => { console.error('Could not read feedback. Check the database connection and server-only environment variables.'); process.exitCode = 1; });
