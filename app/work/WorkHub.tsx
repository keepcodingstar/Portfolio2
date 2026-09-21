'use client';

import Link from 'next/link';
import RevealBody from '@/components/RevealBody';
import WorkTop from '@/components/work/WorkTop';
import { CaseStudyProjectLink } from '@/components/work/CheckoutTransition';
import SiteFooter from '@/components/SiteFooter';
import { useReveal } from '@/components/work/useReveal';
import { econicTitle } from './econic/econic-content';
import './work.css';
import '../portfolio-type.css';

/**
 * THE HANGAR — /work
 * A plain-sky index where the projects are parked. Every project is a glass
 * slab; the ones with a written study link into it, the rest are honestly
 * marked as in progress. Same ion atmosphere as the journey homepage, none of
 * its weather.
 */

type Project = {
  slug: string;
  href?: string; // present only when a full study exists
  name: string;
  context: string;
  tags: string[];
  metric: string;
  unit?: string;
  label: string;
  soon?: string;
};

const PROJECTS: Project[] = [
  {
    slug: 'checkout-migration',
    href: '/work/checkout',
    name: 'Faster Checkout Through an In-House Redesign',
    context:
      'Bringing VIRGIO’s checkout in-house after sale traffic exposed a bottleneck, with simpler address and payment decisions.',
    tags: ['Virgio', 'Conversion', '2025'],
    metric: '+2.68',
    unit: '%',
    label: 'conversion',
  },
  {
    slug: 'amodira',
    href: '/work/amodira',
    name: 'Audio Experience for Fragrance Discovery',
    context:
      'Sound of the Scent for Amodira. I led concept development and interaction design, and created eight tracks using AI to convey each perfume’s character and mood.',
    tags: ['Virgio', 'Concept development', 'Fragrance', '2025'],
    metric: '2nd',
    label: 'most interacted · after the Back button',
  },
  {
    slug: 'fair-pricing',
    href: '/work/fair-pricing',
    name: 'Clarifying Prices for Fashion Shoppers',
    context:
      'A bill-style price breakdown. Silver at DIGIES for a trust-building element, and company IP behind Econic Fair.',
    tags: ['Virgio', 'E-commerce', '2024', 'Live · Company IP'],
    metric: '500',
    unit: 'K+',
    label: 'organic views · customer’s post',
  },
  {
    slug: 'econic',
    href: '/work/econic',
    name: econicTitle,
    context:
      'Virgio’s 2nd-anniversary “anti-sale” — every garment at its cost to make. I co-designed the campaign UI, anchored by a Preview toggle that let shoppers see every sale price days before it went live. Won Best Brand Campaign at the e4m RetailEX Awards 2026.',
    tags: ['Virgio', 'Campaign UI', '2025', 'Award'],
    metric: '50',
    unit: '×',
    label: 'revenue · Eco-nic Fair days',
  },
];

function Card({ p, i }: { p: Project; i: number }) {
  const idx = String(i + 1).padStart(2, '0');
  const ProjectLink = p.href === '/work/checkout' || p.href === '/work/amodira' || p.href === '/work/econic' ? CaseStudyProjectLink : Link;
  const inner = (
    <>
      <span className="proj-idx">{idx}</span>
      <div className="proj-main">
        <h2 className="proj-name">{p.name}</h2>
        <p className="proj-ctx">{p.context}</p>
        <ul className="proj-tags">
          {p.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
      <div className="proj-aside">
        <span className="proj-metric tnum">
          {p.metric}
          {p.unit && <span className="u">{p.unit}</span>}
        </span>
        <span className="proj-mlabel">{p.label}</span>
        {p.href ? (
          <span className="proj-go">
            Read study <span className="ar" aria-hidden>→</span>
          </span>
        ) : (
          <span className="proj-soon">{p.soon}</span>
        )}
      </div>
    </>
  );

  return (
    <li data-reveal className="reveal" style={{ transitionDelay: `${i * 0.07}s` }}>
      {p.href ? (
        <ProjectLink href={p.href} className="proj glass" aria-label={`${p.name} — read case study`}>
          {inner}
        </ProjectLink>
      ) : (
        <div className="proj glass">{inner}</div>
      )}
    </li>
  );
}

export default function WorkHub() {
  useReveal();

  return (
    <div className="portfolio-type">
      <RevealBody />
      <div className="work-bg" aria-hidden />
      <WorkTop
        back={{ href: '/', label: 'Sameer Kapil' }}
        links={[
          { href: '/', label: 'Home' },
          { href: 'mailto:sameerkapildesigns@gmail.com', label: 'Contact', cta: true },
        ]}
      />

      <div className="work">
        <main className="work-main">
          <section className="hub-hero reveal" data-reveal>
            <p className="cs-eyebrow">Selected work · 2021–2025</p>
            <h1>
              Design that moved <em>the numbers.</em>
            </h1>
            <p className="hub-lede">
              Checkout, pricing and trust flows where a single percentage point is real
              money. A few of them are written up in full — the rest are on their way.
            </p>
          </section>

          <ul className="hub-list">
            {PROJECTS.map((p, i) => (
              <Card key={p.slug} p={p} i={i} />
            ))}
          </ul>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
