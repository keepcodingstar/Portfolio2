'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Odometer from '@/components/Odometer';

/**
 * Intro only — the number counting 0 → 100 over a faint haze, with the page's
 * clouds (<CloudField/>) covering the sky behind it the whole time.
 *
 * The clouds don't live here: they belong to the page. The instant the count
 * lands we fire `preloader:done` — CloudField catches it and SCATTERS the cover
 * apart into the resting bank, while this layer's number + haze lift away and
 * unmount. Reduced motion skips the count entirely.
 */

const REVEAL_MS = 700; // number + haze lift away, then the layer unmounts

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
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setPhase('done');
    }
    // Mark the document as "preloading" so chrome that lives ABOVE the intro
    // (the side-nav) can stay hidden until the loader clears. Added here, before
    // AltitudeProvider reveals the body, so the nav never flashes in first.
    document.body.classList.add('preloading');
    // User scroll is locked for the loading period by the input-blocking effect
    // below (NOT via body overflow, which would clamp AltitudeProvider's
    // centre-anchor scroll back to the top).

    // Drop the pre-paint cover (html.pl-cover, set in layout.tsx before the page
    // rendered) once the clouds have actually painted their first frame: the
    // cover dissolves out AS the clouds materialise underneath, so they read as
    // fading in — not popping in fully-formed when a blind timer lifts the cover.
    // A safety timeout clears it even if the canvas never signals; reduced motion
    // clears it at once.
    const root = document.documentElement;
    let dropId = 0;
    const reveal = () => {
      root.classList.add('pl-reveal'); // start the cross-fade (see globals.css)
      dropId = window.setTimeout(() => root.classList.remove('pl-cover', 'pl-reveal'), 1000);
    };
    if (reduced) {
      root.classList.remove('pl-cover');
    }
    window.addEventListener('clouds:ready', reveal, { once: true });
    const safetyId = window.setTimeout(reveal, 1600);
    return () => {
      window.removeEventListener('clouds:ready', reveal);
      clearTimeout(safetyId);
      clearTimeout(dropId);
    };
  }, []);

  // safety net: if we ever reach 'done' without having signalled (shouldn't
  // happen), make sure the flag is dropped so the nav can never stay hidden.
  useEffect(() => {
    if (phase === 'done') document.body.classList.remove('preloading');
  }, [phase]);

  // Lock USER scrolling while the intro is up (count + reveal). We deliberately
  // do NOT use overflow:hidden — that collapses the page height and yanks
  // AltitudeProvider's centre-anchor (the page is parked at the sky, scrollY > 0)
  // back to the top. Instead we swallow user scroll INPUT — wheel, touch and the
  // scroll keys. Programmatic window.scrollTo (the sky anchor) is unaffected, so
  // the hero still lands centred; the moment the loader clears, scroll is free.
  useEffect(() => {
    if (phase === 'done') return;
    const block = (e: Event) => e.preventDefault();
    const SCROLL_KEYS = new Set([
      'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ', 'Spacebar',
    ]);
    const onKey = (e: KeyboardEvent) => {
      if (SCROLL_KEYS.has(e.key)) e.preventDefault();
    };
    window.addEventListener('wheel', block, { passive: false });
    window.addEventListener('touchmove', block, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', block);
      window.removeEventListener('touchmove', block);
      window.removeEventListener('keydown', onKey);
    };
  }, [phase]);

  const handleCountDone = useCallback(() => {
    setPhase('reveal');
    // the count just landed — fire the scatter NOW so the cloud cover bursts
    // apart as the number lifts away (drop "preloading" so the nav can fade in),
    // then unmount this layer once the number has cleared.
    document.body.classList.remove('preloading');
    window.dispatchEvent(new Event('preloader:done'));
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
