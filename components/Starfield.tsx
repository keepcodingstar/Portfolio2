'use client';

import { useEffect, useState } from 'react';
import StarsBackground from '@/components/StarsBackground';
import ShootingStars from '@/components/ShootingStars';

/**
 * The cosmos of the "up" world — the creative side. The Aceternity stars +
 * shooting-stars fields, mounted inside the altitude-gated wrapper: its opacity
 * is updated directly by AltitudeProvider
 * and masked out at the black-hole apex (see .starfield in globals.css), so the
 * cosmos emerges only as you ascend past the sky. Streaks tinted to the locked
 * ion-teal accent rather than Aceternity's default purple.
 */
export default function Starfield() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const space = document.getElementById('zone-space');
    if (!space) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const update = () => setActive(visible && !document.hidden && !motion.matches);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    }, { rootMargin: '30% 0px' });
    observer.observe(space);
    document.addEventListener('visibilitychange', update);
    motion.addEventListener('change', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
      motion.removeEventListener('change', update);
    };
  }, []);

  return (
    <div
      className="starfield"
      aria-hidden
      style={{ opacity: 'var(--space-o)' }}
    >
      <StarsBackground paused={!active} />
      <ShootingStars
        paused={!active}
        starColor="#2bb6d6"
        trailColor="#5ad1ee"
        minDelay={2200}
        maxDelay={5200}
      />
    </div>
  );
}
