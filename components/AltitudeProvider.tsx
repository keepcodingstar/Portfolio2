'use client';

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

/**
 * The spine of the site: a true CENTRE-ANCHOR scroll.
 *
 * The document is in natural top→bottom order — [space] · [sky/centre] ·
 * [work] · [ground/footer] — but the page loads scrolled to the SKY zone (the
 * hinge: "Sameer, now"). Scrolling UP rises into space (the creative side);
 * scrolling DOWN descends through the colours of the sky to the ground.
 *
 * This provider:
 *   • anchors the viewport at the sky zone on load (no mid-page flash),
 *   • cross-fades the atmosphere layers directly against the viewport's altitude,
 *   • tracks the active zone for the glass side-nav.
 *
 * Native scroll only — no smooth-scroll dependency. `goTo` uses the browser's
 * own smooth behaviour; reduced motion gets instant jumps.
 */

export type ZoneId = 'zone-space' | 'zone-sky' | 'zone-work' | 'zone-ground';

type Ctx = {
  active: ZoneId;
  goTo: (zone: ZoneId, instant?: boolean) => void;
};

const AltitudeCtx = createContext<Ctx | null>(null);
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function useAltitude(): Ctx {
  const ctx = useContext(AltitudeCtx);
  if (!ctx) throw new Error('useAltitude must be used within <AltitudeProvider>');
  return ctx;
}

// altitude keyframes: layer opacities at each zone's vertical midpoint
type Mix = { space: number; sky: number; ground: number };
const KEY: Record<ZoneId, Mix> = {
  'zone-space': { space: 1, sky: 0, ground: 0 },   // literal black space (black hole)
  'zone-sky': { space: 0, sky: 1, ground: 0 },     // pure bright sky-blue — you land here
  'zone-work': { space: 0, sky: 1, ground: 0.18 }, // still sky, warming at the edge
  'zone-ground': { space: 0, sky: 0.2, ground: 1 },// sunset → warm ground
};
const ORDER: ZoneId[] = ['zone-space', 'zone-sky', 'zone-work', 'zone-ground'];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// A new Home link gets a new history entry; Back/Forward keeps the original
// entry and its scroll position. Keep coordinates in memory so scrolling does
// not require continuous history.replaceState calls, and reloads keep the intro.
const HOME_ENTRY_KEY = 'portfolioHomeEntry';
type HomePosition = { x: number; y: number };
const homePositions = new Map<string, HomePosition>();
const positionStorageKey = (entry: string) => `portfolio:home-scroll:${entry}`;
let pendingHistoryEntry: string | undefined;

// Capture before an uncached Back navigation fetches the route: Next may
// replace custom history fields while the home component is still loading.
export function captureHomeHistoryEntry(value: unknown) {
  pendingHistoryEntry = typeof value === 'string' ? value : undefined;
}

function readStoredPosition(entry: string): HomePosition | undefined {
  try {
    const value = JSON.parse(sessionStorage.getItem(positionStorageKey(entry)) ?? 'null');
    if (value && Number.isFinite(value.x) && Number.isFinite(value.y)) return { x: value.x, y: value.y };
  } catch { /* Browsing still works when session storage is unavailable. */ }
}

