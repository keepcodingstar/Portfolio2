'use client';

import StarsBackground from '@/components/StarsBackground';
import ShootingStars from '@/components/ShootingStars';

/**
 * The cosmos of the "up" world — the creative side. The Aceternity stars +
 * shooting-stars fields, mounted inside the altitude-gated wrapper: its opacity
 * is bound to the shared --space-o altitude variable (set by AltitudeProvider)
 * and masked out at the black-hole apex (see .starfield in globals.css), so the
 * cosmos emerges only as you ascend past the sky. Streaks tinted to the locked
 * ion-teal accent rather than Aceternity's default purple.
 */
export default function Starfield() {
  return (
    <div
      className="starfield"
      aria-hidden
      style={{ opacity: 'var(--space-o)' }}
    >
      <StarsBackground />
      <ShootingStars
        starColor="#2bb6d6"
        trailColor="#5ad1ee"
        minDelay={2200}
        maxDelay={5200}
      />
    </div>
  );
}
