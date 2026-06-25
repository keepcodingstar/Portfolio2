'use client';

import Link from 'next/link';
import RevealBody from '@/components/RevealBody';
import WorkTop from '@/components/work/WorkTop';
import SiteFooter from '@/components/SiteFooter';
import { useReveal } from '@/components/work/useReveal';
import './work.css';

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
    slug: 'amodira',
    href: '/work/amodira',
    name: 'Amodira: Sound of the Scent',
    context:
      'A 0→1 perfume brand for Virgio. Invented a way to sell a scent online — an original song per fragrance whose layers mirror its notes, so you feel the perfume before you smell it.',
    tags: ['Virgio', 'Brand 0→1', 'Fragrance', '2025'],
    metric: '7',
    unit: '×',
    label: 'revenue · Econic sale',
  },
  {
    slug: 'econic',
    href: '/work/econic',
    name: 'Eco-nic Fair: Preview the Sale',
    context:
      'Virgio’s 2nd-anniversary “anti-sale” — every garment at its cost to make. I co-designed the campaign UI, anchored by a Preview toggle that let shoppers see every sale price days before it went live. Won Best Brand Campaign at the e4m RetailEX Awards 2026.',
    tags: ['Virgio', 'Campaign UI', '2025', 'Award'],
    metric: '50',
    unit: '×',
    label: 'revenue · Eco-nic Fair days',
  },
  {
    slug: 'fair-pricing',
    href: '/work/fair-pricing',
    name: 'Fair Pricing',
    context:
      'A price-transparency widget built on day one that went viral, won best e-commerce feature, and became registered company IP.',
    tags: ['Virgio', 'E-commerce', '2023', 'Live · Company IP'],
    metric: '500',
    unit: 'K+',
    label: 'users reached',
  },
  {
    slug: 'checkout-migration',
    href: '/work/checkout',
    name: 'Checkout, off Shopify',
    context:
      'Migrated the most revenue-critical flow off Shopify to escape peak-load rate limits — and rebuilt address and payment selection around instant feedback.',
    tags: ['Virgio', 'Conversion', '2024'],
    metric: '+2.68',
    unit: '%',
    label: 'conversion',
  },
  {
    slug: 'login-auth',
    name: 'Login & auth revamp',
    context:
      'Reworked the Kwikpass → Shiprocket sign-in flow end to end, removing the friction that lost people at the door.',
    tags: ['Auth', 'Flows', '2024'],
    metric: '+20',
    unit: '%',
    label: 'login success',
    soon: 'Study in writing',
  },
];

function Card({ p, i }: { p: Project; i: number }) {
  const idx = String(i + 1).padStart(2, '0');
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
        <Link href={p.href} className="proj glass" aria-label={`${p.name} — read case study`}>
          {inner}
        </Link>
      ) : (
        <div className="proj glass">{inner}</div>
      )}
    </li>
  );
}

export default function WorkHub() {
  useReveal();

  return (
    <>
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

        <footer className="work-foot glass reveal" data-reveal>
          <div className="work-foot-l">
            <h3>Have a number that needs moving?</h3>
            <p>I take on a small number of product engagements a year. Tell me what’s stuck.</p>
          </div>
          <a className="mail" href="mailto:sameerkapildesigns@gmail.com">
            sameerkapildesigns@gmail.com
          </a>
        </footer>
        <SiteFooter />
      </div>
    </>
  );
}
