'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

/**
 * The "down" world — descending through the colours of the sky toward the
 * ground. Here the work is measured: the business UI/UX projects where a single
 * percentage point is real money. Each row's ion-cyan numeral counts up from zero
 * on reveal like an altimeter readout — the site's signature ("numbers that
 * move"), kept to this place.
 * Reduced motion shows the final figure at rest.
 */

type Metric = { to: number; decimals?: number; prefix?: string; suffix?: string };

type Case = {
  project: string;
  context: string;
  label: string;
  metric: Metric;
  href?: string;
};

const CASES: Case[] = [
  {
    project: 'Fair Pricing Widget',
    context: 'Award-winning pricing experience — now company IP.',
    label: 'users reached',
    metric: { to: 500, suffix: 'K+' },
    href: '/work/fair-pricing',
  },
  {
    project: 'Checkout migration',
    context: 'Rebuilt the Shopify checkout in-house — and cut time-to-convert by 25.74%.',
    label: 'conversion',
    metric: { to: 2.68, decimals: 2, prefix: '+', suffix: '%' },
    href: '/work/checkout',
  },
  {
    project: 'Login & auth revamp',
    context: 'Reworked the Kwikpass → Shiprocket sign-in flow end to end.',
    label: 'login success',
    metric: { to: 20, prefix: '+', suffix: '%' },
  },
];

const fmt = (v: number, m: Metric) =>
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

  // count-up: only after the row is in view; snap for reduced motion
  useEffect(() => {
    if (!numRef.current) return;
    const el = numRef.current;
    const m = c.metric;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!inView || reduce) {
      if (inView) el.textContent = fmt(m.to, m);
      return;
    }

    const dur = 1100;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    let start: number | null = null;
    let raf = 0;
    const step = (now: number) => {
      if (start === null) start = now;
      const t = Math.min(1, (now - start) / dur);
      el.textContent = fmt(m.to * ease(t), m);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, c.metric]);

  return (
    <article className={`case${inView ? ' in' : ''}${c.href ? ' linked' : ''}`} ref={ref}>
      <div className="info">
        <span className="idx">{String(i + 1).padStart(2, '0')}</span>
        <h3 className="serif">{c.project}</h3>
        <p className="ctx">{c.context}</p>
        {c.href ? (
          <span className="case-cta">
            Read case study <span className="case-go" aria-hidden>→</span>
          </span>
        ) : (
          <span className="case-soon">Case study in writing</span>
        )}
      </div>
      <div className="measure-wrap">
        <span className="readout">
          <span className="metric tnum">
            <span ref={numRef}>{`${c.metric.prefix ?? ''}0`}</span>
            <span className="unit">{c.metric.suffix}</span>
          </span>
        </span>
        <span className="gauge" aria-hidden>
          <span className="gauge-fill" />
        </span>
        <span className="mlabel">{c.label}</span>
      </div>
      {c.href && (
        <Link
          href={c.href}
          className="case-stretch"
          aria-label={`${c.project} — read case study`}
        />
      )}
    </article>
  );
}

export default function WorkZone() {
  return (
    <section id="zone-work" className="zone zone-work" aria-labelledby="work-title">
      <div className="panel wide">
        <div className="section-head">
          <h2 id="work-title" className="display">Selected work</h2>
          <Link href="/work" className="count work-all">All case studies →</Link>
        </div>
        {CASES.map((c, i) => (
          <Row key={c.project} c={c} i={i} />
        ))}
      </div>
    </section>
  );
}
