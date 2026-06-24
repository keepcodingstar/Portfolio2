'use client';

import RevealBody from '@/components/RevealBody';
import WorkTop from '@/components/work/WorkTop';
import { useReveal } from '@/components/work/useReveal';
import Link from 'next/link';
import '../work.css';

/**
 * Fair Pricing — the flagship study, ported into the altitude glass theme.
 * Page chrome is frosted glass + ion accents + Awesome Serif. The three widget
 * mockups keep their own shipped palette (green / red / cream) because they are
 * the real artifact — recolouring them would stop them looking like the product.
 */

export default function FairPricing() {
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
              <p className="cs-eyebrow">Virgio · Product Design · 2023</p>
              <h1>
                The feature I built on <em>day one</em> that went viral
              </h1>
              <p className="cs-hero-desc">
                A price-transparency widget that became company IP, powered two Econic Fair
                sales, and won best e-commerce feature — all from a single standup
                conversation.
              </p>
            </div>
            <div className="cs-meta glass">
              <div className="cs-meta-row">
                <span className="cs-meta-label">Role</span>
                <span className="cs-meta-value">Product Designer</span>
              </div>
              <div className="cs-meta-row">
                <span className="cs-meta-label">Platform</span>
                <span className="cs-meta-value">Virgio App</span>
              </div>
              <div className="cs-meta-row">
                <span className="cs-meta-label">Category</span>
                <span className="cs-meta-value">E-commerce · Fashion</span>
              </div>
              <div className="cs-meta-row">
                <span className="cs-meta-label">Status</span>
                <span className="cs-meta-value">
                  <span className="live" aria-hidden />
                  Live · Company IP
                </span>
              </div>
            </div>
          </section>

          {/* IMPACT */}
          <section className="cs-impact reveal" data-reveal>
            <div className="cs-impact-cell glass">
              <div className="cs-impact-num">Viral</div>
              <div className="cs-impact-label">Trending on Twitter after launch</div>
            </div>
            <div className="cs-impact-cell glass">
              <div className="cs-impact-num">2×</div>
              <div className="cs-impact-label">Econic Fair sales powered by this concept</div>
            </div>
            <div className="cs-impact-cell glass">
              <div className="cs-impact-num">IP</div>
              <div className="cs-impact-label">Registered company intellectual property</div>
            </div>
          </section>

          {/* 01 PROBLEM */}
          <section className="cs-section reveal" data-reveal>
            <div className="cs-sec-head">
              <span className="cs-sec-num">01</span>
              <h2 className="cs-sec-title">The problem</h2>
            </div>
            <div className="cs-grid two">
              <div className="cs-cell glass">
                <p className="cs-cell-label">The ask</p>
                <p>
                  My manager walked up after standup on day one. <strong>How do we get
                  customers to trust our prices?</strong> Virgio sells quality fashion at honest
                  margins — but without context, ₹2,100 felt like every other arbitrary tag.
                </p>
              </div>
              <div className="cs-cell glass">
                <p className="cs-cell-label">The real insight</p>
                <p>
                  Customers don’t distrust prices because they’re high. They distrust them
                  because they feel <strong>arbitrary</strong>. Give the number context — show
                  what it’s made of — and the question shifts from “is this worth it?” to “I can
                  see exactly why.”
                </p>
              </div>
              <div className="cs-cell glass">
                <p className="cs-cell-label">Market gap</p>
                <p>
                  Every competitor who tried this used <strong>charts, graphs, or raw
                  numbers</strong>. Accurate, but demanding. A shopper scanning a product page
                  doesn’t want to analyse. They want to understand at a glance.
                </p>
              </div>
              <div className="cs-cell glass">
                <p className="cs-cell-label">The mental model</p>
                <p>
                  Everyone already knows how to read a bill. A restaurant receipt, a utility
                  statement — items listed, subtotals grouped, total at the bottom. It{' '}
                  <strong>adds up naturally</strong> because we’ve read thousands of them.
                </p>
              </div>
            </div>

            <div className="cs-quote glass">
              <blockquote>
                “If we showed customers exactly where every rupee went, we wouldn’t need to
                convince them. The transparency itself would be the argument.”
              </blockquote>
            </div>
          </section>

          {/* 02 ITERATIONS */}
          <section className="cs-section reveal" data-reveal>
            <div className="cs-sec-head">
              <span className="cs-sec-num">02</span>
              <h2 className="cs-sec-title">Three iterations</h2>
            </div>
            <div className="cs-iters">
              {/* V1 */}
              <div className="cs-iter glass">
                <span className="cs-iter-tag v1">
                  <span className="d" /> V1 · Day one
                </span>
                <div className="iter-screen">
                  <div className="widget">
                    <div className="w-headline">Price Breakdown</div>
                    <div className="w-sub">Know the true value behind your garment</div>
                    <div className="w-cols">
                      <span style={{ minWidth: 52 }}>Landed<br />₹1500</span>
                      <span style={{ minWidth: 52, color: '#1d9e75', fontWeight: 500 }}>
                        Virgio<br />₹2100
                      </span>
                      <span style={{ minWidth: 52 }}>Traditional<br />₹5500</span>
                    </div>
                    <div className="w-bar" style={{ marginTop: 6 }}>
                      <div className="w-bar-s1" style={{ width: '48%' }} />
                      <div className="w-bar-s2" style={{ width: '8%' }} />
                      <div className="w-bar-s3" style={{ width: '8%' }} />
                      <div className="w-bar-s4" style={{ width: '8%' }} />
                      <div className="w-bar-s5" style={{ width: '28%' }} />
                    </div>
                    <div className="w-row">
                      <div className="w-row-label">
                        <div className="w-dot" style={{ background: '#1d9e75' }} />
                        Fabric and Trims
                      </div>
                      <span>₹1,500</span>
                    </div>
                    <div className="w-row">
                      <div className="w-row-label">
                        <div className="w-dot" style={{ background: '#5dcaa5' }} />
                        Manufacturing
                      </div>
                      <span>₹100</span>
                    </div>
                    <div className="w-row">
                      <div className="w-row-label">
                        <div className="w-dot" style={{ background: '#9fe1cb' }} />
                        Transportation
                      </div>
                      <span>₹300</span>
                    </div>
                    <div className="w-divider" />
                    <div className="w-total green">
                      <span>Landed Cost</span>
                      <span>₹1,500</span>
                    </div>
                    <div className="w-row">
                      <div className="w-row-label">
                        <div className="w-dot" style={{ background: '#85b7eb' }} />
                        Our Margin
                      </div>
                      <span>₹200</span>
                    </div>
                    <div className="w-divider" />
                    <div className="w-total green">
                      <span>Virgio Price</span>
                      <span>₹2,100</span>
                    </div>
                    <div className="w-row">
                      <div className="w-row-label">
                        <div className="w-dot" style={{ background: '#2c2c2a' }} />
                        Other Brand’s Margin
                      </div>
                      <span>₹3,400</span>
                    </div>
                    <div className="w-divider" />
                    <div className="w-total red">
                      <span>Traditional Price</span>
                      <span>₹5,500</span>
                    </div>
                    <div className="w-footer">
                      Unlike others who hide behind markups, we’re upfront so you can truly
                      value what you wear.
                    </div>
                  </div>
                </div>
                <p className="cs-iter-name">Bold and direct</p>
                <p className="cs-iter-desc">
                  Modal overlay. Granular line items. Direct margin callout. The bill structure
                  made it scannable without explanation.
                </p>
                <div className="cs-iter-changes">
                  <span className="cs-pill">Went viral — “Other Brand’s Margin” was the most shared line</span>
                  <span className="cs-pill">Became the IP foundation for Econic Fair</span>
                </div>
              </div>

              {/* V2 */}
              <div className="cs-iter glass">
                <span className="cs-iter-tag v2">
                  <span className="d" /> V2 · After testing
                </span>
                <div className="iter-screen">
                  <div className="widget">
                    <div className="w2-section">
                      Price Transparency{' '}
                      <span style={{ fontSize: 18, color: 'var(--w-ink3)', fontWeight: 300 }}>—</span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 24,
                        fontSize: 10,
                        color: 'var(--w-ink3)',
                        marginBottom: 6,
                        letterSpacing: '0.02em',
                      }}
                    >
                      <span style={{ textAlign: 'right' }}>
                        VIRGIO<br />
                        <span style={{ color: '#1d9e75', fontWeight: 500 }}>₹3000</span>
                      </span>
                      <span style={{ textAlign: 'right' }}>
                        Traditional<br />₹5500
                      </span>
                    </div>
                    <div className="w-bar">
                      <div className="w-bar-s1" style={{ width: '42%' }} />
                      <div className="w-bar-s2" style={{ width: '20%' }} />
                      <div className="w-bar-s3" style={{ width: '8%' }} />
                      <div style={{ flex: 1, background: '#d4d4d0' }} />
                    </div>
                    <div style={{ height: 12 }} />
                    <div className="w2-row">
                      <div className="w2-label">
                        <div className="w-dot" style={{ background: '#1d9e75', marginTop: 4 }} />
                        <div className="w2-label-text">
                          <span className="w2-label-main">Making Cost</span>
                          <span className="w2-label-sub">(Fabric, Trims, Manufacturing etc)</span>
                        </div>
                      </div>
                      <span className="w2-amount">₹900</span>
                    </div>
                    <div className="w2-row">
                      <div className="w2-label">
                        <div className="w-dot" style={{ background: '#5dcaa5', marginTop: 4 }} />
                        <div className="w2-label-text">
                          <span className="w2-label-main">Serving Cost</span>
                          <span className="w2-label-sub">(Website, Logistics, Taxes etc)</span>
                        </div>
                      </div>
                      <span className="w2-amount">₹1,700</span>
                    </div>
                    <div className="w2-row">
                      <div className="w2-label">
                        <div className="w-dot" style={{ background: '#9fe1cb', marginTop: 4 }} />
                        <div className="w2-label-text">
                          <span className="w2-label-main">Others</span>
                          <span className="w2-label-sub">(Profits, Marketing, Rent etc)</span>
                        </div>
                      </div>
                      <span className="w2-amount">₹400</span>
                    </div>
                    <div className="w-divider" style={{ margin: '8px 0' }} />
                    <div className="w-total green">
                      <span>Virgio Price</span>
                      <span>₹3,000</span>
                    </div>
                    <div className="w2-row">
                      <div className="w2-label">
                        <div className="w-dot" style={{ background: '#c8c8c0', marginTop: 2 }} />
                        <span className="w2-label-main" style={{ fontSize: 12, color: 'var(--w-ink2)' }}>
                          Other Brand’s Margin
                        </span>
                      </div>
                      <span className="w2-amount">₹2,500</span>
                    </div>
                    <div className="w-divider" style={{ margin: '8px 0' }} />
                    <div className="w-total red">
                      <span>Traditional Price</span>
                      <span>₹5,500</span>
                    </div>
                    <div className="w-footer">
                      We share a full price breakdown for every product, so you know exactly
                      where your money goes.
                    </div>
                  </div>
                </div>
                <p className="cs-iter-name">Strategically softer</p>
                <p className="cs-iter-desc">
                  Inline accordion. Grouped categories with context. Dropped direct margin
                  callout — user feedback + competitive reasons both pointed here.
                </p>
                <div className="cs-iter-changes">
                  <span className="cs-pill">Scalable across the catalogue</span>
                  <span className="cs-pill">Powered both Econic Fair editions</span>
                </div>
              </div>

              {/* V3 */}
              <div className="cs-iter glass">
                <span className="cs-iter-tag v3">
                  <span className="d" /> V3 · Brand refresh
                </span>
                <div className="iter-screen">
                  <div className="widget">
                    <div className="w2-section">
                      Fair pricing{' '}
                      <span style={{ fontSize: 18, color: 'var(--w-ink3)', fontWeight: 300 }}>—</span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 24,
                        fontSize: 10,
                        color: 'var(--w-ink3)',
                        marginBottom: 6,
                        letterSpacing: '0.02em',
                      }}
                    >
                      <span style={{ textAlign: 'right', color: 'var(--w-ink)', fontWeight: 500 }}>
                        ₹1,590<br />
                        <span style={{ fontWeight: 300, color: 'var(--w-ink3)' }}>VIRGIO price</span>
                      </span>
                      <span style={{ textAlign: 'right', color: 'var(--w-red)', fontWeight: 500 }}>
                        ₹2,385<br />
                        <span style={{ fontWeight: 300, color: 'var(--w-ink3)' }}>Traditional</span>
                      </span>
                    </div>
                    <div className="w-bar">
                      <div className="w-bar-s1" style={{ width: '40%' }} />
                      <div className="w-bar-s2" style={{ width: '16%' }} />
                      <div style={{ width: '16%', background: '#c8c8c4' }} />
                      <div style={{ flex: 1, background: '#e2e2de' }} />
                    </div>
                    <div style={{ height: 12 }} />
                    <div className="w3-row">
                      <div className="w2-label">
                        <div className="w-dot" style={{ background: '#1d9e75', marginTop: 4 }} />
                        <div className="w2-label-text">
                          <span className="w2-label-main">Cost to make</span>
                          <span className="w2-label-sub">Fabric, trims, stitching, taxes</span>
                        </div>
                      </div>
                      <span className="w2-amount">₹714</span>
                    </div>
                    <div className="w3-row">
                      <div className="w2-label">
                        <div className="w-dot" style={{ background: '#5dcaa5', marginTop: 4 }} />
                        <div className="w2-label-text">
                          <span className="w2-label-main">Serving cost</span>
                          <span className="w2-label-sub">Packing, logistics, gateway charges</span>
                        </div>
                      </div>
                      <span className="w2-amount">₹246</span>
                    </div>
                    <div className="w3-row">
                      <div className="w2-label">
                        <div className="w-dot" style={{ background: '#c8c8c4', marginTop: 4 }} />
                        <div className="w2-label-text">
                          <span className="w2-label-main">Others</span>
                          <span className="w2-label-sub">Profits, marketing, rent</span>
                        </div>
                      </div>
                      <span className="w2-amount">₹630</span>
                    </div>
                    <div className="w3-total virgio">
                      <span>VIRGIO price</span>
                      <span>₹1,590</span>
                    </div>
                    <div className="w3-row">
                      <div className="w2-label">
                        <div className="w-dot" style={{ background: '#c8c8c4', marginTop: 2 }} />
                        <span className="w2-label-main" style={{ fontSize: 12, color: 'var(--w-ink2)' }}>
                          Other brands (extra) margin
                        </span>
                      </div>
                      <span className="w2-amount">₹795</span>
                    </div>
                    <div className="w3-total trad">
                      <span>Traditional price</span>
                      <span>₹2,385</span>
                    </div>
                    <div className="w-footer">
                      Unlike others who hide behind markups, we’re upfront so you can truly
                      value what you wear.
                    </div>
                  </div>
                </div>
                <p className="cs-iter-name">Visual maturity</p>
                <p className="cs-iter-desc">
                  Highlighted total rows with pill containers. Better hierarchy — totals are
                  impossible to miss on a skim. Aligned to new brand language.
                </p>
                <div className="cs-iter-changes">
                  <span className="cs-pill">Reads in two passes — skim or detail</span>
                  <span className="cs-pill">Softer label: “extra margin” not “margin”</span>
                </div>
              </div>
            </div>
          </section>

          {/* 03 VALIDATION */}
          <section className="cs-section reveal" data-reveal>
            <div className="cs-sec-head">
              <span className="cs-sec-num">03</span>
              <h2 className="cs-sec-title">How we validated it</h2>
            </div>
            <div className="cs-grid two">
              <div className="cs-cell glass">
                <p className="cs-cell-label">Method</p>
                <p>
                  No formal usability lab. We took the widget to the floor — women in the office
                  who matched the primary audience. <strong>Watched unprompted reading
                  behaviour.</strong> Noted what they read first, what made them lean in.
                </p>
              </div>
              <div className="cs-cell glass">
                <p className="cs-cell-label">What we found</p>
                <p>
                  <strong>People didn’t need to be told how to read it.</strong> They just did.
                  The bill structure required zero explanation. The only friction came from
                  specific label wording — which we iterated until each line felt instinctive.
                </p>
              </div>
              <div className="cs-cell glass">
                <p className="cs-cell-label">The assumption that held</p>
                <p>
                  Readability was the missing piece in every competitor execution.{' '}
                  <strong>A familiar mental model beats a correct but demanding one</strong> —
                  every time, at this context.
                </p>
              </div>
              <div className="cs-cell glass">
                <p className="cs-cell-label">The assumption that evolved</p>
                <p>
                  V1 assumed granular line items built the most trust. Testing showed{' '}
                  <strong>grouped categories worked equally well</strong> — users trusted the
                  total, not the itemisation. That unlocked V2.
                </p>
              </div>
            </div>
          </section>

          {/* 04 OUTCOMES */}
          <section className="cs-section reveal" data-reveal>
            <div className="cs-sec-head">
              <span className="cs-sec-num">04</span>
              <h2 className="cs-sec-title">What it became</h2>
            </div>
            <div className="cs-outcomes">
              <div className="cs-outcome glass">
                <div className="cs-outcome-num">01</div>
                <p className="cs-outcome-title">Trended on Twitter</p>
                <p className="cs-outcome-desc">
                  The design’s clarity made it screenshot-worthy. “Other Brand’s Margin” as a
                  hard number was the most-shared element — transparency as content.
                </p>
              </div>
              <div className="cs-outcome glass">
                <div className="cs-outcome-num">02</div>
                <p className="cs-outcome-title">Best e-commerce feature</p>
                <p className="cs-outcome-desc">
                  Industry recognition for solving a real problem in a genuinely new way. The
                  bill structure hadn’t been applied to this context before.
                </p>
              </div>
              <div className="cs-outcome glass">
                <div className="cs-outcome-num">03</div>
                <p className="cs-outcome-title">Econic Fair</p>
                <p className="cs-outcome-desc">
                  The widget became the anchor for a new sale format — products sold at
                  cost-to-make. Two editions ran in one year. The design enabled a business
                  model.
                </p>
              </div>
            </div>
          </section>

          {/* REFLECTION */}
          <section className="cs-reflect glass reveal" data-reveal>
            <div className="cs-reflect-label">Takeaway</div>
            <p className="cs-reflect-text">
              “The best solution is rarely the most novel one. It’s the one that borrows most
              naturally from how people already think. A bill isn’t a breakthrough — applying it
              where people expected charts is.”
            </p>
          </section>

          {/* NEXT */}
          <nav className="cs-next">
            <Link href="/work">
              <span aria-hidden>←</span> All work
            </Link>
            <Link href="/work/checkout">
              Next: Checkout, off Shopify <span aria-hidden>→</span>
            </Link>
          </nav>
        </main>

        <div className="work-colophon">
          <span>Fair Pricing · Virgio · 2023</span>
          <span>Product Design Case Study</span>
        </div>
      </div>
    </>
  );
}
