// Exercise the real API and storage with isolated data; never touch visitor notes.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const http = require('node:http');
const ts = require('typescript');
const { randomUUID } = require('node:crypto');
const { NextRequest } = require('next/server');

require.extensions['.ts'] = (mod, file) => mod._compile(ts.transpileModule(fs.readFileSync(file, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true, target: ts.ScriptTarget.ES2022 },
}).outputText, file);

const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'portfolio-feedback-test-'));
for (const key of ['UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN', 'KV_REST_API_URL', 'KV_REST_API_TOKEN']) delete process.env[key];
process.env.FEEDBACK_DB_PATH = path.join(temp, 'feedback.sqlite');
const { POST } = require('../app/api/feedback/route.ts');
const { hasExplored, newExploration } = require('../components/feedback/exploration.ts');
const origin = 'https://portfolio.test';
const firstVisit = randomUUID();

function send(body, visit = firstVisit, options = {}) {
  return POST(new NextRequest(`${origin}/api/feedback`, {
    method: 'POST',
    headers: { Origin: origin, 'Content-Type': 'application/json', 'X-Feedback-Session': visit, ...options.headers },
    body: options.raw ?? JSON.stringify(body),
  }));
}

async function main() {
  const exploration = newExploration(Date.now());
  exploration.activeMs = 120_000;
  assert.equal(hasExplored(exploration), false, 'Time alone cannot trigger an invitation');
  exploration.sections = ['one', 'two', 'three', 'four'];
  assert.equal(hasExplored(exploration), true);
  exploration.activeMs = 119_999;
  assert.equal(hasExplored(exploration), false);
  exploration.activeMs = 120_000;
  exploration.sections = [];
  exploration.pages = { '/work/amodira': 90_000, '/work/checkout': 19_999 };
  assert.equal(hasExplored(exploration), false);
  exploration.pages['/work/checkout'] = 20_000;
  assert.equal(hasExplored(exploration), true);

  const note = { message: '  The audio helped me understand the idea.  ', page: '/work/amodira', website: '' };
  const response = await send(note);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Cache-Control'), 'private, no-store');
  await Promise.all(Array.from({ length: 15 }, () => send(note)));
  const db = await globalThis.portfolioFeedbackDb;
  assert.equal(db.prepare('SELECT count(*) AS count FROM feedback').get().count, 1);
  const stored = db.prepare('SELECT visit, note FROM feedback').get();
  assert.notEqual(stored.visit, firstVisit);
  const saved = JSON.parse(stored.note);
  assert.equal(saved.message, note.message.trim());
  assert.deepEqual(Object.keys(saved).sort(), ['createdAt', 'message', 'page']);
  assert.equal((await send(note, randomUUID())).status, 200);
  assert.equal(db.prepare('SELECT count(*) AS count FROM feedback').get().count, 2);
  assert.equal((await send({ ...note, website: 'https://bot.test' }, randomUUID())).status, 200);
  assert.equal(db.prepare('SELECT count(*) AS count FROM feedback').get().count, 2);
  for (const invalid of [{ ...note, message: '  ' }, { ...note, message: 'a'.repeat(2001) }, { ...note, page: '//bad.test?secret' }, { ...note, name: 123 }, { ...note, name: null }, { ...note, name: 'a'.repeat(81) }, null]) {
    assert.equal((await send(invalid)).status, 400);
  }
  assert.equal((await send(note, 'invalid')).status, 400);
  assert.equal((await send(note, firstVisit, { headers: { Origin: 'https://other.test' } })).status, 403);
  assert.equal((await send(note, firstVisit, { raw: '{' })).status, 400);
  assert.equal((await send(note, firstVisit, { raw: 'x'.repeat(16_385) })).status, 413);
  db.close();
  delete globalThis.portfolioFeedbackDb;
  await send(note);
  assert.equal((await globalThis.portfolioFeedbackDb).prepare('SELECT count(*) AS count FROM feedback').get().count, 2, 'Notes survive reopening');
  const namedNote = { ...note, message: 'A note with a nickname', name: '  Alex ✨  ' };
  assert.equal((await send(namedNote, randomUUID())).status, 200);
  assert.equal((await send({ ...note, message: 'An anonymous note', name: '  ' }, randomUUID())).status, 200);
  const notes = (await globalThis.portfolioFeedbackDb).prepare('SELECT note FROM feedback').all().map(row => JSON.parse(row.note));
  assert.equal(notes.find(value => value.message === namedNote.message).name, 'Alex ✨');
  assert.equal('name' in notes.find(value => value.message === 'An anonymous note'), false);

  let command;
  const server = http.createServer((req, res) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => { command = JSON.parse(body); res.setHeader('Content-Type', 'application/json'); res.end('{"result":1}'); });
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  process.env.KV_REST_API_URL = `http://127.0.0.1:${server.address().port}`;
  process.env.KV_REST_API_TOKEN = 'local-test-token';
  try {
    assert.equal((await send({ ...note, name: '  Avery  ' })).status, 200);
    assert.equal(command[0].toLowerCase(), 'hsetnx');
    assert.equal(command[1], 'portfolio:feedback:notes');
    assert.equal(JSON.parse(command[3]).message, note.message.trim());
    assert.equal(JSON.parse(command[3]).name, 'Avery');
  } finally { await new Promise(resolve => server.close(resolve)); }
  delete process.env.KV_REST_API_URL;
  delete process.env.KV_REST_API_TOKEN;
  delete process.env.FEEDBACK_DB_PATH;
  process.env.NODE_ENV = 'production';
  assert.equal((await send(note)).status, 503, 'Production cannot silently save to ephemeral disk');
  console.log('Feedback checks passed: exploration thresholds, validation, private writes, concurrent deduplication, persistence, Redis adapter and missing production storage.');
}

main().catch(error => { console.error(error); process.exitCode = 1; }).finally(async () => {
  if (globalThis.portfolioFeedbackDb) (await globalThis.portfolioFeedbackDb).close();
  fs.rmSync(temp, { recursive: true, force: true });
});
