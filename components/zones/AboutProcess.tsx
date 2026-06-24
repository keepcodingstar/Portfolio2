/**
 * About + how-I-work, in the descent band just above the ground. The process is
 * a vertical instrument RAIL (a glowing ion spine with nodes — echoes the space
 * orbit + the altimeter motif), not a row of identical cards. The toolkit is
 * grouped by discipline rather than a flat wall of pills. Reveals on scroll via
 * [data-reveal]; no eyebrow here (the kicker is reserved for space + ground).
 */

const STEPS = [
  { n: '01', t: 'Frame', d: 'Find the real problem and the metric it hides behind.' },
  { n: '02', t: 'Prototype', d: 'Make it real fast — flows, states, edge cases.' },
  { n: '03', t: 'Ship', d: 'Build with engineering; sweat the details that survive.' },
  { n: '04', t: 'Measure', d: 'Watch the number move — then do it again.' },
];

const TOOLKIT = [
  { group: 'Make', items: ['Figma', 'Prototyping', 'Motion · GSAP'] },
  { group: 'Think', items: ['Research', 'UX writing', 'Design systems'] },
  { group: 'Engineer', items: ['HTML / CSS', 'Accessibility'] },
];

export default function AboutProcess() {
  return (
    <section className="zone band band-about" aria-labelledby="about-title">
      <div className="panel wide">
        <div className="about-grid">
          <h2 id="about-title" className="display about-title" data-reveal>
            I measure design in numbers, not likes.
          </h2>
          <p className="about-body" data-reveal>
            I design checkout, pricing and trust flows for commerce products — the
            moments where a single percentage point is real money. My{' '}
            <strong>Fair Pricing Widget</strong> reached 500K+ users and became
            company IP; a checkout rebuild lifted conversion{' '}
            <strong>+2.68%</strong> while cutting time-to-convert a quarter. I
            care about the metric on the other side of the screen, and I sweat the
            details that get it there. B.Tech IT, VIT &rsquo;24 — based in
            Bangalore, via Hisar.
          </p>
        </div>

        {/* the process is ONE instrument console (a single frosted pane) holding
            the glowing-node spine — not four separate cards (a resolved tell). */}
        <div className="rail-console glass glass--thin glass--react">
          <ol className="rail" aria-label="How I work">
            {STEPS.map((s, i) => (
              <li
                className="rail-step"
                key={s.n}
                data-reveal
                style={{ transitionDelay: `${0.06 * i}s` }}
              >
                <span className="rail-marker" aria-hidden>
                  <span className="rail-node" />
                </span>
                <div className="rail-body">
                  <div className="rail-head">
                    <span className="rail-n">{s.n}</span>
                    <h3 className="rail-t serif">{s.t}</h3>
                  </div>
                  <p className="rail-d">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="toolkit" aria-label="Tools & skills" data-reveal>
          {TOOLKIT.map((g) => (
            <div className="toolkit-group" key={g.group}>
              <h4 className="toolkit-h">{g.group}</h4>
              <ul>
                {g.items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
