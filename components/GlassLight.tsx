'use client';

import { useEffect } from 'react';

/**
 * Light-reactive glass. A single document-level pointer listener feeds every
 * `.glass--react` panel its local cursor position as CSS custom props
 * (`--mx` / `--my`, in percent). The CSS uses those to drive a travelling
 * specular sheen and a spotlight rim — so the panes catch the light like real
 * glass as the cursor passes.
 *
 * Deliberately NOT React state: writes go straight to element.style outside the
 * render cycle, rAF-batched, and only to panels currently on screen (tracked by
 * one IntersectionObserver) so a long page never thrashes. The whole effect is
 * skipped on coarse pointers (touch — no cursor to track) and when the user
 * prefers reduced motion; the panels then stay statically lit by the CSS
 * defaults. One listener, one observer, one rAF — no per-panel cost.
 */
export default function GlassLight() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (reduce || coarse) return;

    const panels = Array.from(document.querySelectorAll<HTMLElement>('.glass--react'));
    if (!panels.length) return;

    // only the panels in (or near) the viewport get updated each frame
    const visible = new Set<HTMLElement>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target as HTMLElement);
          else visible.delete(e.target as HTMLElement);
        }
      },
      { rootMargin: '12%' },
    );
    panels.forEach((p) => io.observe(p));

    let px = 0;
    let py = 0;
    let raf = 0;

    // current (eased) sheen position per panel — the light trails the cursor with
    // spring-like momentum instead of snapping to it (raw mouse-tracking reads as
    // artificial; a lerp gives it motion). Settles, then the loop halts.
    const SMOOTH = 0.18; // approach rate per frame
    const SETTLE = 0.3; // %, below which we stop chasing
    const pos = new WeakMap<HTMLElement, { x: number; y: number }>();

    const frame = () => {
      raf = 0;
      let moving = false;
      // batch: read ALL rects first, then write ALL vars — interleaving
      // getBoundingClientRect (read) with style.setProperty (write) forces a
      // synchronous reflow on every panel; separating them keeps it to one.
      const panelsNow = [...visible];
      const rects = panelsNow.map((p) => p.getBoundingClientRect());
      for (let i = 0; i < panelsNow.length; i++) {
        const p = panelsNow[i];
        const r = rects[i];
        if (r.width === 0 || r.height === 0) continue;
        const tx = ((px - r.left) / r.width) * 100;
        const ty = ((py - r.top) / r.height) * 100;
        let s = pos.get(p);
        if (!s) {
          s = { x: tx, y: ty };
          pos.set(p, s);
        }
        s.x += (tx - s.x) * SMOOTH;
        s.y += (ty - s.y) * SMOOTH;
        p.style.setProperty('--mx', `${s.x.toFixed(1)}%`);
        p.style.setProperty('--my', `${s.y.toFixed(1)}%`);
        if (Math.abs(tx - s.x) > SETTLE || Math.abs(ty - s.y) > SETTLE) moving = true;
      }
      if (moving) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = requestAnimationFrame(frame);
    };

    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onMove);
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
