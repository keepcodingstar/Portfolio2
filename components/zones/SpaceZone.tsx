'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import LinkedInCarousel, { type LinkedInPost } from '@/components/LinkedInCarousel';

gsap.registerPlugin(Draggable, InertiaPlugin);

/**
 * The apex of the journey — reached by scrolling UP from the sky. This is the
 * personal intro that lives BEYOND the default product-design work: who Sameer is
 * off the clock — innovation-driven, writing code, building things, turning up to
 * competitions and sessions.
 *
 * This zone is a SCRAPBOOK. It abandons the centred .zone scaffold and lays the
 * field out like a hand-made collage page on warm grey paper: a dense, deliberately
 * OVERLAPPING cluster of photo prints on the right (each a tilted white-matte print
 * pinned with tape, threaded by hand-drawn marker), and a clean manifesto
 * column on the left with generous negative space. The charm is the human layer —
 * sky-blue handwritten captions and scribble doodles.
 *
 * The copy stays anchored; prints float gently and coast when dragged and released.
 * Reduced motion / small screens collapse the scatter into a plain readable column.
 *
 * Everything here is REAL: the Virgio hackathon (won), a design session, FONTOBER
 * 2025 (Top 21), and the Myntra design conference. Captions are factual.
 */

type Print = {
  src: string;
  alt: string;
  /** intrinsic pixel width of the source image (for next/image aspect + srcset) */
  iw: number;
  /** intrinsic pixel height of the source image */
  ih: number;
  /** handwritten note pinned to the print */
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
    iw: 2000,
    ih: 1125,
    note: 'top 21 — fontober ’25',
    kind: 'Designare',
    w: 'clamp(12rem, 16vw, 15rem)',
    rot: -2.5,
    top: '6%',
    left: '71%',
    z: 3,
    tape: 'br',
    notePos: 'below',
  },
  {
    src: '/sessions/virgio-hackathon.png',
    alt: 'Sameer heads-down building a project at the Virgio hackathon',
    iw: 1280,
    ih: 1919,
    note: 'built it. won it.',
    kind: 'Virgio Hackathon',
    w: 'clamp(12rem, 17vw, 15.5rem)',
    rot: 3.5,
    top: '52%',
    left: '41%',
    z: 2,
    tape: 'tl',
    notePos: 'right',
  },
  {
    src: '/sessions/design-session.png',
    alt: 'Sameer talking through an idea over his laptop at a design session',
    iw: 2000,
    ih: 1333,
    note: 'always in the room',
    kind: 'Design session',
    w: 'clamp(10rem, 13vw, 12.5rem)',
    rot: 5,
    top: '58%',
    left: '72%',
    z: 5,
    tape: 'tr',
    notePos: 'below',
  },
  {
    src: '/sessions/myx-2025.png',
    alt: 'Sameer at MYX, the Myntra design conference',
    iw: 800,
    ih: 533,
    note: 'myntra design conf',
    kind: 'MYX 2025',
    w: 'clamp(11rem, 15vw, 14.5rem)',
    rot: -3,
    top: '88%',
    left: '58%',
    z: 1,
    tape: 'tl',
    notePos: 'below',
  },
];

/* small marker doodles, hand-placed across the page (top/left %, base tilt) */
type Doodle = { kind: 'star' | 'flower' | 'arrow' | 'squiggle'; top: string; left: string; rot: number; size: string };
const DOODLES: Doodle[] = [
  { kind: 'star', top: '3%', left: '63%', rot: -8, size: '2.2rem' },
  { kind: 'flower', top: '36%', left: '59%', rot: 6, size: '2.7rem' },
  { kind: 'arrow', top: '44%', left: '84%', rot: 26, size: '2.8rem' },
  { kind: 'squiggle', top: '64%', left: '96%', rot: -3, size: '3.4rem' },
  { kind: 'star', top: '72%', left: '83%', rot: 12, size: '1.6rem' },
];

/* Flip to `false` to hide the LinkedIn carousel. */
const SHOW_LINKEDIN = true;

/* LinkedIn posts shown in the carousel. `height` is the embed's native height
   (from the iframe snippet LinkedIn gives you) so each card fits its post
   exactly — no inner scrollbar. Each entry also has a local preview so the
   content remains readable when LinkedIn is slow or blocks an embed. */
