'use client';

import { useCallback, useRef, type MouseEvent } from 'react';
import BlackHoleLaser from '@/components/BlackHoleLaser';

/**
 * The apex section — a dedicated black-hole stage pinned to the very top edge of
 * the page (above SPACE). The hole bleeds off the top; hazard tape runs clear
 * across the page barricading it, with a CAUTION sign warning not to approach.
 *
 * Pressing the barricade (ignoring the warning) runs the WebGL warp: the live
 * viewport is snapshotted and its pixels are swirled + sucked into the hole by a
 * shader, then it fades to black and reloads — replaying the preloader so the
 * visitor lands back on the hero. The heavy warp code is loaded on demand.
 */

export default function TopBlackHole() {
  const stageRef = useRef<HTMLDivElement>(null);

  const onApproach = useCallback(async (_e: MouseEvent<HTMLButtonElement>) => {
    // converge the warp on the hole's true centre, not the tape we pressed
    const stage = stageRef.current;
    const r = stage?.getBoundingClientRect();
    const cx = r ? r.left + r.width / 2 : window.innerWidth / 2;
    const cy = r ? r.top + r.height / 2 : 0;
    const { runWarp } = await import('@/components/blackHoleWarp');
    runWarp(cx, cy);
  }, []);

  return (
    <section id="zone-blackhole" className="bh-section" aria-label="Apex — black hole">
      <p className="bh-eyebrow">
        <span aria-hidden>&#8627;</span> Apex · point of no return
      </p>

      <div className="bh-stage" ref={stageRef}>
        <BlackHoleLaser
          color="#f0c886"
          ringRadius={0.1}
          thickness={0.022}
          wispIntensity={10.5}
          flowSpeed={0.22}
          fogIntensity={2.4}
          zoom={1.15}
        />
      </div>

      {/* Scribbled margin note nudging visitors away from the hole, with a
          hand-drawn arrow curving up toward it. Decorative only. */}
      <div className="bh-note" aria-hidden>
        <span className="bh-note__text">don&rsquo;t touch it</span>
        <svg className="bh-note__arrow" viewBox="0 0 120 90" fill="none" preserveAspectRatio="xMidYMid meet">
          <path
            d="M14 84 C 2 52, 22 20, 58 12 C 78 7, 96 12, 110 10"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M110 10 L 97 4 M110 10 L 101 21"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Hazard barricade — caution tape stretched edge-to-edge across the page,
          crossing over the hole. The whole band is the trigger: pressing warps. */}
      <button
        type="button"
        className="bh-caution"
        onClick={onApproach}
        aria-label="Caution — do not approach the black hole"
      >
        <span className="bh-tape bh-tape--a" aria-hidden>
          <span className="bh-tape__text">
            caution · do not approach · caution · do not approach · caution · do not approach · caution · do not approach ·
          </span>
        </span>
        <span className="bh-tape bh-tape--b" aria-hidden>
          <span className="bh-tape__text">
            danger · event horizon · danger · event horizon · danger · event horizon · danger · event horizon ·
          </span>
        </span>
      </button>
    </section>
  );
}
