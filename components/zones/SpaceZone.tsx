'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import LinkedInCarousel from '@/components/LinkedInCarousel';

/**
 * The apex of the journey — reached by scrolling UP from the sky. This is the
 * personal intro that lives BEYOND the default product-design work: who Sameer is
 * off the clock — innovation-driven, writing code, building things, turning up to
 * competitions and sessions.
 *
 * This zone is a SCRAPBOOK. It abandons the centred .zone scaffold and lays the
 * field out like a hand-made collage page on warm grey paper: a dense, deliberately
 * OVERLAPPING cluster of photo prints on the left (each a tilted white-matte print
 * pinned with tape, threaded by hand-drawn red marker), and a clean manifesto
 * column on the right with generous negative space. The charm is the human layer —
 * red handwritten captions and scribble doodles, true to a real pasted-up page.
 *
 * Two parallax depths react to the pointer; each print drifts on its own slow loop.
 * Reduced motion / small screens collapse the scatter into a plain readable column.
 *
 * Everything here is REAL: the Virgio hackathon (won), a design session, FONTOBER
 * 2025 (Top 21), and the Myntra design conference. Captions are factual.
 */

type Print = {
  src: string;
  alt: string;
  /** red handwritten note pinned to the print */
  note: string;
  /** mono kicker under the note */
  kind: string;
  /** width of the print */
  w: string;
  /** base tilt in degrees */
  rot: number;
  /** position within the page, in % */
  top: string;
  left: string;
  /** stack order inside the cluster */
  z: number;
  /** corner that gets a strip of tape: tl | tr | bl | br | none */
  tape?: 'tl' | 'tr' | 'bl' | 'br';
  /** where the note sits relative to the print */
  notePos?: 'below' | 'right' | 'left' | 'above';
};

const PRINTS: Print[] = [
  {
    src: '/sessions/fontober.png',
    alt: 'Sameer at FONTOBER 2025, the Designare font festival',
    note: 'top 21 — fontober ’25',
    kind: 'Designare',
    w: 'clamp(12rem, 16vw, 15rem)',
    rot: -2.5,
    top: '6%',
    left: '33%',
    z: 3,
    tape: 'br',
    notePos: 'below',
  },
  {
    src: '/sessions/virgio-hackathon.png',
    alt: 'Sameer heads-down building a project at the Virgio hackathon',
    note: 'built it. won it.',
    kind: 'Virgio Hackathon',
    w: 'clamp(12rem, 17vw, 15.5rem)',
    rot: 3.5,
    top: '52%',
    left: '3%',
    z: 2,
    tape: 'tl',
    notePos: 'right',
  },
  {
    src: '/sessions/design-session.png',
    alt: 'Sameer talking through an idea over his laptop at a design session',
    note: 'always in the room',
    kind: 'Design session',
    w: 'clamp(10rem, 13vw, 12.5rem)',
    rot: 5,
    top: '58%',
    left: '34%',
    z: 5,
    tape: 'tr',
    notePos: 'below',
  },
  {
    src: '/sessions/myx-2025.png',
    alt: 'Sameer at MYX, the Myntra design conference',
    note: 'myntra design conf',
    kind: 'MYX 2025',
    w: 'clamp(11rem, 15vw, 14.5rem)',
    rot: -3,
    top: '88%',
    left: '20%',
    z: 1,
    tape: 'tl',
    notePos: 'below',
  },
];

/* small red marker doodles, hand-placed across the page (top/left %, base tilt) */
type Doodle = { kind: 'star' | 'flower' | 'arrow' | 'squiggle'; top: string; left: string; rot: number; size: string };
const DOODLES: Doodle[] = [
  { kind: 'star', top: '3%', left: '25%', rot: -8, size: '2.2rem' },
  { kind: 'flower', top: '36%', left: '21%', rot: 6, size: '2.7rem' },
  { kind: 'arrow', top: '44%', left: '46%', rot: 26, size: '2.8rem' },
  { kind: 'squiggle', top: '64%', left: '58%', rot: -3, size: '3.4rem' },
  { kind: 'star', top: '72%', left: '45%', rot: 12, size: '1.6rem' },
];

/* Flip to `false` to hide the LinkedIn carousel. */
const SHOW_LINKEDIN = true;

/* LinkedIn posts shown in the carousel. `height` is the embed's native height
   (from the iframe snippet LinkedIn gives you) so each card fits its post
   exactly — no inner scrollbar. Add more entries as they come in. */
