'use client';

import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

/**
 * The cosmos of the "up" world — the creative side. A fixed drei <Stars> field
 * whose wrapper opacity is bound to the shared --space-o altitude variable (set
 * by AltitudeProvider), so the stars emerge only as you ascend past the sky.
 * Reuses the same R3F setup as the clouds — no new dependency.
 */
export default function Starfield() {
  return (
    <div
      className="starfield"
      aria-hidden
      style={{ opacity: 'var(--space-o)' }}
    >
      <Canvas
        /* render ONCE — the field is a static backdrop; its fade in/out is
           driven by the wrapper's --space-o opacity in CSS, so it never needs
           to re-render. (Was frameloop=always animating 2600 stars every frame,
           even while invisible at the sky/work/ground — a major idle GPU cost.) */
        frameloop="demand"
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 1] }}
        gl={{ alpha: true, antialias: false }}
        style={{ background: 'transparent' }}
      >
        <Stars
          radius={80}
          depth={50}
          count={2600}
          factor={3.2}
          saturation={0}
          fade
          speed={0}
        />
      </Canvas>
    </div>
  );
}
