'use client';

import { useEffect } from 'react';

/**
 * Lifts every [data-reveal] element into view as it enters the viewport by
 * flipping a `.in` class — the quiet motion for the /work pages. Honours
 * reduced motion by revealing everything immediately. One observer per mount.
 */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        }
      },
      // low threshold so sections taller than the viewport (image grids, stacked
      // phone screenshots) still reveal — a high ratio is unreachable when the
      // element is several viewports tall, which would otherwise leave it stuck
      // at opacity:0 and the whole section invisible
      { threshold: 0.04, rootMargin: '0px 0px -8% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
