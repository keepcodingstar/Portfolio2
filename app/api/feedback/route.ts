import { NextRequest, NextResponse } from 'next/server';
import { saveFeedback } from '../../../server/feedback';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'private, no-store' } });
}

export async function POST(request: NextRequest) {
  if (request.headers.get('origin') !== request.nextUrl.origin) return json({ error: 'Invalid origin.' }, 403);
  const visit = request.headers.get('X-Feedback-Session');
  if (!visit || !uuid.test(visit)) return json({ error: 'Invalid visit.' }, 400);
  if (!request.headers.get('content-type')?.startsWith('application/json')) return json({ error: 'Invalid request.' }, 400);
  let body;
  try {
    // Bound the stream as well as the message, including chunked requests.
    const reader = request.body?.getReader();
    if (!reader) return json({ error: 'Invalid request.' }, 400);
    const chunks: Uint8Array[] = [];
    let length = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      length += value.length;
      if (length > 16_384) { await reader.cancel(); return json({ error: 'Note is too long.' }, 413); }
      chunks.push(value);
    }
    body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch { return json({ error: 'Invalid request.' }, 400); }
  if (typeof body?.message !== 'string' || !body.message.trim() || body.message.length > 2000
    || (body.name !== undefined && (typeof body.name !== 'string' || body.name.length > 80))
    || typeof body.page !== 'string' || body.page.length > 200 || !/^\/[a-zA-Z0-9/_-]*$/.test(body.page)
    || (body.website !== undefined && typeof body.website !== 'string')) return json({ error: 'Invalid note.' }, 400);
  // A field hidden from people catches simple form bots without adding friction.
  if (body.website) return json({ saved: true });
  try {
    await saveFeedback(visit, { message: body.message.trim(), ...(body.name?.trim() ? { name: body.name.trim() } : {}), page: body.page, createdAt: new Date().toISOString() });
    return json({ saved: true });
  } catch { return json({ error: 'Your note could not be saved. Please try again.' }, 503); }
}
