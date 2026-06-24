/**
 * About + how-I-work, in the descent band just above the ground. Who Sameer is,
 * the working method, and the toolkit — the context for everything above.
 */

const STEPS = [
  { n: '01', t: 'Frame', d: 'Find the real problem and the metric it hides behind.' },
  { n: '02', t: 'Prototype', d: 'Make it real fast — flows, states, edge cases.' },
  { n: '03', t: 'Ship', d: 'Build with engineering; sweat the details that survive.' },
  { n: '04', t: 'Measure', d: 'Watch the number move — then do it again.' },
];

const TOOLS = ['Figma', 'Prototyping', 'Design systems', 'UX writing', 'Accessibility', 'HTML / CSS', 'Motion · GSAP', 'Research'];

export default function AboutProcess() {
  return (
    <section className="zone band band-about" aria-labelledby="about-title">
      <div className="panel wide">
        <div className="about-grid">
          <div>
            <p className="eyebrow">About · the person behind it</p>
            <h2 id="about-title" className="display about-title">
              I measure design in numbers, not likes.
            </h2>
          </div>
          <p className="about-body">
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

        <ol className="process">
          {STEPS.map((s) => (
            <li className="step" key={s.n}>
              <span className="step-n">{s.n}</span>
              <h3 className="step-t serif">{s.t}</h3>
              <p className="step-d">{s.d}</p>
            </li>
          ))}
        </ol>

        <ul className="tools" aria-label="Tools & skills">
          {TOOLS.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
