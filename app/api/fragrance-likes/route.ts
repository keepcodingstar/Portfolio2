import { NextRequest, NextResponse } from 'next/server';
import { isFragranceSlug, isVisitId } from '../../work/amodira/fragrance-likes-contract';
import { readOrLike } from '../../../server/fragrance-likes';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'private, no-store', Vary: 'X-Fragrance-Session' } });
}

export async function GET(request: NextRequest) {
  const visit = request.headers.get('X-Fragrance-Session');
  if (!isVisitId(visit)) return json({ error: 'Invalid visit.' }, 400);
  try { return json(await readOrLike(visit)); }
  catch { return json({ error: 'Likes are unavailable. Please try again.' }, 503); }
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin && origin !== request.nextUrl.origin) return json({ error: 'Invalid origin.' }, 403);
  const visit = request.headers.get('X-Fragrance-Session');
  if (!isVisitId(visit)) return json({ error: 'Invalid visit.' }, 400);
  let body;
  try {
    const text = await request.text();
    if (text.length > 1024) return json({ error: 'Invalid request.' }, 400);
    body = JSON.parse(text);
  } catch { return json({ error: 'Invalid request.' }, 400); }
  if (!isFragranceSlug(body?.slug)) return json({ error: 'Unknown fragrance.' }, 400);
  try { return json(await readOrLike(visit, body.slug)); }
  catch { return json({ error: 'Your like could not be saved. Please try again.' }, 503); }
}
