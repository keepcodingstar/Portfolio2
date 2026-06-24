'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Odometer from '@/components/Odometer';

/**
 * Intro only — now a clean WHITE field with the number counting 0 → 100.
 *
 * The clouds no longer live here: they belong to the page (<CloudField/>), which
 * fades + shifts them in the moment this intro clears, so they read as part of
 * the hero and STAY. When the count lands, the white field fades to reveal the
 * hero and this layer unmounts; we fire a `preloader:done` event so CloudField
 * knows to bring the clouds in. Reduced motion skips the count entirely.
 */

const REVEAL_MS = 1100; // white field fades out, then the layer unmounts

/** The loader number is an <Odometer /> rolling 0 → 100. A safety timeout
 *  guarantees the intro proceeds even if the odometer's completion never fires. */
function Counter({ onDone }: { onDone: () => void }) {
  const done = useRef(false);
  const finish = useCallback(() => {
    if (done.current) return;
    done.current = true;
    onDone();
  }, [onDone]);

  useEffect(() => {
    const id = window.setTimeout(finish, 6000);
    return () => clearTimeout(id);
  }, [finish]);

  return (
    <div className="loader-num" aria-label="Loading">
      <Odometer steps={[0, 15, 36, 52, 87, 99]} jitter={5} onDone={finish} />
      <i>%</i>
    </div>
  );
}

export default function Preloader() {
  const [phase, setPhase] = useState<'count' | 'reveal' | 'done'>('count');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('done');
    }
    // Mark the document as "preloading" so chrome that lives ABOVE the intro
    // (the side-nav) can stay hidden until the loader clears. Added here, before
    // AltitudeProvider reveals the body, so the nav never flashes in first.
    document.body.classList.add('preloading');
    // NOTE: scroll is intentionally NOT locked here. The fixed white overlay
    // masks the page during the count, and locking body overflow would clamp
    // AltitudeProvider's centre-anchor scroll back to the top.
  }, []);

  // once the intro is fully done, drop the "preloading" flag (lets the nav fade
  // in) and signal the page so <CloudField/> can bring its clouds in.
  useEffect(() => {
    if (phase === 'done') {
      document.body.classList.remove('preloading');
      window.dispatchEvent(new Event('preloader:done'));
    }
  }, [phase]);

  const handleCountDone = useCallback(() => {
    setPhase('reveal');
    window.setTimeout(() => setPhase('done'), REVEAL_MS);
  }, []);

  return (
    <>
      {/* INTRO ONLY — a white field + the counting number. On reveal the white
          fades to show the hero, then the whole layer unmounts at 'done'. The
          live-page clouds (<CloudField/>) enter on the `preloader:done` signal. */}
      {phase !== 'done' && (
        <>
          <div className={`pl-sky${phase === 'reveal' ? ' hide' : ''}`} aria-hidden />
          <div className={`loader-core${phase === 'reveal' ? ' hide' : ''}`}>
            <Counter onDone={handleCountDone} />
          </div>
        </>
      )}
    </>
  );
}