type LinkedInPost = { src: string; height: number };
const LINKEDIN_POSTS: LinkedInPost[] = [
  { src: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7443376111138471937?collapsed=1', height: 670 },
  { src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7446922702390738944?collapsed=1', height: 550 }, // trophy
  { src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7469722987051630593?collapsed=1', height: 550 },
  { src: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7389905231989485568?collapsed=1', height: 670 },
  { src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7434941930649763840?collapsed=1', height: 874 }, // drawing
];

function DoodleSvg({ kind }: { kind: Doodle['kind'] }) {
  switch (kind) {
    case 'star':
      return (
        <svg viewBox="0 0 48 48" aria-hidden>
          <path d="M24 3c2 9 6 13 19 16-13 3-17 7-19 16-2-9-6-13-19-16 13-3 17-7 19-16Z" />
        </svg>
      );
    case 'flower':
      return (
        <svg viewBox="0 0 48 48" aria-hidden>
          <path d="M24 1c2.5 14 7.5 19 22 22-14.5 3-19.5 8-22 23-2.5-15-7.5-20-22-23 14.5-3 19.5-8 22-22Z" />
        </svg>
      );
    case 'arrow':
      return (
        <svg viewBox="0 0 48 48" aria-hidden>
          <path d="M5 30c12-6 24-12 36-22M41 8l-1 12M41 8 29 9" />
        </svg>
      );
    case 'squiggle':
      return (
        <svg viewBox="0 0 80 24" aria-hidden>
          <path d="M3 13c8-7 16 6 24 0s16 6 24 0 16 5 24 0" />
        </svg>
      );
  }
}

export default function SpaceZone() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      {
        reduce: '(prefers-reduced-motion: reduce)',
        ok: '(prefers-reduced-motion: no-preference)',
        fine: '(pointer: fine)',
        wide: '(min-width: 1025px)',
      },
      (ctx) => {
        const frags = gsap.utils.toArray<HTMLElement>('.frag');
        const cond = ctx.conditions!;

        // lock each fragment's base tilt through GSAP so drift can add to it
        frags.forEach((el) => {
          gsap.set(el, { rotation: Number(el.dataset.rot ?? 0) });
        });

        // the satellite: a slow flyby. It crosses the field left→right, slips
        // fully out of view, then drifts back the other way (yoyo). A shallow
        // vertical arc + fixed tilt keep it from reading as a flat conveyor.
        // The section clips at overflow:hidden, so the wide travel never adds a
        // scrollbar. Parked at a nice angle when motion is off.
        const arm = root.current?.querySelector('.sat-arm');
        const sat = root.current?.querySelector('.sat');
        if (arm && sat) {
          if (cond.reduce || !cond.wide) {
            gsap.set(arm, { x: 0, y: 0 });
            gsap.set(sat, { rotation: -14 });
          } else {
            const reach = window.innerWidth * 0.85;  // far enough to exit both edges
            gsap.set(sat, { rotation: -14 });
            gsap.fromTo(
              arm,
              { x: -reach, y: 28 },
              { x: reach, y: -28, duration: 36, ease: 'sine.inOut', repeat: -1, yoyo: true },
            );
            gsap.to(sat, { yPercent: 5, duration: 8, ease: 'sine.inOut', repeat: -1, yoyo: true });
          }
        }

        if (cond.reduce || !cond.wide) {
          gsap.set('.frag', { autoAlpha: 1, scale: 1 });
          gsap.set('.thread', { autoAlpha: cond.wide ? 1 : 0 });
          return;
        }

        // entrance: prints settle in like they're being pasted down; rotation is
        // preserved (we never tween it here), so each keeps its locked tilt
        gsap.set('.thread', { autoAlpha: 0 });
        gsap
          .timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 })
          .from(frags, {
            autoAlpha: 0,
            scale: 0.9,
            yPercent: 6,
            duration: 0.9,
            stagger: { each: 0.05, from: 'random' },
          })
          .to('.thread', { autoAlpha: 1, duration: 1.2 }, 0.4);

        // perpetual weightless drift — tiny, varied, never enough to hurt reading
        frags.forEach((el, i) => {
          gsap.to(el, {
            yPercent: i % 2 === 0 ? -3 : 2.4,
            xPercent: i % 3 === 0 ? -2 : 1.6,
            rotation: `+=${i % 2 === 0 ? 0.6 : -0.5}`,
            duration: 7 + (i % 5) * 0.9,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          });
        });

        // two-depth pointer parallax (only on a fine pointer)
        if (cond.fine) {
          const far = root.current?.querySelector('.par-far');
          const near = root.current?.querySelector('.par-near');
          if (far && near) {
            const fx = gsap.quickTo(far, 'xPercent', { duration: 1, ease: 'power3' });
            const fy = gsap.quickTo(far, 'yPercent', { duration: 1, ease: 'power3' });
            const nx = gsap.quickTo(near, 'xPercent', { duration: 0.7, ease: 'power3' });
            const ny = gsap.quickTo(near, 'yPercent', { duration: 0.7, ease: 'power3' });
            const onMove = (e: PointerEvent) => {
              const rx = e.clientX / window.innerWidth - 0.5;
              const ry = e.clientY / window.innerHeight - 0.5;
              fx(-rx * 1.1); fy(-ry * 1.1);
              nx(-rx * 2.4); ny(-ry * 2.4);
            };
            window.addEventListener('pointermove', onMove);
            return () => window.removeEventListener('pointermove', onMove);
          }
        }
      },
      root,
    );
    return () => mm.revert();
  }, []);

  return (
    <section id="zone-space" className="zone zone-space" ref={root} aria-labelledby="space-title">
      {/* LINKEDIN — a draggable rail of embedded posts, sitting ABOVE the
          scrapbook. Iframes lazy-load as they scroll into view. Hidden via
          SHOW_LINKEDIN — flip the flag to remove. */}
      {SHOW_LINKEDIN && (
        <div className="space-projects" data-reveal>
          <header className="space-projects-head">
            <p className="space-eyebrow">
              <span aria-hidden>&#8627;</span> Out loud, in public
            </p>
            <h3 className="display space-projects-title">
              On <span className="hand-accent">LinkedIn</span>
            </h3>
          </header>
          <div className="space-projects-stage space-projects-stage--li">
            <LinkedInCarousel posts={LINKEDIN_POSTS} />
          </div>
        </div>
      )}

      <div className="scrap">
        {/* a slow body in high orbit, drifting BEHIND the collage in the
            exosphere. Decorative; sits below the prints, never takes the pointer. */}
        <div className="sat-field" aria-hidden>
          <div className="sat-anchor">
            <div className="sat-orbit">
              <div className="sat-arm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="sat" src="/space/satellite.png" alt="" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </div>

        {/* hand-drawn red thread that loosely strings the cluster together */}
        <svg className="thread" viewBox="0 0 1000 1400" preserveAspectRatio="none" aria-hidden>
          <path d="M120,120 C300,90 360,300 300,420 C250,520 90,640 150,760 C210,880 520,820 640,900" />
        </svg>

        {/* FAR depth — the doodle layer drifts behind the prints */}
        <div className="par-far">
          {DOODLES.map((d, i) => (
            <span
              key={`${d.kind}-${i}`}
              className={`frag doodle doodle--${d.kind}`}
              data-rot={d.rot}
              style={{ top: d.top, left: d.left, ['--ds' as string]: d.size }}
              aria-hidden
            >
              <DoodleSvg kind={d.kind} />
            </span>
          ))}
        </div>

        {/* NEAR depth — the read: prints cluster left, manifesto column right */}
        <div className="par-near">
          {/* the moon — a self-portrait framed in the lunar surface, floating in
              the cosmos (no print frame/tape; it IS the sky). Anchors the cluster. */}
          <figure className="frag scrap-moon" data-rot="-2" style={{ top: '4%', left: '1%' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero/moon-window.png"
              alt="Sameer leaning out of a window cut into the moon"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="print-note">
              <span className="note-hand">this is me, mid-idea</span>
              <span className="note-kind">somewhere off-world</span>
            </figcaption>
          </figure>

          {PRINTS.map((p) => (
            <figure
              key={p.src}
              className={`frag print note-${p.notePos ?? 'below'}`}
              data-rot={p.rot}
              data-tape={p.tape ?? 'none'}
              style={{ top: p.top, left: p.left, zIndex: p.z, ['--pw' as string]: p.w }}
            >
              <span className="print-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt={p.alt} loading="lazy" decoding="async" />
              </span>
              <figcaption className="print-note">
                <span className="note-hand">{p.note}</span>
                <span className="note-kind">{p.kind}</span>
              </figcaption>
            </figure>
          ))}

          {/* THE MANIFESTO — clean column, right side, lots of air */}
          <div className="scrap-copy frag" data-rot="0" style={{ top: '6%', left: '62%' }}>
            <p className="space-eyebrow">
              <span aria-hidden>&#8627;</span> Beyond the product work
            </p>

            <h2 id="space-title" className="display space-title">
              Innovation-driven,
              <br />
              code-curious,
              <br />
              always <span className="hand-accent">making</span>.
            </h2>

            <p className="space-lede">
              I&rsquo;m Sameer Kapil. By day I design products at Virgio. But the itch
              doesn&rsquo;t stop at the day job — I write code, enter competitions, and
              turn up to every session where people build things from nothing.
            </p>

            <p className="space-note">
              I love the making itself. A prototype in code, a half-broken demo at 2am,
              a thing that didn&rsquo;t exist yesterday. That&rsquo;s the part I chase.
            </p>

            <p className="space-ps">ps: if i&rsquo;m quiet, i&rsquo;m probably building something.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
