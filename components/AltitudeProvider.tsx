'use client';

import {
  createContext,
  useContext,
  useEffect,
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
 *   • cross-fades three fixed atmosphere layers against the viewport's altitude
 *     (CSS vars --space-o / --sky-o / --ground-o),
 *   • tracks the active zone for the glass side-nav.
 *
 * Native scroll only — no smooth-scroll dependency. `goTo` uses the browser's
 * own smooth behaviour; reduced motion gets instant jumps.
 */

export type ZoneId = 'zone-space' | 'zone-sky' | 'zone-work' | 'zone-ground';

type Ctx = {
  active: ZoneId;
  goTo: (zone: ZoneId) => void;
};

const AltitudeCtx = createContext<Ctx | null>(null);

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

export default function AltitudeProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<ZoneId>('zone-sky');
  const activeRef = useRef<ZoneId>('zone-sky');
  // stable viewport height: mobile URL-bar show/hide fires resize events with a
  // height-only delta, and chasing the new innerHeight mid-scroll makes the
  // atmosphere cross-fade and active zone jump. Refreshed only on width change
  // (real resize / orientation flip) — see the resize handler below.
  const vhRef = useRef(0);

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

    const root = document.documentElement.style;
    root.setProperty('--space-o', lerp(a.space, b.space, atmos).toFixed(3));
    root.setProperty('--sky-o', lerp(a.sky, b.sky, atmos).toFixed(3));
    root.setProperty('--ground-o', lerp(a.ground, b.ground, t).toFixed(3));

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

  function goTo(zone: ZoneId) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const target = Math.max(0, centerOffset(zone));
    window.scrollTo({ top: target, behavior: reduced ? 'auto' : 'smooth' });
  }

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    vhRef.current = window.innerHeight;
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
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };

    // anchor at the sky zone after first layout, then reveal (no mid-page flash)
    const anchor = () => {
      window.scrollTo(0, Math.max(0, centerOffset('zone-sky')));
      update();
      document.body.classList.add('altitude-ready');
    };
    requestAnimationFrame(() => requestAnimationFrame(anchor));

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
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
      {children}
    </AltitudeCtx.Provider>
  );
}
