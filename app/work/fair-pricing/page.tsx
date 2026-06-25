'use client';

import RevealBody from '@/components/RevealBody';
import WorkTop from '@/components/work/WorkTop';
import SiteFooter from '@/components/SiteFooter';
import { useReveal } from '@/components/work/useReveal';
import Link from 'next/link';
import '../work.css';

/**
 * Fair Pricing — the flagship study. Rebuilt around real artifacts:
 * the shipped widget screenshots (V1→V3), the customer post that carried
 * it to 550K+, the Silver DIGIES award photo, the framing docs, and a
 * teardown of how every competitor solved the same problem. Page chrome
 * is the altitude glass theme; the product shots keep their own palette
 * because they are the real artifact.
 */

const IMG = '/work/fair-pricing';

const COMPETITORS = [
  { src: `${IMG}/comp-asket-desktop.png`, name: 'Asket · landed-cost bar' },
  { src: `${IMG}/comp-aforeafter.png`, name: 'Afore After · pie chart' },
  { src: `${IMG}/comp-quince.png`, name: 'Quince · spec table' },
  { src: `${IMG}/comp-everlane.jpg`, name: 'Everlane-style · photo callouts' },
  { src: `${IMG}/comp-asket-mobile.png`, name: 'Asket · traceability tabs' },
  { src: `${IMG}/comp-invoice.png`, name: 'Itemised invoice' },
  { src: `${IMG}/comp-purity.jpg`, name: 'Icon grid + figures' },
  { src: `${IMG}/comp-bullets.png`, name: 'Percent bullet list' },
];

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
              <p className="cs-eyebrow">Virgio · Product Design, 2024</p>
              <h1>
                The price tag customers <em>trusted enough to share</em>
              </h1>
              <p className="cs-hero-desc">
                Virgio sells quality fashion at honest margins, but a ₹2,100 tag felt as
                arbitrary as any other. On day one, my manager asked: how do we get customers to
                trust our prices? I designed a transparency widget that shows where every rupee
                goes, structured like a <strong>bill</strong>, not a chart. A customer’s post
                about it reached <strong>550K+ people</strong>, it won a <strong>Silver
                DIGIES</strong> for Best E-commerce Design, and became the IP behind Virgio’s
                Econic Fair.
              </p>
            </div>
            <div className="cs-meta glass">
              <div className="cs-meta-row">
                <span className="cs-meta-label">Role</span>
                <span className="cs-meta-value">Product Designer, sole designer</span>
              </div>
              <div className="cs-meta-row">
                <span className="cs-meta-label">Platform</span>
                <span className="cs-meta-value">Virgio · App &amp; Web</span>
              </div>
              <div className="cs-meta-row">
                <span className="cs-meta-label">Category</span>
                <span className="cs-meta-value">E-commerce · Fashion</span>
              </div>
              <div className="cs-meta-row">
                <span className="cs-meta-label">Recognition</span>
                <span className="cs-meta-value">Silver · DIGIES Awards</span>
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

          {/* OUTCOMES — read as one block: the human proof, the recognition it
              earned, and the lasting IP it became. Each card leads with its own
              headline metric (551.9K · Silver · Company IP), so the stat and the
              evidence for it live together rather than in a separate strip. */}
          <section className="cs-results reveal" data-reveal>
            {/* the viral moment — the metric that is the mission */}
            <div className="cs-proof glass">
              <figure className="cs-proof-shot">
                <img
                  src={`${IMG}/viral-tweet.jpg`}
                  alt="A verified shopper's post: ‘Love this. Makes me trust the brand more. They've mentioned the actual cost + selling price on all product pages.’ 551.9K views, 2.4K likes, 237 reposts."
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <div>
                <p className="cs-proof-eyebrow">The brief was “make them trust the price”</p>
                <p className="cs-proof-quote">“Love this. Makes me trust the brand more.”</p>
                <p className="cs-proof-sub">
                  A <strong>verified shopper, not Virgio,</strong> posted the widget to{' '}
                  <strong>551,900 people</strong>, with 2.4K likes and 237 reposts. The feature was
                  designed to earn trust. The proof it worked was a stranger saying so, in public,
                  unprompted. Transparency turned into the brand’s own marketing.
                </p>
                <div className="cs-proof-metric">
                  <span className="cs-proof-metric-num">551.9K</span>
                  <span className="cs-proof-metric-label">Views on a customer’s own post, unpaid and unprompted</span>
                </div>
              </div>
            </div>

            {/* the award it earned */}
            <div className="cs-accolades glass">
              <figure className="cs-accolades-shot">
                <img
                  src={`${IMG}/award-digies.jpg`}
                  alt="The Silver DIGIES award trophy: Best E-commerce Design. Entry titled ‘Transparency: The Future of E-Commerce’, awarded to Virgio."
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <div>
                <p className="cs-accolades-eyebrow">Recognition</p>
                <div className="cs-stat">
                  <span className="cs-stat-num">Silver</span>
                  <span className="cs-stat-label">DIGIES Award · Best E-commerce Design</span>
                </div>
                <p className="cs-accolades-body">
                  Entered as “Transparency: The Future of E-Commerce,” recognised specifically for
                  trust-building. The bill concept then became <strong>company IP</strong>, the
                  anchor for <strong>Econic Fair</strong>, Virgio’s cost-to-make sale, which has run
                  two editions.
                </p>
              </div>
            </div>

            {/* the IP it became — Company IP, anchoring two Econic Fair editions */}
            <div className="cs-ip glass">
              <div className="cs-stat">
                <span className="cs-stat-num">Company IP</span>
                <span className="cs-stat-label">Foundation of two Econic Fair editions</span>
              </div>
              <div className="cs-iplogos">
                <img className="cs-iplogo" src={`${IMG}/econic-25.png`} alt="Econic Fair ’25 logo" loading="lazy" decoding="async" />
                <img className="cs-iplogo" src={`${IMG}/econic-26.png`} alt="Econic Fair ’26 logo" loading="lazy" decoding="async" />
              </div>
            </div>
          </section>

          {/* 01 PROBLEM */}
          <section className="cs-section reveal" data-reveal>
            <div className="cs-sec-head">
              <h2 className="cs-sec-title">The problem</h2>
            </div>
            <p className="hub-lede" style={{ margin: '0 0 2rem' }}>
              The morning standup had just wrapped when my manager walked over: “How do we get
              customers to trust our prices? What if we show a breakdown on the product page?”
              Customers don’t distrust prices because they’re high. They distrust them because
              they feel <strong>arbitrary</strong>. Give the number visible context and the
              question shifts from “is this worth it?” to “I can see exactly why.”
            </p>
            <div className="cs-problem glass">
              <p className="cs-cell-label">Defined problem</p>
              <p className="cs-statement">
                Fashion shoppers considering a Virgio product <strong>need a way to contextualise
                the price</strong>, because without visible justification, any price feels{' '}
                <strong>arbitrary</strong>, leading to hesitation, drop-off, and distrust of the
                brand’s value proposition.
              </p>
            </div>
            <div className="cs-grid three">
              <div className="cs-cell glass">
                <p className="cs-cell-label">Who</p>
                <p>
                  Value-conscious fashion shoppers, primarily women, who weigh quality vs. cost
                  before committing.
                </p>
              </div>
              <div className="cs-cell glass">
                <p className="cs-cell-label">What</p>
                <p>
                  No visible breakdown of where the price comes from, making Virgio look like
                  every other brand <strong>hiding behind margin</strong>.
                </p>
              </div>
              <div className="cs-cell glass">
                <p className="cs-cell-label">Why it matters</p>
                <p>
                  Price anxiety is a leading cause of cart abandonment.{' '}
                  <strong>Context converts sceptics into believers</strong>, and buyers.
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

          {/* 02 HOW MIGHT WE — the design questions the problem demands */}
          <section className="cs-section reveal" data-reveal>
            <div className="cs-sec-head">
              <h2 className="cs-sec-title">How might we</h2>
            </div>
            <p className="hub-lede" style={{ margin: '0 0 2rem' }}>
              The problem turned into four design questions, each one a decision the final widget
              would have to answer.
            </p>
            <div className="cs-hmw glass">
              <div className="cs-hmw-row">
                <p className="cs-hmw-q">
                  <span className="hmw">HMW</span>make the price feel earned, not inflated?
                </p>
                <p className="cs-hmw-a">
                  Show the cost-of-making, so the final number has a logical foundation.
                </p>
              </div>
              <div className="cs-hmw-row">
                <p className="cs-hmw-q">
                  <span className="hmw">HMW</span>reduce the cognitive load of the breakdown?
                </p>
                <p className="cs-hmw-a">
                  Use a familiar mental model, the bill, so scanning feels effortless.
                </p>
              </div>
              <div className="cs-hmw-row">
                <p className="cs-hmw-q">
                  <span className="hmw">HMW</span>make the comparison to traditional brands land
                  emotionally?
                </p>
                <p className="cs-hmw-a">
                  Show “Other Brand’s Margin” as a concrete number, not a vague claim.
                </p>
              </div>
              <div className="cs-hmw-row">
                <p className="cs-hmw-q">
                  <span className="hmw">HMW</span>make it work across every product in the
                  catalogue?
                </p>
                <p className="cs-hmw-a">
                  Build one scalable widget: same structure, variable numbers, never a one-off.
                </p>
              </div>
            </div>
          </section>

          {/* 03 MARKET GAP — competitor teardown */}
          <section className="cs-section reveal" data-reveal>
            <div className="cs-sec-head">
              <h2 className="cs-sec-title">What everyone else was doing</h2>
            </div>
            <p className="hub-lede" style={{ margin: '0 0 0' }}>
              Price transparency wasn’t new, so I studied how every brand attempting it had
              solved the same problem. They reached for charts, pie graphs, comparison tables,
              and dense cost ledgers.
            </p>
            <div className="cs-comp-grid">
              {COMPETITORS.map((c) => (
                <figure className="cs-comp glass" key={c.src}>
                  <div className="cs-comp-shot">
                    <img src={c.src} alt={`Competitor price-transparency execution: ${c.name}`} loading="lazy" decoding="async" />
                  </div>
                  <figcaption className="cs-comp-name">{c.name}</figcaption>
                </figure>
              ))}
            </div>
            <p className="cs-verdict">
              Every one is accurate. Every one asks the shopper to <strong>study</strong> a chart,
              a table, or a spec sheet to understand a single number. Accurate, but demanding, and
              a shopper skimming a product page won’t do the work. <strong>The gap wasn’t honesty.
              It was readability.</strong>
            </p>
          </section>

          {/* 03 THE IDEA — read it like a bill */}
          <section className="cs-section reveal" data-reveal>
            <div className="cs-sec-head">
              <h2 className="cs-sec-title">The idea: read it like a bill</h2>
            </div>
            <div className="cs-split">
              <div className="cs-split-copy">
                <p>
                  So I stopped designing a data visualisation and borrowed the one financial
                  document everyone already knows how to read: <strong>a bill</strong>. A
                  restaurant receipt, a utility statement: items listed, subtotals grouped, the
                  total at the bottom. It adds up naturally because we’ve read thousands of them.
                </p>
                <p>
                  The first sketch worked the math out as a single stacked bar (fabric, making,
                  cost-to-serve, margin) then resolved into line items that <strong>total to
                  “your price.”</strong> No legend, no analysis. Just a number that explains
                  itself on a skim.
                </p>
              </div>
              <figure className="cs-shot glass">
                <img
                  src={`${IMG}/wireframe.jpg`}
                  alt="Early hand wireframe: a ₹2000 price broken into a stacked cost bar (fabric, making, cost-to-serve, margins) resolving to ‘your price’."
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  <b>The first sketch.</b> Working the price out as a cost bar that resolves to
                  one self-explaining total.
                </figcaption>
              </figure>
            </div>
          </section>

          {/* 04 ITERATIONS — real shipped screenshots */}
          <section className="cs-section reveal" data-reveal>
            <div className="cs-sec-head">
              <h2 className="cs-sec-title">Three iterations</h2>
            </div>
            <div className="cs-iters">
              {/* V1 */}
              <div className="cs-iter glass">
                <span className="cs-iter-tag">V1 · Day one</span>
                <div className="iter-screen">
                  <img
                    src={`${IMG}/widget-v1.png`}
                    alt="V1 widget: a modal price breakdown with granular line items and a direct ‘Other Brand’s Margin’ callout."
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="cs-iter-name">Bold and direct</p>
                <p className="cs-iter-desc">
                  Modal overlay. Granular line items. Direct margin callout. The bill structure
                  made it scannable without explanation.
                </p>
                <div className="cs-iter-changes">
                  <span className="cs-pill">Went viral: “Other Brand’s Margin” was the most shared line</span>
                  <span className="cs-pill">Became the IP foundation for Econic Fair</span>
                </div>
              </div>

              {/* V2 */}
              <div className="cs-iter glass">
                <span className="cs-iter-tag">V2 · After testing</span>
                <div className="iter-screen">
                  <img
                    src={`${IMG}/widget-v2.png`}
                    alt="V2 widget: an inline accordion with grouped cost categories (Making, Serving, Others) each explained in plain language."
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="cs-iter-name">Strategically softer</p>
                <p className="cs-iter-desc">
                  Inline accordion. Grouped categories with context. Dropped the direct margin
                  callout; user feedback and competitive reasons both pointed here.
                </p>
                <div className="cs-iter-changes">
                  <span className="cs-pill">Scalable across the catalogue</span>
                  <span className="cs-pill">Powered both Econic Fair editions</span>
                </div>
              </div>

              {/* V3 */}
              <div className="cs-iter glass">
                <span className="cs-iter-tag">V3 · Brand refresh</span>
                <div className="iter-screen">
                  <img
                    src={`${IMG}/widget-v3.png`}
                    alt="V3 widget: highlighted total rows in pill containers, sharper hierarchy, aligned to the new brand language."
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="cs-iter-name">Visual maturity</p>
                <p className="cs-iter-desc">
                  Highlighted total rows in pill containers. Better hierarchy: totals are
                  impossible to miss on a skim. Aligned to the new brand language.
                </p>
                <div className="cs-iter-changes">
                  <span className="cs-pill">Reads in two passes, skim or detail</span>
                  <span className="cs-pill">Softer label: “extra margin” not “margin”</span>
                </div>
              </div>
            </div>
          </section>

          {/* 05 VALIDATION */}
          <section className="cs-section reveal" data-reveal>
            <div className="cs-sec-head">
              <h2 className="cs-sec-title">How we validated it</h2>
            </div>
            <div className="cs-grid two">
              <div className="cs-cell glass">
                <p className="cs-cell-label">Method</p>
                <p>
                  No formal usability lab. We took the widget to the floor, to women in the office
                  who matched the primary audience. <strong>Watched unprompted reading
                  behaviour.</strong> Noted what they read first, what made them lean in.
                </p>
              </div>
              <div className="cs-cell glass">
                <p className="cs-cell-label">What we found</p>
                <p>
                  <strong>People didn’t need to be told how to read it.</strong> They just did.
                  The bill structure required zero explanation. The only friction came from
                  specific label wording, which we iterated until each line felt instinctive.
                </p>
              </div>
              <div className="cs-cell glass">
                <p className="cs-cell-label">The assumption that held</p>
                <p>
                  Readability was the missing piece in every competitor execution.{' '}
                  <strong>A familiar mental model beats a correct but demanding one</strong>, every
                  time, in this context.
                </p>
              </div>
              <div className="cs-cell glass">
                <p className="cs-cell-label">The assumption that evolved</p>
                <p>
                  V1 assumed granular line items built the most trust. Testing showed{' '}
                  <strong>grouped categories worked equally well</strong>: users trusted the
                  total, not the itemisation. That unlocked V2.
                </p>
              </div>
            </div>
          </section>

          {/* REFLECTION */}
          <section className="cs-reflect glass reveal" data-reveal>
            <div className="cs-reflect-label">Takeaway</div>
            <p className="cs-reflect-text">
              “The best solution is rarely the most novel one. It’s the one that borrows most
              naturally from how people already think. A bill isn’t a breakthrough. Applying it
              where everyone else reached for a chart is.”
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

        <SiteFooter />
      </div>
    </>
  );
}
