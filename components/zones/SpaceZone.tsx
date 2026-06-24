'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * The apex of the journey — out in space, the creative side, reached by scrolling
 * UP from the sky. It is the deliberate inverse of WorkZone: where the work below
 * is measured (ruled rows, right-aligned tabular numerals, 01/02/03), the creative
 * side floats — off-grid, left-set, suspended, no numbers, no conversion brag.
 *
 * Two movements, set against the live black hole behind it:
 *   1. Event Horizon — the manifesto, composed against the hole's glowing ring.
 *   2. In orbit — three experiments hung off a single hairline spine as bodies in
 *      orbit, each drifting at its own offset. On load the spine draws downward
 *      and the bodies settle onto it in sequence; then a near-imperceptible float.
 * Reduced motion: everything simply appears, weightless but still.
 */

type Body = { title: string; note: string; kind: string };

const BODIES: Body[] = [
  {
    title: 'Sound of the Scent',
    note: 'An audio moment on perfume PDPs — the second most-interacted element on the page.',
    kind: 'Audio · sensory',
  },
  {
    title: 'ZERO',
    note: 'A thrift & circular-fashion platform, taken from a blank page to a shipped product.',
    kind: 'From scratch · 0→1',
  },
  {
    title: 'Amodira · Eco-nic Fair',
    note: 'Cart & offer widgets for the campaign — built to make the moment feel like an event.',
    kind: 'Campaign · event',
  },
];

export default function SpaceZone() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      {
        reduce: '(prefers-reduced-motion: reduce)',
        ok: '(prefers-reduced-motion: no-preference)',
      },
      (ctx) => {
        if (ctx.conditions?.reduce) {
          gsap.set('.space-hero .reveal', { autoAlpha: 1, y: 0 });
          gsap.set('.orbit-line', { scaleY: 1 });
          gsap.set('.body', { autoAlpha: 1, x: 0, y: 0 });
          gsap.set('.node', { scale: 1, autoAlpha: 1 });
          return;
        }

        const bodies = gsap.utils.toArray<HTMLElement>('.body');

        // hero reveals on mount (it's the apex headline); the orbit waits until
        // the section is actually scrolled into view, so the spine-draw lands
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from('.space-hero .reveal', { autoAlpha: 0, y: 28, duration: 1, stagger: 0.12 });

        // fromTo (not from): pins both endpoints so a StrictMode double-mount +
        // matchMedia revert can't leave the destination read as the start value
        const tl = gsap
          .timeline({ defaults: { ease: 'power3.out' }, paused: true })
          .fromTo(
            '.orbit-line',
            { scaleY: 0 },
            { scaleY: 1, transformOrigin: 'top', duration: 0.9, ease: 'power2.inOut' },
          )
          .fromTo(
            '.node',
            { scale: 0, autoAlpha: 0 },
            { scale: 1, autoAlpha: 1, duration: 0.5, stagger: 0.18, ease: 'back.out(2)' },
            '<0.15',
          )
          .fromTo(
            '.body',
            { autoAlpha: 0, x: -22 },
            { autoAlpha: 1, x: 0, duration: 0.8, stagger: 0.18 },
            '<',
          )
          .add(() => {
            // weightless drift — tiny, varied, perpetual; never enough to hurt reading
            bodies.forEach((el, i) => {
              gsap.to(el, {
                y: i % 2 === 0 ? '-=7' : '-=5',
                duration: 5 + i * 0.9,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
              });
            });
          });

        const orbit = root.current?.querySelector('.orbit');
        if (!orbit) return;
        const io = new IntersectionObserver(
          ([e]) => {
            if (e.isIntersecting) {
              tl.play();
              io.disconnect();
            }
          },
          { threshold: 0.25 },
        );
        io.observe(orbit);
        return () => io.disconnect();
      },
      root,
    );
    return () => mm.revert();
  }, []);

  return (
    <section id="zone-space" className="zone zone-space" ref={root} aria-labelledby="space-title">
      <div className="space-stage">
        <div className="space-hero">
          <p className="eyebrow reveal">The creative side · out past the funnel</p>
          <h2 id="space-title" className="display space-title reveal">
            Made for the <em>feel</em>
            <br />
            of them.
          </h2>
          <p className="space-lede reveal">
            Up here, nothing&rsquo;s measured in conversion. These are the
            expressive, 0&rarr;1, exists-because-it-should experiments.
          </p>
        </div>
      </div>

      <ul className="orbit" aria-label="Creative experiments">
        <span className="orbit-line" aria-hidden />
        {BODIES.map((b) => (
          <li className="body" key={b.title}>
            <span className="node" aria-hidden />
            <div className="body-main">
              <h3 className="serif body-title">{b.title}</h3>
              <p className="body-note">{b.note}</p>
            </div>
            <span className="designation">{b.kind}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
