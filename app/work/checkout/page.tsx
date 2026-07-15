'use client';

import RevealBody from '@/components/RevealBody';
import WorkTop from '@/components/work/WorkTop';
import SiteFooter from '@/components/SiteFooter';
import { useReveal } from '@/components/work/useReveal';
import Link from 'next/link';
import '../work.css';

/**
 * Checkout, off Shopify — Virgio's most revenue-critical flow, migrated off a
 * platform that throttled at peak load and rebuilt for control. Same altitude
 * glass chrome as the Fair Pricing study; the screens are the real shipped
 * designs, exported from Figma.
 */

export default function CheckoutCase() {
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
          {/* HERO */}
          <section className="cs-hero reveal" data-reveal>
            <div>
              <p className="cs-eyebrow">Virgio · Product Design · 2024</p>
              <h1>
                Moving checkout <em>off Shopify</em> — and making it quicker on the way out
              </h1>
              <p className="cs-hero-desc">
                At peak sale traffic, our checkout leaned on a platform we didn’t fully
                control — and it showed. I helped move the highest-stakes screen in the funnel
                in-house, then rebuilt address and payment around one idea: show the consequence
                of every choice the moment it’s made.
              </p>
            </div>
            <div className="cs-meta glass">
              <div className="cs-meta-row">
                <span className="cs-meta-label">Role</span>
                <span className="cs-meta-value">Research + Design</span>
              </div>
              <div className="cs-meta-row">
                <span className="cs-meta-label">Timeline</span>
                <span className="cs-meta-value">2 weeks</span>
              </div>
              <div className="cs-meta-row">
                <span className="cs-meta-label">Team</span>
                <span className="cs-meta-value">Designer, PM, Engineer</span>
              </div>
              <div className="cs-meta-row">
                <span className="cs-meta-label">Status</span>
                <span className="cs-meta-value">
                  <span className="live" aria-hidden />
                  Live · In production
                </span>
              </div>
            </div>
          </section>

          {/* IMPACT */}
          <section className="cs-impact reveal" data-reveal>
            <div className="cs-impact-cell glass">
              <div className="cs-impact-num">+2.68%</div>
              <div className="cs-impact-label">Checkout conversion uplift — to 76.7% overall</div>
            </div>
            <div className="cs-impact-cell glass">
              <div className="cs-impact-num">25.7%</div>
              <div className="cs-impact-label">Faster to complete — down to about two minutes</div>
            </div>
            <div className="cs-impact-cell glass">
              <div className="cs-impact-num">94%</div>
              <div className="cs-impact-label">Address completion in the normal flow</div>
            </div>
          </section>

          {/* 01 PROBLEM */}
          <section className="cs-section reveal" data-reveal>
            <div className="cs-sec-head">
              <span className="cs-sec-num">01</span>
              <h2 className="cs-sec-title">Why we left the platform</h2>
            </div>
            <p className="hub-lede" style={{ margin: '0 0 2rem' }}>
              The trigger was infrastructure, not pixels. During high-traffic events, checkout
              fired enough API calls per session to brush up against the platform’s rate limits.
              Past that line, calls got throttled — responses slowed, the flow wobbled, exactly
              when the most carts were in play. Underneath it sat a harder truth: we didn’t own
              the surface where our revenue actually lands.
            </p>
            <div className="cs-grid two">
              <div className="cs-cell glass">
                <p className="cs-cell-label">System</p>
                <p>
                  Rate limits at peak load throttled API calls, dragging response times and
                  destabilising checkout at the worst possible moment — <strong>the sale
                  event itself</strong>.
                </p>
              </div>
              <div className="cs-cell glass">
                <p className="cs-cell-label">Experience</p>
                <p>
                  Limited control over the UI meant no real brand alignment and{' '}
                  <strong>slow, expensive iteration</strong> on the flows that mattered most.
                </p>
              </div>
              <div className="cs-cell glass">
                <p className="cs-cell-label">Observability</p>
                <p>
                  No funnel instrumentation. Drop-offs were invisible — we couldn’t see{' '}
                  <strong>where people left, or why</strong>, so we couldn’t fix it.
                </p>
              </div>
              <div className="cs-cell glass">
                <p className="cs-cell-label">Business risk</p>
                <p>
                  Owning none of the infrastructure on a <strong>revenue-critical
                  touchpoint</strong> was the real exposure. So checkout became step one of
                  the migration.
                </p>
              </div>
            </div>

            <div className="cs-quote glass">
              <blockquote>
                “Hesitation at the final step is the most expensive hesitation there is. We
                weren’t losing people on price — we were losing them to lag.”
              </blockquote>
            </div>
          </section>

          {/* 02 DIRECTION */}
          <section className="cs-section reveal" data-reveal>
            <div className="cs-sec-head">
              <span className="cs-sec-num">02</span>
              <h2 className="cs-sec-title">Where to aim</h2>
            </div>
            <p className="hub-lede" style={{ margin: '0 0 2rem' }}>
              Rebuilding from scratch is a licence to redesign everything — and a trap. I started
              by asking what a shopper actually weighs at checkout: <strong>what it costs, when
              it arrives, and what comes off the top</strong>. That narrowed a whole screen down
              to the two decisions that carry the drop-off — picking an address, and picking a
              way to pay.
            </p>
            <div className="cs-grid two">
              <div className="cs-cell glass">
                <p className="cs-cell-label">Goal 01</p>
                <p>Cut drop-off at the single most critical step in the purchase.</p>
              </div>
              <div className="cs-cell glass">
                <p className="cs-cell-label">Goal 02</p>
                <p>Lower the friction and the thinking required to choose how to pay.</p>
              </div>
              <div className="cs-cell glass">
                <p className="cs-cell-label">Goal 03</p>
                <p>Shorten the path from “this one” to “confirmed” — fewer screens, no detours.</p>
              </div>
              <div className="cs-cell glass">
                <p className="cs-cell-label">Principle</p>
                <p>
                  <strong>Make every consequence visible at the moment of choice.</strong> No
                  surprises waiting on the next screen.
                </p>
              </div>
            </div>
          </section>

          {/* 03 THE REDESIGN */}
          <section className="cs-section reveal" data-reveal>
            <div className="cs-sec-head">
              <span className="cs-sec-num">03</span>
              <h2 className="cs-sec-title">The redesign</h2>
            </div>

            <div className="cs-iters" style={{ gridTemplateColumns: '1fr' }}>
              {/* Payment */}
              <div className="cs-iter glass" style={{ display: 'grid', gap: '1.4rem' }}>
                <img
                  className="cs-real"
                  src="/work/checkout/payment-desktop.png"
                  alt="Checkout payment screen — selected default delivery address, store-credit and gift-card options, online payment methods with an active Pay ₹799 button, cash on delivery, and a live order summary on the right"
                  width={2560}
                  height={1788}
                  loading="lazy"
                />
                <div>
                  <p className="cs-iter-name">Payment — what you’re paying, and how, in one glance</p>
                  <p className="cs-iter-desc">
                    Three explorations led here. The final structure builds on the address insight
                    without adding a single step: everything resolves in one downward read, so the
                    shopper always sees the amount and the method together before they commit. Store
                    credits and gift cards surface first — adjust the payable amount, then settle the
                    rest with UPI, cards, NetBanking, EMI, wallets, BNPL or cash on delivery. An
                    always-visible order breakdown — item total, discount, the waived shipping fee —
                    means the number on the pay button is never a mystery. Confidence in, friction out.
                  </p>
                  <div className="cs-iter-changes" style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <span className="cs-pill">Credits &amp; gift cards first</span>
                    <span className="cs-pill">Live order breakdown</span>
                    <span className="cs-pill">One downward glance to confirm</span>
                    <span className="cs-pill">No added steps</span>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="cs-iter glass" style={{ display: 'grid', gap: '1.4rem' }}>
                <div className="cs-phone-pair">
                  <img
                    className="cs-real phone"
                    src="/work/checkout/address-map.png"
                    alt="Pick-your-location screen — a full-screen map with a draggable delivery pin, an address search bar, and a Confirm & Proceed action"
                    width={804}
                    height={1787}
                    loading="lazy"
                  />
                  <img
                    className="cs-real phone"
                    src="/work/checkout/address-mobile.png"
                    alt="Add-address screen — map-backed location card up top, the address-detail form, and a who-are-you-ordering-for selector above the save button"
                    width={804}
                    height={1770}
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="cs-iter-name">Address — choices with their consequences attached</p>
                  <p className="cs-iter-desc">
                    Saved addresses come back from Shiprocket after login and land as scannable
                    cards; pick one and the delivery estimate updates on the spot, so the trade-off
                    is never hidden behind a tap. No address on file? A quick “who are you ordering
                    for — myself or someone else” prompt sends you into a fresh add-address flow, and
                    the pay button stays off until there’s a valid one. Custom-fit items flag a
                    prepaid-only notice up front, so the constraint never surprises anyone at the
                    pay step. A map with search and a draggable pin auto-fills the form — less
                    typing, more precision — and two guardrails catch the edges: a gentle nudge when
                    the pin and address disagree, and a clear stop when an area can’t be served.
                  </p>
                  <div className="cs-iter-changes" style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <span className="cs-pill">Instant delivery estimate</span>
                    <span className="cs-pill">Map pin auto-fill</span>
                    <span className="cs-pill">Custom-fit prepaid notice</span>
                    <span className="cs-pill">Serviceability + mismatch safeguards</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 04 OUTCOMES */}
          <section className="cs-section reveal" data-reveal>
            <div className="cs-sec-head">
              <span className="cs-sec-num">04</span>
              <h2 className="cs-sec-title">What moved</h2>
            </div>
            <div className="cs-outcomes">
              <div className="cs-outcome glass">
                <div className="cs-outcome-num">+2.68%</div>
                <p className="cs-outcome-title">Conversion, up</p>
                <p className="cs-outcome-desc">
                  Checkout conversion climbed to 76.7% overall — a meaningful lift on a flow where
                  every fraction of a point is real revenue.
                </p>
              </div>
              <div className="cs-outcome glass">
                <div className="cs-outcome-num">25.7%</div>
                <p className="cs-outcome-title">Faster, end to end</p>
                <p className="cs-outcome-desc">
                  Average completion dropped to roughly two minutes. Owning the stack let us tune
                  the path instead of working around the platform.
                </p>
              </div>
              <div className="cs-outcome glass">
                <div className="cs-outcome-num">55.7%</div>
                <p className="cs-outcome-title">Recovered at the map</p>
                <p className="cs-outcome-desc">
                  Over half of the people who backed out of the map step came back and finished —
                  evidence the map was a moment of hesitation, not a wall.
                </p>
              </div>
            </div>
          </section>

          {/* REFLECTION */}
          <section className="cs-reflect glass reveal" data-reveal>
            <div className="cs-reflect-label">Takeaway</div>
            <p className="cs-reflect-text">
              “The migration bought us control; the design spent it well. Once we could see the
              funnel and shape the screen, the wins came from removing doubt — not adding features.”
            </p>
          </section>

          {/* NEXT */}
          <nav className="cs-next">
            <Link href="/work/econic">
              <span aria-hidden>←</span> Prev: Econic 2025
            </Link>
            <Link href="/work/amodira">
              Next: Amodira: Sound of the Scent <span aria-hidden>→</span>
            </Link>
          </nav>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
