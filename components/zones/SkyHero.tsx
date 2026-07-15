'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useAltitude } from '@/components/AltitudeProvider';

/**
 * The hinge of the whole site: an editorial THESIS read over a cockpit canopy of
 * live sky. You LAND here, at altitude zero. The fold leads with what Sameer
 * actually does, in a big serif statement whose one hand-written ion word carries
 * the brand voice, and pays it off with a glass "View résumé" CTA.
 *
 * The site is BIDIRECTIONAL, so the fold says so on both edges: a glowing ion
 * line runs off the TOP to the creative world and off the BOTTOM to the shipped
 * work. Each marker is a real button wired to the altitude scroller — scrolling
 * UP is the unintuitive move, so it is named, not implied. The top-right corner
 * ("Create › Consume") names the same axis in shorthand.
 *
 * A GSAP timeline reveals the statement, then draws the two edge lines OUTWARD to
 * their off-screen destinations — but only once the preloader clears (the
 * `preloader:done` signal), otherwise the reveal plays hidden behind the white
 * intro field. Reduced motion is handled with gsap.matchMedia: everything simply
 * appears, no movement.
 */
export default function SkyHero() {
  const root = useRef<HTMLElement>(null);
  const { goTo } = useAltitude();

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
          gsap.set('.sky-edge', { autoAlpha: 1 });
          gsap.set('.sky-portrait', { autoAlpha: 1 });
          gsap.set('.sky-cloud-bank', { autoAlpha: 1 });
          return;
        }

        // hide first so nothing flashes under the white preloader field
        gsap.set('.reveal', { autoAlpha: 0, y: 26 });
        gsap.set('.sky-edge', { autoAlpha: 0 });
        // portrait + cloud bank fade only (no transform) so they never fight the
        // CSS drift/float animations on their sprites
        gsap.set('.sky-portrait', { autoAlpha: 0 });
        gsap.set('.sky-cloud-bank', { autoAlpha: 0 });

        // play AFTER the curtain begins parting; the delay lands the statement as
        // the centre clears (clouds settle to the sides/bottom).
        const play = () => {
          gsap
            .timeline({ defaults: { ease: 'power3.out' }, delay: 0.9 })
            .to('.sky-cloud-bank', { autoAlpha: 1, duration: 1.6 }, 0)
            .to('.sky-portrait', { autoAlpha: 1, duration: 1.3 }, 0.1)
            .to('.reveal', { autoAlpha: 1, y: 0, duration: 1, stagger: 0.09 }, 0.15)
            .to('.sky-edge', { autoAlpha: 1, duration: 0.8 }, 0.55);
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
      {/* corner metadata */}
      <p className="sky-corner tl reveal">
        <span className="sky-corner-k">Based in</span> Bengaluru, IN
      </p>
      <p className="sky-corner tr reveal">
        Create <span className="sky-corner-arrow" aria-hidden>›</span> Consume
      </p>

      {/* ↑ the creative world — a real button, line drawn off the top edge */}
      <button
        type="button"
        className="sky-edge up"
        onClick={() => goTo('zone-space')}
        aria-label="Go up to the creative side"
      >
        <span className="fc-arrow" aria-hidden>↑</span>
        <span className="fc-dest">The creative side</span>
      </button>

      {/* Background cloud bank — beds the hero inside a real weather system so
          Sameer reads as sitting IN clouds, not on top of a single perched puff.
          Four soft sprites at low z-index: two upper billows in the corners, one
          wide horizon bank running the full width under the figure, and a mid
          drift wisp behind the fold text to soften the sky mid-height. All are
          reveal-timed so nothing pops in ahead of the portrait. */}
      <div className="sky-cloud-bank" aria-hidden>
        <span className="sky-bank sky-bank--tl" />
        <span className="sky-bank sky-bank--tr" />
        <span className="sky-bank sky-bank--shoulder" />
        <span className="sky-bank sky-bank--base" />
      </div>

      {/* Sameer, sitting on a cloud, reading — staged as ATMOSPHERE, not as a
          right-column asset. The figure floats behind the fold text at the same
          conceptual layer as the CloudField clouds: soft mask into the sky, three
          drifting puffs to blend the base. The type reads over the top; on
          desktop he sits offset to the right so the copy has clean air. */}
      <figure className="sky-portrait" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="sky-portrait-img"
          src="/hero/sameer-cloud.png"
          alt=""
          width={1800}
          height={1013}
          decoding="async"
        />
        <span className="sky-puff sky-puff--a" aria-hidden />
        <span className="sky-puff sky-puff--b" aria-hidden />
        <span className="sky-puff sky-puff--c" aria-hidden />
        <span className="sky-puff sky-puff--d" aria-hidden />
        <span className="sky-puff sky-puff--e" aria-hidden />
      </figure>

      {/* the thesis fold — a single text column that reads over the sky scene */}
      <div className="sky-fold">
        <p className="sky-eyebrow reveal">
          <span className="dia" aria-hidden>◆</span> Hello, I&rsquo;m Sameer.
        </p>

        <h1 id="sky-title" className="display sky-statement reveal">
          <span className="sky-line">
            I&rsquo;ll be a <span className="script">1%</span> product designer.
          </span>
          <span className="sky-tail">Soon.</span>
        </h1>

        <p className="sky-role reveal">
          <span className="sky-role-em">Innovation-first</span> product designer.
        </p>

        <div className="sky-cta reveal">
          <a
            className="sky-resume glass glass--thin"
            href="https://drive.google.com/file/d/10p_BLhpwUbNwaStiL4AJAZwFRSFM45CA/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sky-resume-label">View résumé</span>
            <span className="sky-resume-icon" aria-hidden>↗</span>
          </a>
        </div>
      </div>

      {/* ↓ the shipped work — a real button, line drawn off the bottom edge */}
      <button
        type="button"
        className="sky-edge down"
        onClick={() => goTo('zone-work')}
        aria-label="Go down to the professional side"
      >
        <span className="fc-dest">The professional side</span>
        <span className="fc-arrow" aria-hidden>↓</span>
      </button>
    </section>
  );
}
