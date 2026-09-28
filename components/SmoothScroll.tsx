'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let activeScroll: { instance: Lenis; pathname: string } | null = null;

/** Use the same easing for section links and wheel scrolling. */
export function scrollToPosition(top: number, instant = false) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (activeScroll?.pathname === window.location.pathname) {
    activeScroll.instance.scrollTo(top, { immediate: instant || reduced });
  } else {
    window.scrollTo({ top, behavior: instant || reduced ? 'instant' : 'smooth' });
  }
}

/** Smooth native document scroll without transforming fixed/sticky ancestors. */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference) and (pointer: fine)', () => {
      const instance = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: false,
        allowNestedScroll: true,
        prevent: (element) => element.tagName === 'DIALOG',
        virtualScroll: ({ event }) => !event.defaultPrevented,
      });
      activeScroll = { instance, pathname };
      const tick = (seconds: number) => instance.raf(seconds * 1000);
      instance.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);

      // The intro and modal viewers own the document's scroll lock.
      const syncLock = () => {
        const locked = document.body.classList.contains('preloading')
          || ['hidden', 'clip'].includes(document.body.style.overflow);
        if (locked && !instance.isStopped) instance.stop();
        else if (!locked && instance.isStopped) instance.start();
      };
      const observer = new MutationObserver(syncLock);
      observer.observe(document.body, { attributes: true, attributeFilter: ['class', 'style'] });
      syncLock();

      // Cancel momentum before native keyboard/history positioning takes over.
      const cancelGlide = () => instance.scrollTo(window.scrollY, { immediate: true, force: true });
      const onKey = (event: KeyboardEvent) => {
        if (['Tab', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) cancelGlide();
      };
      window.addEventListener('keydown', onKey);
      window.addEventListener('popstate', cancelGlide);
      return () => {
        observer.disconnect();
        window.removeEventListener('keydown', onKey);
        window.removeEventListener('popstate', cancelGlide);
        gsap.ticker.remove(tick);
        instance.off('scroll', ScrollTrigger.update);
        instance.destroy();
        if (activeScroll?.instance === instance) activeScroll = null;
      };
    });
    return () => media.revert();
  }, [pathname]);

  return null;
}
