'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * The hinge of the whole site: "Sameer, now." You LAND here, in the sky.
 * Scrolling up rises into space (the creative side); scrolling down descends
 * through the colours of the sky to the shipped work and the ground.
 *
 * A GSAP timeline reveals the lines, but only once the preloader clears (the
 * `preloader:done` signal) — otherwise the reveal would play hidden behind the
 * white intro field. It's timed to land as the cloud curtain parts and the
 * centre clears. Dual scroll cues actively invite the (unintuitive) up-scroll as
 * well as the down-scroll. Reduced motion is handled with gsap.matchMedia —
 * everything simply appears, no movement.
 */
export default function SkyHero() {
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
          gsap.set('.reveal', { autoAlpha: 1, y: 0 });
          gsap.set('.scroll-cues', { autoAlpha: 1 });
          return;
        }

        // hide first so nothing flashes under the white preloader field
        gsap.set('.reveal', { autoAlpha: 0, y: 26 });
        gsap.set('.scroll-cues', { autoAlpha: 0 });

        // play the reveal AFTER the curtain begins parting; the delay lands the
        // lines as the centre clears (clouds settle to the sides/bottom).
        const play = () => {
          gsap
            .timeline({ defaults: { ease: 'power3.out' }, delay: 0.9 })
            .to('.reveal', { autoAlpha: 1, y: 0, duration: 1, stagger: 0.12 })
            .to('.scroll-cues', { autoAlpha: 1, duration: 0.8 }, '-=0.3');
        };

        // if the intro is already gone (remount), play now; else wait for the
        // signal, with a safety net so the hero never stays hidden.
        if (!document.body.classList.contains('preloading')) {
          play();
          return;
        }
        window.addEventListener('preloader:done', play, { once: true });
        const fallback = window.setTimeout(play, 7000);
        return () => {
          window.removeEventListener('preloader:done', play);
          clearTimeout(fallback);
        };
      },
      root,
    );
    return () => mm.revert();
  }, []);

  return (
    <section id="zone-sky" className="zone sky-hero" ref={root} aria-labelledby="sky-title">
      <div className="scroll-cues up reveal" aria-hidden>
        <span className="arrow">↑</span>
        <span>scroll up · the creative side</span>
      </div>

      {/* the headline is read through a cockpit canopy: a thin refractive glass
          pane that bends the cloud photo at its rim and catches the cursor light.
          The viewfinder ticks echo the work-zone instrument readout. */}
      <div className="inner canopy glass glass--thin glass--react reveal">
        <span className="canopy-tick tl" aria-hidden />
        <span className="canopy-tick br" aria-hidden />
        <p className="name reveal">Sameer Kapil · Product Designer · Bangalore</p>
        <h1 id="sky-title" className="display tagline reveal">
          Design for outcomes,
          <br />
          numbers that <em>move</em>.
        </h1>

        <p className="one-liner reveal">
          I turn fuzzy problems into shipped interfaces that move real numbers —
          checkout, trust, and the first &ldquo;yes.&rdquo;
        </p>
      </div>

      <div className="scroll-cues down reveal" aria-hidden>
        <span>scroll down · the shipped work</span>
        <span className="arrow">↓</span>
      </div>
    </section>
  );
}
