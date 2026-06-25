'use client';

import RevealBody from '@/components/RevealBody';
import WorkTop from '@/components/work/WorkTop';
import SiteFooter from '@/components/SiteFooter';
import { useReveal } from '@/components/work/useReveal';
import Link from 'next/link';
import '../work.css';

/**
 * Amodira — a 0→1 brand study. The invention is "Sound of the Scent":
 * an original song composed for each fragrance whose musical layers
 * (treble / mids / bass) mirror the scent's note structure (top / heart /
 * base), so a shopper can feel a perfume they can't smell online. Page
 * chrome is the altitude glass theme; the real artifacts are the shipped
 * module screenshots, shown as a V1→V2 before/after.
 */

const IMG = '/work/amodira';

export default function Amodira() {
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
          {/* HERO — BLUF: the problem, the invention, the outcome, up front */}
          <section className="cs-hero reveal" data-reveal>
            <div>
              <p className="cs-eyebrow">Amodira × Virgio · Brand 0→1, 2025</p>
              <h1>
                The problem every perfume brand has online — <em>solved</em>
              </h1>
              <p className="cs-hero-desc">
                Amodira is Virgio’s perfume line, built from zero. Every fragrance brand online hits
                the same wall: you have to <strong>smell</strong> a perfume to want it, and a screen
                can’t carry a smell. So I built <strong>Sound of the Scent</strong> — an original
                song per fragrance whose layers mirror its top, heart and base notes, so you{' '}
                <strong>feel</strong> the scent before it arrives. It became the{' '}
                <strong>most-interacted element on the PDP</strong>.
              </p>
            </div>
            <div className="cs-meta glass">
              <div className="cs-meta-row">
                <span className="cs-meta-label">Role</span>
                <span className="cs-meta-value">Sole designer &amp; inventor</span>
              </div>
              <div className="cs-meta-row">
                <span className="cs-meta-label">Scope</span>
                <span className="cs-meta-value">Brand 0→1 — PLP, PDP, packaging</span>
              </div>
              <div className="cs-meta-row">
                <span className="cs-meta-label">This study</span>
                <span className="cs-meta-value">Sound of the Scent — the invention</span>
              </div>
              <div className="cs-meta-row">
                <span className="cs-meta-label">Category</span>
                <span className="cs-meta-value">Fragrance · D2C</span>
              </div>
              <div className="cs-meta-row">
                <span className="cs-meta-label">Status</span>
                <span className="cs-meta-value">
                  <span className="live" aria-hidden />
                  Live · Launched 2025
                </span>
              </div>
            </div>
          </section>

          {/* OUTCOMES — feature-level proof first (the invention earned the
              attention), then the brand-level context. No invented baseline. */}
          <section className="cs-results reveal" data-reveal>
            <div className="cs-ip glass">
              <div className="cs-stat">
                <span className="cs-stat-num">Most-tapped</span>
                <span className="cs-stat-label">
                  Sound of the Scent is the single most-interacted element on the Amodira PDP — the
                  feature shoppers reach for first
                </span>
              </div>
              <p className="cs-accolades-body" style={{ maxWidth: '34ch' }}>
                Not the gallery, not the price — the <strong>invention</strong>. Of everything on
                the page, this is what shoppers choose to touch.
              </p>
            </div>
            <div className="cs-ip glass">
              <div className="cs-stat">
                <span className="cs-stat-num">7×</span>
                <span className="cs-stat-label">
                  Amodira revenue during Virgio’s Econic sale (Nov 2025)
                </span>
              </div>
              <p className="cs-accolades-body" style={{ maxWidth: '34ch' }}>
                Sound of the Scent shipped as the brand’s <strong>launch identity</strong> and its
                signature differentiator going into the sale.
              </p>
            </div>
          </section>

          {/* 01 PROBLEM */}
          <section className="cs-section reveal" data-reveal>
            <div className="cs-sec-head">
              <h2 className="cs-sec-title">You can’t smell a webpage</h2>
            </div>
            <p className="hub-lede" style={{ margin: '0 0 2rem' }}>
              The question landed on day one: <strong>how do you communicate a smell through a
              screen?</strong> Fragrance is bought through the nose — and online, that sense is
              simply gone.
            </p>
            <div className="cs-problem glass">
              <p className="cs-cell-label">Defined problem</p>
              <p className="cs-statement">
                A shopper <strong>needs to feel what a perfume smells like</strong> before buying.
                Online the deciding sense is missing — so a fragrance is just a bottle and a price,
                indistinguishable from any other.
              </p>
            </div>

            <div className="cs-quote glass">
              <blockquote>
                “If I couldn’t put the smell on the screen, I had to give it another sense to live
                in.”
              </blockquote>
            </div>
          </section>

          {/* 02 HOW MIGHT WE */}
          <section className="cs-section reveal" data-reveal>
            <div className="cs-sec-head">
              <h2 className="cs-sec-title">How might we</h2>
            </div>
            <p className="hub-lede" style={{ margin: '0 0 2rem' }}>
              The problem turned into three questions the invention had to answer.
            </p>
            <div className="cs-hmw glass">
              <div className="cs-hmw-row">
                <p className="cs-hmw-q">
                  <span className="hmw">HMW</span>make a scent-only product feel present online?
                </p>
                <p className="cs-hmw-a">
                  Give it a second sense a screen can carry: sound.
                </p>
              </div>
              <div className="cs-hmw-row">
                <p className="cs-hmw-q">
                  <span className="hmw">HMW</span>convey a fragrance too complex to name by its
                  ingredients?
                </p>
                <p className="cs-hmw-a">
                  Translate its <strong>structure</strong>, not its contents — you can’t smell
                  “oranges,” but you can feel the shape.
                </p>
              </div>
              <div className="cs-hmw-row">
                <p className="cs-hmw-q">
                  <span className="hmw">HMW</span>keep it true to each scent, not the brand?
                </p>
                <p className="cs-hmw-a">
                  An original track per fragrance — never one generic jingle.
                </p>
              </div>
            </div>
          </section>

          {/* 03 MARKET GAP — competitive analysis (text-driven; no competitor shots) */}
          <section className="cs-section reveal" data-reveal>
            <div className="cs-sec-head">
              <h2 className="cs-sec-title">What everyone else was doing</h2>
            </div>
            <p className="hub-lede" style={{ margin: '0 0 0' }}>
              Fragrance brands online reach for three tools — each either sets a mood or lists
              facts, none transmits the feeling of the scent.
            </p>
            <div className="cs-grid three" style={{ marginTop: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}>
              <div className="cs-cell glass">
                <p className="cs-cell-label">Lifestyle film</p>
                <p>
                  Shows how the <strong>brand wants you to feel</strong> — an agenda, not the scent.
                </p>
              </div>
              <div className="cs-cell glass">
                <p className="cs-cell-label">Product photography</p>
                <p>
                  Sells the object. A bottle tells you <strong>nothing about the smell</strong>.
                </p>
              </div>
              <div className="cs-cell glass">
                <p className="cs-cell-label">Note pyramids</p>
                <p>
                  Accurate but useless to the nose — you’ll <strong>never actually smell
                  “oranges”</strong> in a finished fragrance.
                </p>
              </div>
            </div>
            <p className="cs-verdict">
              The gap wasn’t information. <strong>It was sensation.</strong>
            </p>
          </section>

          {/* 04 THE IDEA — Sound of the Scent */}
          <section className="cs-section reveal" data-reveal>
            <div className="cs-sec-head">
              <h2 className="cs-sec-title">The idea: hear the scent</h2>
            </div>
            <div className="cs-split-copy" style={{ maxWidth: '64ch' }}>
              <p>
                The spark: a brand that built a <strong>Spotify playlist</strong> around its
                collection. Not describing the perfume — but it pointed at something. Sound carries
                feeling <strong>instantly, with no translation</strong>.
              </p>
              <p>
                Then the leap. A fragrance is built in <strong>layers</strong> — top, heart, base.
                So is a song — <strong>treble, mids, bass</strong>. So I stopped trying to{' '}
                <em>describe</em> the scent and started to <em>compose</em> it: one original track
                per fragrance, mapped to its note structure.
              </p>
            </div>
            <div className="cs-quote glass">
              <blockquote>
                “Just as sound has treble, mids and bass, a fragrance reveals its top, heart and
                base notes.”
              </blockquote>
            </div>
          </section>

          {/* 05 WORKED EXAMPLE + ITERATION — How Raya sounds, and how testing simplified it */}
          <section className="cs-section reveal" data-reveal>
            <div className="cs-sec-head">
              <h2 className="cs-sec-title">How a scent sounds</h2>
            </div>
            <p className="hub-lede" style={{ margin: '0 0 clamp(1.8rem, 4vw, 2.6rem)' }}>
              Take <strong>Raya</strong>. Every musical choice maps to the fragrance — graceful
              pacing for her calm, subtle Indian classical undertones for her roots, warm blooming
              melodies for the jasmine-and-vanilla heart.
            </p>
            <div className="cs-split">
              <figure className="cs-shot glass">
                <img
                  src={`${IMG}/raya-v1-complex.png`}
                  alt="V1 of the Raya module: the sound player beside a frequency graph mapping treble / mid / bass notes to top / heart / base notes along an immersive-to-subtle curve, with the three note descriptions."
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  <b>V1 · the full map.</b> Treble→top, mids→heart, bass→base, plotted from immersive
                  to subtle. Rigorous — but it asked you to read a chart.
                </figcaption>
              </figure>
              <figure className="cs-shot glass">
                <img
                  src={`${IMG}/raya-sound.png`}
                  alt="V2 shipped: the Raya module with the sound player and three plain-language notes, the frequency graph removed."
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  <b>V2 · shipped.</b> The chart gone, the feeling kept — three plain-language lines
                  anyone reads on a skim.
                </figcaption>
              </figure>
            </div>
            <p className="cs-verdict">
              In testing, people didn’t study the graph — they wanted to <strong>feel</strong> the
              scent, not analyse it. So I cut the chart and kept the language.{' '}
              <strong>The simpler version tested better, and became what shipped.</strong>
            </p>
          </section>

          {/* 06 WHAT SHIPPED / VALIDATION */}
          <section className="cs-section reveal" data-reveal>
            <div className="cs-sec-head">
              <h2 className="cs-sec-title">What shipped, and how it landed</h2>
            </div>
            <div className="cs-grid two">
              <div className="cs-cell glass">
                <p className="cs-cell-label">What shipped</p>
                <p>
                  An original composed track per fragrance, note-mapping spelled out, on{' '}
                  <strong>every Amodira product page</strong>.
                </p>
              </div>
              <div className="cs-cell glass">
                <p className="cs-cell-label">The signal</p>
                <p>
                  It became the <strong>most-interacted element on the PDP</strong> — ahead of the
                  gallery and the price.
                </p>
              </div>
              <div className="cs-cell glass">
                <p className="cs-cell-label">The honest caveat</p>
                <p>
                  The brand did <strong>7× revenue</strong> at Econic, but a 0→1 launch has no
                  isolated before/after — engagement is the cleaner, feature-level proof.
                </p>
              </div>
              <div className="cs-cell glass">
                <p className="cs-cell-label">The bet that held</p>
                <p>
                  <strong>Sound communicates feeling faster than any description</strong> — the
                  sense a screen had been missing.
                </p>
              </div>
            </div>
          </section>

          {/* REFLECTION */}
          <section className="cs-reflect glass reveal" data-reveal>
            <div className="cs-reflect-label">Takeaway</div>
            <p className="cs-reflect-text">
              “You can’t put a smell on a screen — but you can give it another sense to borrow. The
              job was never to describe the perfume. It was to make someone feel it before it ever
              arrived.”
            </p>
          </section>

          {/* NEXT */}
          <nav className="cs-next">
            <Link href="/work">
              <span aria-hidden>←</span> All work
            </Link>
            <Link href="/work/fair-pricing">
              Next: Fair Pricing <span aria-hidden>→</span>
            </Link>
          </nav>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
