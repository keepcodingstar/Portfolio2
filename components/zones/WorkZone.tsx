'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlowCard from '@/components/GlowCard';

gsap.registerPlugin(ScrollTrigger);

/**
 * The "down" world — the shipped work, presented as a sticky stack of glass
 * cards. Each card pins beneath the header; as you scroll, the card above
 * recedes (scale + fade) while the next slides up to meet it — a deck of
 * case studies dealt one at a time. Ion-teal edge glow tracks the pointer.
 * Reduced motion falls back to a plain vertical list (see globals.css).
 */

type Case = {
  name: string;
  context: string;
  meta: string;
  href?: string;
  img?: { src: string; alt: string };
  metric?: string;
};

const CASES: Case[] = [
  {
    name: 'Checkout, off Shopify',
    context:
      'Migrated the most revenue-critical flow off Shopify to escape peak-load rate limits, rebuilding address and payment selection around instant feedback.',
    meta: '+2.68% conversion',
    href: '/work/checkout',
    metric: '+2.68%',
    img: { src: '/work/checkout/thumb.jpg', alt: 'Virgio in-house checkout — payment, map address pin, and add-address screens' },
  },
  {
    name: 'Fair Pricing',
    context:
      'A price-transparency widget shipped on day one that went viral, won best e-commerce feature, and became registered company IP.',
    meta: '500K+ users reached',
    href: '/work/fair-pricing',
    img: { src: '/work/fair-pricing/thumb.jpg', alt: 'Fair Pricing widget on a product page' },
  },
  {
    name: 'Eco-nic Fair',
    context:
      'Virgio’s anniversary “anti-sale”, every garment at cost. A Preview toggle let shoppers see every sale price days early. Best Brand Campaign, e4m RetailEX 2026.',
    meta: '50× revenue · sale days',
    href: '/work/econic',
    img: { src: '/work/econic/thumb.jpg', alt: 'Eco-nic Fair price preview toggle' },
  },
  {
    name: 'Amodira: Sound of the Scent',
    context:
      'A 0→1 perfume brand for Virgio. An original song per fragrance whose layers mirror its notes — you hear the perfume before you smell it.',
    meta: 'Brand 0→1 · Virgio',
    href: '/work/amodira',
    img: { src: '/work/amodira/thumb.jpg', alt: 'Amodira fragrance with its sound layers' },
  },
];

function CardInner({ c, i }: { c: Case; i: number }) {
  const idx = String(i + 1).padStart(2, '0');
  return (
    <GlowCard>
      {c.img ? (
        <div className="gc-media">
          <Image
            className="gc-img"
            src={c.img.src}
            alt={c.img.alt}
            width={720}
            height={450}
            sizes="(min-width: 820px) 50vw, 100vw"
          />
        </div>
      ) : (
        <div className="gc-media gc-media--metric">
          <span className="gc-bigmetric tnum">{c.metric}</span>
        </div>
      )}
      <div className="gc-body">
        <span className="gc-idx">{idx}</span>
        <h3 className="gc-title">{c.name}</h3>
        <p className="gc-ctx">{c.context}</p>
        <div className="gc-foot">
          <span className="gc-meta">{c.meta}</span>
          {c.href ? (
            <span className="gc-go">
              Read study <span className="ar" aria-hidden>→</span>
            </span>
          ) : (
            <span className="gc-soon">In writing</span>
          )}
        </div>
      </div>
      {c.href && (
        <Link
          href={c.href}
          className="gc-stretch"
          aria-label={`${c.name}: read case study`}
        />
      )}
    </GlowCard>
  );
}

export default function WorkZone() {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = stackRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.gcard');
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card, {
          scale: 0.95,
          ease: 'none',
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="zone-work" className="zone zone-work" aria-labelledby="work-title">
      <div className="panel wide">
        <div className="section-head">
          <h2 id="work-title" className="display">Case studies</h2>
          <Link href="/work" className="count work-all">All work →</Link>
        </div>
        <div className="work-stack" ref={stackRef}>
          {CASES.map((c, i) => (
            <div
              key={c.name}
              className="gcard"
              style={{
                top: `calc(clamp(7rem, 15vh, 9.5rem) + ${i} * 0.85rem)`,
                zIndex: i + 1,
              }}
            >
              <CardInner c={c} i={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
