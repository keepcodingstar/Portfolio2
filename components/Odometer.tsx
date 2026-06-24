'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * A checkpoint odometer — it doesn't count through every number, it *lands* on a
 * short list of readings (default 00 · 15 · 52 · 87 · 99), holding a beat on each
 * the way a loading meter jumps. Between checkpoints every digit wheel turns the
 * same direction (always upward, wrapping when it must) by the shortest forward
 * amount, so the number reads as climbing and the wheels never fight each other.
 * Bigger jumps are given a little more time, so the turning speed stays even and
 * calm. A whisper of motion blur on the moving wheels resolves to crisp on each
 * landing.
 *
 * The strip carries a trailing "0" after the "9" so the 9 → 0 wrap is seamless:
 * at offset 10 (trailing 0) and offset 0 (leading 0) the window shows the same
 * glyph. Height is driven in `em` (each cell is exactly 1em tall), so nothing
 * needs measuring and it stays exact regardless of when the display font loads.
 *
 * Reduced motion snaps straight to the final reading and reports done.
 */

const CELLS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'] as const;

const HOLD = 0.2; // beat held on each checkpoint
const LEAD = 0.35; // beat before the first wheels turn
const TAIL = 0.36; // beat the final reading sits before handing off

type Props = { steps?: number[]; jitter?: number; onDone?: () => void };

export default function Odometer({
  steps = [0, 15, 52, 87, 99],
  jitter = 0,
  onDone,
}: Props) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const stripsRef = useRef<Array<HTMLSpanElement | null>>([]);

  const seq = steps.length ? steps : [0];
  const sig = seq.join('-');
  const digits = String(
    Math.max(...seq.map((s) => Math.trunc(Math.abs(s)))),
  ).length;

  useEffect(() => {
    const strips = stripsRef.current;
    const places = Array.from({ length: digits }, (_, i) =>
      Math.pow(10, digits - 1 - i),
    );
    const digitAt = (val: number, i: number) =>
      Math.floor(Math.abs(val) / places[i]) % 10;

    // each load shows slightly different readings: jitter the interior
    // checkpoints by ±jitter, keeping the first (00) and last (99%) anchored and
    // the whole list strictly increasing within [0, 99]
    const max = Math.pow(10, digits) - 1;
    const last = seq.length - 1;
    const actual = seq.map((v, i) => {
      if (i === 0 || i === last || jitter <= 0) return v;
      return v + Math.round((Math.random() * 2 - 1) * jitter);
    });
    for (let i = 1; i < actual.length; i++) {
      actual[i] = Math.min(max, Math.max(actual[i - 1] + 1, actual[i]));
    }

    // cumulative, monotonically-increasing offset per reel (all wheels turn one
    // way); the window shows offset mod 10
    const cum = places.map((_, i) => digitAt(actual[0], i));
    const state = cum.map((o) => ({ o }));
    const prev = [...cum];

    const render = () => {
      for (let i = 0; i < places.length; i++) {
        const strip = strips[i];
        if (!strip) continue;
        const o = state[i].o;
        const off = ((o % 10) + 10) % 10;
        const speed = Math.abs(o - prev[i]); // digits travelled this frame
        prev[i] = o;
        const blur = Math.min(2.5, speed * 1.3);
        strip.style.transform = `translateY(${-off}em)`;
        strip.style.filter = blur > 0.12 ? `blur(${blur}px)` : 'none';
      }
    };
    render();

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce) {
      const final = actual[actual.length - 1];
      places.forEach((_, i) => (state[i].o = digitAt(final, i)));
      render();
      onDone?.();
      return;
    }

    const cleanups: Array<() => void> = [];
    const tl = gsap.timeline({
      onUpdate: render,
      onComplete: () => {
        strips.forEach((s) => s && (s.style.filter = 'none'));
        if (wrapRef.current) {
          gsap.fromTo(
            wrapRef.current,
            { scale: 0.99 },
            { scale: 1, duration: 0.5, ease: 'back.out(2.4)' },
          );
        }
        const id = window.setTimeout(() => onDone?.(), TAIL * 1000);
        cleanups.push(() => clearTimeout(id));
      },
    });
    cleanups.push(() => tl.kill());

    let at = LEAD;
    for (let s = 1; s < actual.length; s++) {
      let maxDelta = 0;
      const deltas = places.map((_, i) => {
        const target = digitAt(actual[s], i);
        const d = (target - (cum[i] % 10) + 10) % 10; // shortest forward turn
        maxDelta = Math.max(maxDelta, d);
        return d;
      });
      const dur = 0.46 + maxDelta * 0.07; // even speed: longer turns take longer
      places.forEach((_, i) => {
        cum[i] += deltas[i];
        // ease-in-out → the wheel speeds up, then slows to a stop on the digit
        // (no overshoot)
        tl.to(state[i], { o: cum[i], duration: dur, ease: 'power2.inOut' }, at);
      });
      at += dur + HOLD;
    }

    return () => cleanups.forEach((fn) => fn());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sig, digits, jitter, onDone]);

  return (
    <span className="odo" ref={wrapRef} aria-hidden>
      {Array.from({ length: digits }).map((_, i) => (
        <span className="odo-digit" key={i}>
          <span
            className="odo-strip"
            ref={(el) => {
              stripsRef.current[i] = el;
            }}
          >
            {CELLS.map((d, j) => (
              <span key={j}>{d}</span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}
