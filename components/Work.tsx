'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The case-file list — the centerpiece. Each row is an outcome: project on the
 * left, the number on the right set large in Awesome Serif. On scroll-in the
 * row rises, an aurora-cyan "measure" draws beneath the figure, and numeric
 * metrics count up from zero — the page's one signature idea ("numbers that
 * move"), kept to this single place. Reduced motion shows everything at rest.
 */

type Metric =
  | { kind: 'num'; to: number; decimals?: number; prefix?: string; suffix?: string }
  | { kind: 'text'; text: string };

type Case = {
  project: string;
  context: string;
  label: string;
  metric: Metric;
};

const CASES: Case[] = [
  {
    project: 'Fair Pricing Widget',
    context: 'Award-winning pricing experience — now company IP.',
    label: 'users reached',
    metric: { kind: 'num', to: 500, suffix: 'K+' },
  },
  {
    project: 'Checkout migration',
    context: 'Rebuilt the Shopify checkout in-house — and cut time-to-convert by 25.74%.',
    label: 'conversion',
    metric: { kind: 'num', to: 2.68, decimals: 2, prefix: '+', suffix: '%' },
  },
  {
    project: 'Login & auth revamp',
    context: 'Reworked the Kwikpass → Shiprocket sign-in flow end to end.',
    label: 'login success',
    metric: { kind: 'num', to: 20, prefix: '+', suffix: '%' },
  },
  {
    project: 'Amodira cart widgets',
    context: 'Cart and offer widgets for the Eco-nic Fair campaign.',
    label: 'sales lift',
    metric: { kind: 'num', to: 7, suffix: '×' },
  },
  {
    project: 'Sound of the Scent',
    context: 'An audio moment on perfume PDPs — the 2nd most-interacted element on the page.',
    label: 'most interacted',
    metric: { kind: 'text', text: '2nd' },
  },
  {
    project: 'ZERO',
    context: 'A thrift and circular-fashion platform, taken from idea to shipped product.',
    label: 'built from scratch',
    metric: { kind: 'text', text: '0→1' },
  },
];

const fmtNum = (v: number, m: Extract<Metric, { kind: 'num' }>) =>
  `${m.prefix ?? ''}${v.toFixed(m.decimals ?? 0)}`;

function Row({ c, i }: { c: Case; i: number }) {
  const ref = useRef<HTMLElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  // reveal: flip the .in class once, when the row scrolls into view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // count-up: only numeric metrics, only after the row is in view
  useEffect(() => {
    if (c.metric.kind !== 'num' || !numRef.current) return;
    const el = numRef.current;
    const m = c.metric;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!inView || reduce) {
      if (inView) el.textContent = fmtNum(m.to, m);
      return;
    }

    const dur = 1100;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    let start: number | null = null;
    let raf = 0;
    const step = (now: number) => {
      if (start === null) start = now;
      const t = Math.min(1, (now - start) / dur);
      el.textContent = fmtNum(m.to * ease(t), m);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, c.metric]);

  return (
    <article className={`case${inView ? ' in' : ''}`} ref={ref}>
      <div className="info">
        <span className="idx">{String(i + 1).padStart(2, '0')}</span>
        <h3 className="serif">{c.project}</h3>
        <p className="ctx">{c.context}</p>
      </div>
      <div className="measure-wrap">
        {c.metric.kind === 'text' ? (
          <span className="metric">{c.metric.text}</span>
        ) : (
          <span className="metric tnum">
            <span ref={numRef}>{`${c.metric.prefix ?? ''}0`}</span>
            <span className="unit">{c.metric.suffix}</span>
          </span>
        )}
        <span className="mlabel">{c.label}</span>
        <span className="measure" aria-hidden />
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <>
      {CASES.map((c, i) => (
        <Row key={c.project} c={c} i={i} />
      ))}
    </>
  );
}
