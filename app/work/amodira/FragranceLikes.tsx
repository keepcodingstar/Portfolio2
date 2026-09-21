'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { emptyLikeCounts, fragranceSlugs, isVisitId, type FragranceSlug, type LikesSnapshot } from './fragrance-likes-contract';
import local from './amodira.module.css';

const SESSION_KEY = 'amodira-listening-visit-v1';
const SESSION_IDLE_MS = 30 * 60 * 1000;
type Visit = { id: string; lastActive: number };
let memoryVisit: Visit | null = null;

function activeVisit(): Visit {
  let saved = memoryVisit;
  try { saved = JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null') ?? saved; } catch { /* Storage may be unavailable. */ }
  const now = Date.now();
  const visit = saved && isVisitId(saved.id) && Number.isFinite(saved.lastActive) && now - saved.lastActive < SESSION_IDLE_MS
    ? { ...saved, lastActive: now } : { id: crypto.randomUUID(), lastActive: now };
  memoryVisit = visit;
  try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(visit)); } catch { /* Keep the visit in memory for this tab. */ }
  return visit;
}

type LikesState = LikesSnapshot & { pending: FragranceSlug[]; ready: boolean; error: string };
type LikesContext = LikesState & { like: (slug: FragranceSlug) => void };
const Context = createContext<LikesContext | null>(null);
const initialState: LikesState = { liked: [], counts: null, pending: [], ready: false, error: '' };

export function FragranceLikesProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LikesState>(initialState);
  const session = useRef('');
  const mounted = useRef(false);
  const pending = useRef(new Set<FragranceSlug>());
  const liked = useRef(new Set<FragranceSlug>());

  const apply = useCallback((id: string, data: LikesSnapshot) => {
    if (!mounted.current || session.current !== id) return;
    for (const slug of data.liked) liked.current.add(slug);
    setState((current) => {
      if (session.current !== id) return current;
      const counts = data.counts || current.counts ? emptyLikeCounts() : null;
      // Concurrent votes can return out of order. Totals and session likes only increase.
      if (counts) for (const slug of fragranceSlugs) counts[slug] = Math.max(current.counts?.[slug] ?? 0, data.counts?.[slug] ?? 0);
      return { ...current, liked: [...liked.current], counts, ready: true };
    });
  }, []);

  const refresh = useCallback(async (id: string) => {
    try {
      const response = await fetch('/api/fragrance-likes', { cache: 'no-store', signal: AbortSignal.timeout(10000), headers: { 'X-Fragrance-Session': id } });
      if (!response.ok) return;
      apply(id, await response.json());
    } catch { /* A later focus or vote will retry; never invent totals. */ }
  }, [apply]);

  const touchVisit = useCallback(() => {
    const visit = activeVisit();
    if (session.current !== visit.id) {
      session.current = visit.id;
      pending.current.clear();
      liked.current.clear();
      setState({ ...initialState, ready: true });
      void refresh(visit.id);
    }
    return visit.id;
  }, [refresh]);

  useEffect(() => {
    mounted.current = true;
    touchVisit();
    const onVisible = () => {
      if (document.visibilityState === 'visible') void refresh(touchVisit());
    };
    document.addEventListener('pointerdown', touchVisit, { passive: true });
    document.addEventListener('keydown', touchVisit);
    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('focus', onVisible);
    return () => {
      mounted.current = false;
      document.removeEventListener('pointerdown', touchVisit);
      document.removeEventListener('keydown', touchVisit);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('focus', onVisible);
    };
  }, [refresh, touchVisit]);

  async function like(slug: FragranceSlug) {
    const id = touchVisit();
    if (pending.current.has(slug) || liked.current.has(slug)) return;
    pending.current.add(slug);
    setState((current) => ({ ...current, pending: [...pending.current], error: '' }));
    try {
      const response = await fetch('/api/fragrance-likes', {
        method: 'POST', signal: AbortSignal.timeout(10000), headers: { 'Content-Type': 'application/json', 'X-Fragrance-Session': id }, body: JSON.stringify({ slug }),
      });
      if (!response.ok) throw new Error('Couldn’t save your like. Please try again.');
      apply(id, await response.json());
    } catch {
      if (mounted.current && session.current === id) setState((current) => ({ ...current, error: 'Couldn’t save your like. Please try again.' }));
    } finally {
      if (mounted.current && session.current === id) {
        pending.current.delete(slug);
        setState((current) => ({ ...current, pending: [...pending.current] }));
      }
    }
  }

  return <Context.Provider value={{ ...state, like }}>{children}</Context.Provider>;
}

function useLikes() {
  const value = useContext(Context);
  if (!value) throw new Error('Fragrance likes require FragranceLikesProvider.');
  return value;
}

export function FragranceLikeButton({ slug, name }: { slug: FragranceSlug; name: string }) {
  const { liked, counts, pending, ready, like } = useLikes();
  const selected = liked.includes(slug);
  const busy = pending.includes(slug);
  const count = counts?.[slug];
  const showCount = count !== undefined && count > 0;
  const countLabel = showCount ? `, ${count} ${count === 1 ? 'like' : 'likes'}` : '';
  return <button type="button" className={local.likeButton} data-liked={selected || undefined}
    aria-label={`${selected ? 'Liked' : 'Like'} ${name} soundtrack${countLabel}`} aria-pressed={selected}
    aria-disabled={!ready || selected || busy} aria-busy={busy || undefined}
    onClick={() => { if (ready) void like(slug); }}>
    {showCount && <span className={local.likeCount}>{new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(count)}</span>}
    <svg viewBox="0 0 24 24" fill={selected ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.4 4.8a5.4 5.4 0 0 0-7.6 0l-.8.8-.8-.8a5.4 5.4 0 0 0-7.6 7.6L12 21l8.4-8.6a5.4 5.4 0 0 0 0-7.6Z" />
    </svg>
  </button>;
}

export function FragranceLikesHint() {
  const { counts, error } = useLikes();
  return <span className={local.likesHint} role="status" aria-live="polite">
    {error || (counts ? 'Likes from all visits. Pick as many favourites as you like.' : 'Like a soundtrack to reveal everyone’s favourites.')}
  </span>;
}