export default function AltitudeProvider({ children }: { children: ReactNode }) {
  const content = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<ZoneId>('zone-sky');
  const activeRef = useRef<ZoneId>('zone-sky');
  // stable viewport height: mobile URL-bar show/hide fires resize events with a
  // height-only delta, and chasing the new innerHeight mid-scroll makes the
  // atmosphere cross-fade and active zone jump. Refreshed only on width change
  // (real resize / orientation flip) — see the resize handler below.
  const vhRef = useRef(0);
  const layers = useRef<{ space: HTMLElement[]; sky: HTMLElement[]; ground: HTMLElement[] }>({ space: [], sky: [], ground: [] });

  // measure each zone's document-Y midpoint
  function mids(): { id: ZoneId; mid: number }[] {
    return ORDER.map((id) => {
      const el = document.getElementById(id);
      if (!el) return { id, mid: 0 };
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      return { id, mid: top + rect.height / 2 };
    });
  }

  function update() {
    const y = window.scrollY + vhRef.current / 2;
    const ms = mids();

    // find bracketing zones for the current altitude
    let lo = ms[0];
    let hi = ms[ms.length - 1];
    for (let i = 0; i < ms.length - 1; i++) {
      if (y >= ms[i].mid && y <= ms[i + 1].mid) {
        lo = ms[i];
        hi = ms[i + 1];
        break;
      }
    }
    if (y <= ms[0].mid) {
      lo = hi = ms[0];
    } else if (y >= ms[ms.length - 1].mid) {
      lo = hi = ms[ms.length - 1];
    }

    const span = hi.mid - lo.mid;
    const t = span > 0 ? (y - lo.mid) / span : 0;
    const a = KEY[lo.id];
    const b = KEY[hi.id];

    // Across the SPACE→SKY span the creative gallery sits in the middle. A
    // linear fade would wash it half-way into bright sky; instead we delay the
    // rise (t^2.4) so the deep cosmos is held dark the whole way through the
    // creative band and only resolves into the sky-blue late, at the hinge —
    // one unified gradient that moves to the dark side, not a patchwork.
    const atmos =
      lo.id === 'zone-space' && hi.id === 'zone-sky' ? Math.pow(t, 2.4) : t;

    // Update only the five visual layers. Inherited root variables used to
    // invalidate styles throughout the whole page on every scroll frame.
    for (const channel of ['space', 'sky', 'ground'] as const) {
      const opacity = lerp(a[channel], b[channel], channel === 'ground' ? t : atmos).toFixed(3);
      for (const layer of layers.current[channel]) {
        if (layer.style.opacity !== opacity) layer.style.opacity = opacity;
      }
    }

    // nearest zone = active (for the rail)
    let nearest: ZoneId = ms[0].id;
    let best = Infinity;
    for (const m of ms) {
      const d = Math.abs(m.mid - y);
      if (d < best) {
        best = d;
        nearest = m.id;
      }
    }
    if (nearest !== activeRef.current) {
      activeRef.current = nearest;
      setActive(nearest);
    }
  }

  function centerOffset(id: ZoneId): number {
    const el = document.getElementById(id);
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    return top + rect.height / 2 - vhRef.current / 2;
  }

  function goTo(zone: ZoneId, instant = false) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const target = Math.max(0, centerOffset(zone));
    window.scrollTo({ top: target, behavior: reduced || instant ? 'instant' : 'smooth' });
  }

  useIsomorphicLayoutEffect(() => {
    // The root layout's inline anchor only runs on a document load. On a client
    // navigation, stage the content before paint while Next finishes its scroll
    // handling, so the scrapbook/work section cannot flash ahead of the hero.
    const page = content.current;
    page?.setAttribute('data-positioning', '');
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const savedEntry: unknown = pendingHistoryEntry ?? window.history.state?.[HOME_ENTRY_KEY];
    pendingHistoryEntry = undefined;
    const entry = typeof savedEntry === 'string' ? savedEntry : crypto.randomUUID();
    // A project reload starts a new JS document, so also retain the departure
    // position for that tab. A deliberate home reload still plays its intro.
    const restorePosition = homePositions.get(entry)
      ?? (!document.body.classList.contains('preloading') ? readStoredPosition(entry) : undefined);
    window.history.replaceState({ ...window.history.state, [HOME_ENTRY_KEY]: entry }, '');
    let departing = false;
    const rememberPosition = () => {
      // A route may change its URL before this page unmounts. Never save the
      // next page's scroll, or overwrite a different Home visit on browser Back.
      if (departing || window.location.pathname !== '/') return;
      const currentEntry: unknown = window.history.state?.[HOME_ENTRY_KEY];
      if (currentEntry !== undefined && currentEntry !== entry) return;
      // Next can replace custom history fields while refreshing its route
      // state. Reattach this entry before leaving so Back can still find it.
      if (currentEntry !== entry) {
        window.history.replaceState({ ...window.history.state, [HOME_ENTRY_KEY]: entry }, '');
      }
      homePositions.set(entry, { x: window.scrollX, y: window.scrollY });
    };
    const persistPosition = () => {
      const position = homePositions.get(entry);
      if (!position) return;
      try { sessionStorage.setItem(positionStorageKey(entry), JSON.stringify(position)); }
      catch { /* The in-memory position remains available. */ }
    };
    const rememberDeparture = (event: Event) => {
      rememberPosition();
      persistPosition();
      const click = event as MouseEvent;
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (event.type === 'click' && link instanceof HTMLAnchorElement && click.button === 0
        && !click.metaKey && !click.ctrlKey && !click.shiftKey && !click.altKey
        && (!link.target || link.target === '_self')) {
        const destination = new URL(link.href);
        // Keep the departure snapshot while a route transition replaces the
        // document. Its shorter page can otherwise clamp the old scroll value.
        departing = destination.origin === window.location.origin && destination.pathname !== '/';
      }
    };

    vhRef.current = window.innerHeight;
    layers.current = {
      space: Array.from(document.querySelectorAll<HTMLElement>('.altitude-bg .space, .starfield')),
      sky: Array.from(document.querySelectorAll<HTMLElement>('.altitude-bg .sky, .cloudfield')),
      ground: Array.from(document.querySelectorAll<HTMLElement>('.altitude-bg .ground')),
    };
    let vw = window.innerWidth;
    const onResize = () => {
      // height-only delta = the mobile URL bar, not a real resize — ignore it
      if (window.innerWidth === vw) return;
      vw = window.innerWidth;
      vhRef.current = window.innerHeight;
      update();
    };

    let raf = 0;
    const onScroll = () => {
      rememberPosition();
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };

    // Restore a history visit exactly; new Home/section links keep their own
    // destination instead of inheriting the last visit's scroll position.
    const anchor = () => {
      const requested = window.location.hash.slice(1) as ZoneId;
      const zone = ORDER.includes(requested) ? requested : 'zone-sky';
      window.scrollTo({
        left: restorePosition?.x ?? 0,
        top: restorePosition?.y ?? Math.max(0, centerOffset(zone)),
        behavior: 'instant',
      });
      update();
      document.body.classList.add('altitude-ready');
    };
    anchor();
    const anchorRaf = requestAnimationFrame(() => {
      // One correction after the router's commit, still covered by the local
      // staging state. This is positioning, not another homepage intro.
      anchor();
      page?.removeAttribute('data-positioning');
      rememberPosition();
      window.dispatchEvent(new CustomEvent('altitude:positioned', {
        detail: { restored: restorePosition !== undefined },
      }));
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    // Capture before a project's link starts its route/image transition.
    document.addEventListener('click', rememberDeparture, true);
    window.addEventListener('pagehide', rememberDeparture);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      cancelAnimationFrame(anchorRaf);
      page?.removeAttribute('data-positioning');
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('click', rememberDeparture, true);
      window.removeEventListener('pagehide', rememberDeparture);
      persistPosition();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AltitudeCtx.Provider value={{ active, goTo }}>
      {/* one continuous atmosphere — layers cross-fade by altitude */}
      <div className="altitude-bg" aria-hidden>
        <div className="layer space" />
        <div className="layer sky" />
        <div className="layer ground" />
      </div>
      <div className="altitude-content" ref={content}>{children}</div>
    </AltitudeCtx.Provider>
  );
}