const LINKEDIN_POSTS: LinkedInPost[] = [
  {
    src: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7443376111138471937?collapsed=1', height: 670,
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7443376112241451008',
    preview: '/assets/linkedin/7443376111138471937.webp',
    description: 'Sameer Kapil on the DIGIES award for transparent pricing at VIRGIO',
  },
  {
    src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7446922702390738944?collapsed=1', height: 550,
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7446923010168561664',
    preview: '/assets/linkedin/7446922702390738944.webp',
    description: 'Sameer Kapil on building the Econic Fair recap landing page with Claude Code',
  },
  {
    src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7469722987051630593?collapsed=1', height: 550,
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7469723101371678720',
    preview: '/assets/linkedin/7469722987051630593.webp',
    description: 'Sameer Kapil on building a Figma plugin to automate repetitive work',
  },
  {
    src: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7389905231989485568?collapsed=1', height: 670,
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7389905233264599058',
    preview: '/assets/linkedin/7389905231989485568.webp',
    description: 'Sameer Kapil on receiving the High Ownership Award at VIRGIO',
  },
  {
    src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7434941930649763840?collapsed=1', height: 874,
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7434941958986526720',
    preview: '/assets/linkedin/7434941930649763840.webp',
    description: 'Sameer Kapil on making time for art alongside engineering and design',
  },
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
        const frags = gsap.utils.toArray<HTMLElement>('.frag:not(.scrap-copy)');
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
            duration: 0.9,
            stagger: { each: 0.05, from: 'random' },
          })
          .to('.thread', { autoAlpha: 1, duration: 1.2 }, 0.4);

        const draggables: Draggable[] = [];
        const scrap = root.current!.querySelector<HTMLElement>('.scrap')!;
        const copy = root.current!.querySelector<HTMLElement>('.scrap-copy')!;

        // Keep the whole print (including its caption) in the collage's half of
        // the page. Allow the existing lower prints to spill into the hero.
        const boundsFor = (el: HTMLElement) => {
          const note = el.querySelector<HTMLElement>('.print-note');
          const width = Math.max(el.offsetWidth, note ? note.offsetLeft + note.offsetWidth : 0);
          const height = Math.max(el.offsetHeight, note ? note.offsetTop + note.offsetHeight : 0);
          const margin = 24; // room for the tilt and a few pixels of ambient float
          return {
            minX: Math.min(0, copy.offsetLeft + copy.offsetWidth + margin - el.offsetLeft),
            maxX: Math.max(0, scrap.clientWidth - el.offsetLeft - width - margin),
            minY: Math.min(0, margin - el.offsetTop),
            maxY: Math.max(0, scrap.clientHeight - el.offsetTop - height - margin),
          };
        };

        // Float uses percentages and tilt; dragging/inertia owns x/y. Keeping
        // these separate lets each print coast without snapping to its old pin.
        frags.forEach((el, i) => {
          const float = gsap.to(el, {
            yPercent: i % 2 === 0 ? -1.5 : 1.2,
            xPercent: i % 3 === 0 ? -1 : 0.8,
            rotation: `+=${i % 2 === 0 ? 0.45 : -0.4}`,
            duration: 11 + (i % 5) * 1.2,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          });

          if (cond.fine && el.matches('.print, .scrap-moon')) {
            draggables.push(...Draggable.create(el, {
              type: 'x,y',
              bounds: boundsFor(el),
              inertia: true,
              throwResistance: 180,
              minDuration: 1.8,
              maxDuration: 6,
              edgeResistance: 1,
              overshootTolerance: 0,
              minimumMovement: 4,
              cursor: 'grab',
              activeCursor: 'grabbing',
              zIndexBoost: false,
              onPressInit(this: Draggable) {
                float.pause();
                this.applyBounds(boundsFor(el));
              },
              onRelease() {
                float.play();
              },
            }));
          }
        });

        const updateBounds = () => draggables.forEach((drag) => {
          drag.applyBounds(boundsFor(drag.target as HTMLElement));
        });
        window.addEventListener('resize', updateBounds);
        return () => {
          window.removeEventListener('resize', updateBounds);
          draggables.forEach((drag) => drag.kill());
        };
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
                <Image
                  className="sat"
                  src="/space/satellite.png"
                  alt=""
                  width={1114}
                  height={512}
                  sizes="(min-width: 1025px) 18vw, 17rem"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* hand-drawn thread that loosely strings the cluster together */}
        <svg className="thread" viewBox="0 0 1000 1400" preserveAspectRatio="none" aria-hidden>
          <path transform="translate(380 0)" d="M120,120 C300,90 360,300 300,420 C250,520 90,640 150,760 C210,880 520,820 640,900" />
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

        {/* Prints cluster right; the stationary manifesto stays on the left. */}
        <div className="par-near">
          {/* the moon — a self-portrait framed in the lunar surface, floating in
              the cosmos (no print frame/tape; it IS the sky). Anchors the cluster. */}
          <figure className="frag scrap-moon" data-rot="-2" style={{ top: '4%', left: '39%' }}>
            <Image
              src="/hero/moon-window.png"
              alt="Sameer leaning out of a window cut into the moon"
              width={1628}
              height={1626}
              sizes="(min-width: 1025px) 19vw, 78vw"
              loading="lazy"
              draggable={false}
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
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={p.iw}
                  height={p.ih}
                  sizes="(min-width: 1025px) 17vw, 40vw"
                  loading="lazy"
                  draggable={false}
                />
              </span>
              <figcaption className="print-note">
                <span className="note-hand">{p.note}</span>
                <span className="note-kind">{p.kind}</span>
              </figcaption>
            </figure>
          ))}

          {/* THE MANIFESTO — clean column, left side, lots of air */}
          <div className="scrap-copy frag" data-rot="0" style={{ top: '6%', left: '0%' }}>
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
