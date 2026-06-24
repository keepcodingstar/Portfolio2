'use client';

import BlackHoleLaser from '@/components/BlackHoleLaser';

/**
 * The black hole, hosted properly: a full, uncropped stage at the very apex of
 * the journey (the top of the document, reached by scrolling up). It is the
 * backdrop the whole creative world is set against. Sits behind the SPACE
 * content (z-index 0), inert to input; the shader pauses itself off-screen.
 *
 * The hole is lifted toward the TOP EDGE and tilted 30° anti-clockwise so the
 * accretion disk rakes across the top of the view, with the hero text reading
 * beneath it. A soft radial mask feathers the opaque canvas into the surrounding
 * space so there's no hard rotated-rectangle seam.
 *
 * Below the first screen, a stratosphere descent (black space → deep blue → a
 * cool atmospheric limb) makes falling out of the apex feel like crossing the
 * atmosphere, before it hands off to the global sky-blue crossfade.
 */
export default function TopBlackHole() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '210vh',
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      {/* tilted, top-anchored shader. Centre (the ring) sits near the top edge;
          rotate(-30deg) rakes the disk; the radial mask feathers the edges. */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '-46vh', // container centre lands at ~14vh → ring near the top edge
          width: '128vw',
          height: '120vh',
          transform: 'translateX(-50%) rotate(-30deg)',
          transformOrigin: '50% 50%',
        }}
      >
        <BlackHoleLaser
          color="#fff1e6"
          ringRadius={0.24}
          thickness={0.05}
          wispIntensity={8}
          flowSpeed={0.22}
          fogIntensity={2.4}
        />
      </div>

      {/* dark feather: the canvas dissolves into the unified deep-space gradient
          below, with no bright atmospheric band of its own. The actual descent
          into the sky is owned by the altitude crossfade, which now holds this
          cosmos dark and only resolves to sky-blue late, right at the hinge. */}
      <div
        style={{
          position: 'absolute',
          top: '100vh',
          left: 0,
          width: '100%',
          height: '110vh',
          background:
            'linear-gradient(to bottom, #000005 0%, #01030e 34%, #03091f 64%, rgba(6,17,42,0.55) 86%, transparent 100%)',
        }}
      />
    </div>
  );
}
