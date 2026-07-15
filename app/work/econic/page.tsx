'use client';

import RevealBody from '@/components/RevealBody';
import WorkTop from '@/components/work/WorkTop';
import SiteFooter from '@/components/SiteFooter';
import { useReveal } from '@/components/work/useReveal';
import Link from 'next/link';
import '../work.css';

/**
 * Eco-nic Fair '25 — Virgio's 2nd-anniversary "anti-sale": every garment sold
 * at its exact cost-to-make, up to 70% off, over three days (Nov 7–9, 2025).
 * The strategic knot was a pre-buzz paradox — build desire for a sale while
 * telling shoppers "don't buy yet" — solved with a Preview · Cost-to-make
 * toggle that let people see every sale price days early. Built on the Fair
 * Pricing bill widget (the company IP that was the root of the whole event),
 * the campaign won Best Brand Campaign of the Year at the e4m RetailEX Awards
 * 2026. Co-designed across all surfaces with the Virgio design team. Page chrome
 * is the altitude glass theme; the product shots keep their own palette because
 * they are the real artifact.
 */

const IMG = '/work/econic';

export default function EconicFair() {
  useReveal();

  return (
    <>
      <RevealBody />
      <div className="work-bg" aria-hidden />
      <WorkTop
        back={{ href: '/work', label: 'Work' }}
        links={[
          { href: '/', label: 'Home' },
          { href: 'mailto:sameerkapildesigns@gmail.com', label: 'Contact', cta: true },
        ]}
      />

      <div className="work cs">
        <main className="work-main">
          {/* HERO — toggle-led, with the award front-loaded as the BLUF proof */}
          <section className="cs-hero reveal" data-reveal>
            <div>
              <p className="cs-eyebrow">Virgio · Eco-nic Fair ’25 · Campaign UI, 2025</p>
              <h1>
                Previewing the sale before it started — and driving <em>50× revenue</em> when it did
              </h1>
              <p className="cs-hero-desc">
                For its 2nd anniversary, Virgio ran the <strong>Eco-nic Fair ’25</strong> — an
                “anti-sale” that sold every garment at its exact <strong>cost to make</strong>, up
                to 70% off, over three days. That created a paradox: how do you build buzz for a
                sale while telling shoppers <strong>“don’t buy yet”</strong>? Our answer was a{' '}
                <strong>Preview · Cost-to-make toggle</strong> pinned to the top of the whole
                journey — flip it and every price on the page swaps to its upcoming sale price. It
                became the most-appreciated part of the fair, which drove{' '}
                <strong>50× revenue</strong> over its three days and won{' '}
                <strong>Best Brand Campaign of the Year</strong> at the e4m RetailEX Awards 2026.
              </p>
            </div>
            <div className="cs-meta glass">
              <div className="cs-meta-row">
                <span className="cs-meta-label">Role</span>
                <span className="cs-meta-value">Co-designer · Virgio design team</span>
              </div>
              <div className="cs-meta-row">
                <span className="cs-meta-label">Scope</span>
                <span className="cs-meta-value">Campaign UI — PLP, PDP, cart, all phases</span>
              </div>
              <div className="cs-meta-row">
                <span className="cs-meta-label">The event</span>
                <span className="cs-meta-value">Cost-to-make “anti-sale” · Nov 7–9, 2025</span>
              </div>
              <div className="cs-meta-row">
                <span className="cs-meta-label">Recognition</span>
                <span className="cs-meta-value">e4m RetailEX 2026 · Best Brand Campaign</span>
              </div>
              <div className="cs-meta-row">
                <span className="cs-meta-label">Status</span>
                <span className="cs-meta-value">
                  <span className="live" aria-hidden />
                  Shipped · Live 2025
                </span>
              </div>
            </div>
          </section>

          {/* OUTCOMES — the award it won, the shipped customer number, and the
              signature interaction. Real, attributed proof up front; the 50× and
              7× figures carry an honest event-spike caveat. */}
          <section className="cs-results reveal" data-reveal>
            {/* the award — the headline proof */}
            <div className="cs-accolades glass">
              <figure className="cs-accolades-shot">
                <img
                  src={`${IMG}/award-retailex.png`}
                  alt="The e4m RetailEX Awards 2026 trophy: Best Brand Campaign of the Year, awarded for VIRGIO Eco-nic Fair ’25."
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <div>
                <p className="cs-accolades-eyebrow">Recognition</p>
                <div className="cs-stat">
                  <span className="cs-stat-num">Best Campaign</span>
                  <span className="cs-stat-label">
                    e4m RetailEX Awards 2026 · Best Brand Campaign of the Year
                  </span>
                </div>
                <p className="cs-accolades-body">
                  The Eco-nic Fair ’25 was named <strong>Best Brand Campaign of the Year</strong> at
                  the e4m RetailEX Awards — recognition for the whole cost-to-make idea, the toggle
                  that fronted it, and the phased journey that carried it.
                </p>
              </div>
            </div>

            {/* the headline number — 50× revenue over the fair */}
            <div className="cs-ip glass">
              <div className="cs-stat">
                <span className="cs-stat-num tnum">50×</span>
                <span className="cs-stat-label">
                  revenue over the three days of the fair
                </span>
              </div>
              <p className="cs-accolades-body" style={{ maxWidth: '34ch' }}>
                The toggle that fronted it became the <strong>most-appreciated</strong> element of
                the fair. Built on the <strong>Fair Pricing</strong> bill widget — the company IP
                that was the root of the whole event — and sub-brand <strong>Amodira</strong> rode
                the same days to <strong>7× revenue</strong>.
              </p>
            </div>

            {/* the shipped customer number — from the recap page that went live */}
            <div className="cs-ip glass">
              <div className="cs-stat">
                <span className="cs-stat-num">9,755</span>
                <span className="cs-stat-label">
                  shoppers bought at cost price during the three-day fair
                </span>
              </div>
              <p className="cs-accolades-body" style={{ maxWidth: '34ch' }}>
                The number Virgio published on its own post-sale recap — “even when it meant{' '}
                <strong>70% off</strong>.”
              </p>
            </div>
          </section>

          {/* 01 PROBLEM — the pre-buzz paradox */}
          <section className="cs-section reveal" data-reveal>
            <div className="cs-sec-head">
              <h2 className="cs-sec-title">The pre-buzz paradox</h2>
            </div>
            <p className="hub-lede" style={{ margin: '0 0 2rem' }}>
              Every big sale wants a runway of anticipation. But the moment you announce one,
              full-price shopping stalls — everyone waits. The brief was sharper than “promote a
              sale”: <strong>build desire for days, while actively telling people not to buy
              yet</strong> — and do it as a statement, not a countdown banner.
            </p>
            <div className="cs-problem glass">
              <p className="cs-cell-label">Defined problem</p>
              <p className="cs-statement">
                We needed shoppers to <strong>anticipate</strong> the Eco-nic Fair without{' '}
                <strong>collapsing sales on the days before it</strong> — communicating exactly{' '}
                <strong>what would be available at what price</strong>, while the honest message was
                literally “don’t buy before the sale starts.”
              </p>
            </div>

            <div className="cs-quote glass">
              <blockquote>
                “Telling someone not to buy is easy. Making them excited that they shouldn’t — that
                was the design problem.”
              </blockquote>
            </div>
          </section>

          {/* 02 HOW MIGHT WE */}
          <section className="cs-section reveal" data-reveal>
            <div className="cs-sec-head">
              <h2 className="cs-sec-title">How might we</h2>
            </div>
            <p className="hub-lede" style={{ margin: '0 0 2rem' }}>
              The paradox turned into three questions the campaign UI had to answer.
            </p>
            <div className="cs-hmw glass">
              <div className="cs-hmw-row">
                <p className="cs-hmw-q">
                  <span className="hmw">HMW</span>turn “don’t buy yet” into anticipation, not a
                  closed door?
                </p>
                <p className="cs-hmw-a">
                  Let shoppers <strong>preview</strong> the exact sale price now — desire you can
                  see, on a timer.
                </p>
              </div>
              <div className="cs-hmw-row">
                <p className="cs-hmw-q">
                  <span className="hmw">HMW</span>show what’s coming at what price, across the whole
                  catalogue?
                </p>
                <p className="cs-hmw-a">
                  A single toggle that re-prices <strong>every product</strong> in place — no
                  separate landing page to maintain.
                </p>
              </div>
              <div className="cs-hmw-row">
                <p className="cs-hmw-q">
                  <span className="hmw">HMW</span>make a three-day event feel like an occasion, not
                  a banner?
                </p>
                <p className="cs-hmw-a">
                  Stage it in <strong>phases</strong> — curtain-raiser, pre-sale, sale, a thank-you
                  — each with its own UI shift.
                </p>
              </div>
            </div>
          </section>

          {/* 03 THE IDEA — preview the sale (toggle before/after) */}
          <section className="cs-section reveal" data-reveal>
            <div className="cs-sec-head">
              <h2 className="cs-sec-title">The idea: a price you can preview</h2>
            </div>
            <div className="cs-split-copy" style={{ maxWidth: '64ch' }}>
              <p>
                Instead of hiding the sale behind a “coming soon” promise, we put it in the
                shopper’s hands. A <strong>Preview · Cost-to-make</strong> toggle sat at the top of
                the journey through every phase. Off, you saw today’s price. Flip it on — the bar
                turns green — and <strong>every price on the page</strong> drops to its exact
                cost-to-make sale price, with a live countdown to Nov 7–9 and one honest line:{' '}
                <strong>“Zero margins. Zero markup.”</strong>
              </p>
              <p>
                It only works because Virgio already shows where every rupee goes. The toggle is the{' '}
                <strong>Fair Pricing bill widget</strong> — the company IP that was the root of the
                whole event — turned into a campaign mechanic: the same transparency, now letting
                you watch the margin disappear in real time.
              </p>
            </div>
            <div className="cs-split">
              <figure className="cs-shot glass">
                <img
                  src={`${IMG}/plp-toggle-off.png`}
                  alt="Eco-nic Fair PLP with the Preview toggle OFF: a black bar reading ‘Preview — Cost to make’, a countdown of 2 days 13 hours, and products at today’s price of ₹2,100 (was ₹3,000)."
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  <b>Toggle off · today’s price.</b> A black bar and a countdown. Products sit at
                  their normal price — ₹2,100.
                </figcaption>
              </figure>
              <figure className="cs-shot glass">
                <img
                  src={`${IMG}/plp-toggle-on.png`}
                  alt="The same PLP with the Preview toggle ON: the bar turns green and every product re-prices to its cost-to-make sale price of ₹1,290, with the strikethrough showing ₹2,100 today."
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  <b>Toggle on · the sale, previewed.</b> The bar goes green and every price drops to
                  its cost-to-make — ₹1,290 — days early.
                </figcaption>
              </figure>
            </div>
            <p className="cs-verdict">
              The thing people couldn’t stop touching wasn’t a banner. It was{' '}
              <strong>proof you could hold</strong> — the sale price, on the real product, before
              the sale even started.
            </p>
          </section>

          {/* 04 THE PHASED JOURNEY */}
          <section className="cs-section reveal" data-reveal>
            <div className="cs-sec-head">
              <h2 className="cs-sec-title">Staged in four phases</h2>
            </div>
            <p className="hub-lede" style={{ margin: '0 0 0' }}>
              An occasion, not a banner. Each phase changed the UI and reset the countdown, so a
              returning shopper always knew exactly where they were in the story.
            </p>
            <div className="cs-grid two" style={{ marginTop: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}>
              <div className="cs-cell glass">
                <p className="cs-cell-label">01 · Curtain-raiser</p>
                <p>
                  The first signal. Eco-nic branding lands on the PLP with a countdown and the
                  promise — “shop Virgio at its making cost.”
                </p>
              </div>
              <div className="cs-cell glass">
                <p className="cs-cell-label">02 · Pre-sale · 3 days</p>
                <p>
                  The <strong>toggle goes live</strong>. Shoppers preview every cost-to-make price
                  while the clock counts down — anticipation without the discount.
                </p>
              </div>
              <div className="cs-cell glass">
                <p className="cs-cell-label">03 · Sale · 3 days</p>
                <p>
                  Nov 7–9. The preview becomes the price across PLP, PDP and cart — every garment
                  sold at its exact cost to make.
                </p>
              </div>
              <div className="cs-cell glass">
                <p className="cs-cell-label">04 · Post-sale</p>
                <p>
                  A recap page that thanks the community and tells them how big it got — the
                  bookend that closed the loop.
                </p>
              </div>
            </div>
          </section>

          {/* REFLECTION */}
          <section className="cs-reflect glass reveal" data-reveal>
            <div className="cs-reflect-label">Takeaway</div>
            <p className="cs-reflect-text">
              “The strongest campaign mechanic we had wasn’t a new idea — it was an old one, made
              honest. Fair Pricing already showed the cost. The fair just let people watch the
              margin vanish, on a timer, before it was even gone.”
            </p>
          </section>

          {/* NEXT */}
          <nav className="cs-next">
            <Link href="/work/fair-pricing">
              <span aria-hidden>←</span> Prev: Fair Pricing
            </Link>
            <Link href="/work/checkout">
              Next: Checkout, off Shopify <span aria-hidden>→</span>
            </Link>
          </nav>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
