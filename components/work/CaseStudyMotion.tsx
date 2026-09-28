'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Text settles quickly; larger visuals get a little more travel and time.
// See docs/case-study-motion.md for the research and rationale.
const MOTION = {
  text: { y: 6, duration: 0.45, stagger: 0 },
  media: { y: 12, duration: 0.6, stagger: 0 },
  group: { y: 8, duration: 0.4, stagger: 0.05 },
} as const;
const ENTRY_LINE = 0.86;

function revealTargets(element: HTMLElement, kind: keyof typeof MOTION): Element[] {
  if (kind === 'group') return Array.from(element.children);
  const targets: Element[] = [element];
  if (kind === 'text') {
    // Keep the heading and its introductory copy together without adding
    // wrappers that would change the case studies' grid and spacing rules.
    let next = element.nextElementSibling;
    while (next?.tagName === 'P') {
      targets.push(next);
      next = next.nextElementSibling;
    }
  }
  return targets;
}

/** One-time entrances for related content, preserving natural text size. */
export default function CaseStudyMotion() {
  useGSAP(() => {
    const root = document.getElementById('case-study');
    if (!root) return;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const mobile = window.matchMedia('(max-width: 700px)').matches;
      // Read layout before applying any start states. Current/previous content
      // stays visible on hydration, deep links, and history restoration.
      const pending = Array.from(root.querySelectorAll<HTMLElement>('[data-case-reveal]'))
        .filter((element) => element.getClientRects().length > 0
          && element.getBoundingClientRect().top >= window.innerHeight * ENTRY_LINE);
      const animations = new Map<HTMLElement, gsap.core.Tween>();
      for (const element of pending) {
        const kind = element.dataset.caseReveal === 'text' ? 'text'
          : element.dataset.caseReveal === 'group' ? 'group' : 'media';
        const targets = revealTargets(element, kind);
        const motion = MOTION[kind];
        // Opacity preserves keyboard access; focusing a control completes its reveal.
        const tween = gsap.fromTo(targets, { opacity: 0, y: mobile ? motion.y / 2 : motion.y }, {
          opacity: 1,
          y: 0,
          duration: motion.duration,
          stagger: motion.stagger,
          ease: 'power2.out',
          clearProps: 'opacity,transform',
          scrollTrigger: { trigger: element, start: `clamp(top ${ENTRY_LINE * 100}%)`, once: true },
        });
        animations.set(element, tween);
      }

      const onFocus = (event: FocusEvent) => {
        if (!(event.target instanceof Element)) return;
        const focused = event.target;
        for (const [element, animation] of animations) {
          // Section navigation focuses the section itself. Reveal its content
          // immediately so a keyboard/hash jump never waits for an entrance.
          if (focused.contains(element)
            || animation.targets().some((target) => target instanceof Element && target.contains(focused))) {
            animation.progress(1);
            animation.scrollTrigger?.kill();
          }
        }
      };
      root.addEventListener('focusin', onFocus);

      let disposed = false;
      let frame = 0;
      const refresh = () => {
        if (disposed || frame) return;
        frame = requestAnimationFrame(() => { frame = 0; ScrollTrigger.refresh(); });
      };
      void document.fonts.ready.then(refresh);
      root.addEventListener('load', refresh, true);
      // Covers interactive content that changes height, without polling on scroll.
      const observer = new ResizeObserver(refresh);
      observer.observe(root);
      return () => {
        disposed = true;
        cancelAnimationFrame(frame);
        observer.disconnect();
        root.removeEventListener('load', refresh, true);
        root.removeEventListener('focusin', onFocus);
      };
    });
    return () => media.revert();
  });
  return null;
}
