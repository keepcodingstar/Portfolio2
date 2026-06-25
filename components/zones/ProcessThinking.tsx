/**
 * Process / philosophy section in the sky world, directly after the case studies.
 * A centred serif manifesto headline over a 2×2 grid of frosted principle cards.
 * Reveal-on-scroll via the shared [data-reveal] observer.
 */

const PRINCIPLES = [
  {
    t: 'Start with questions, not solutions',
    d: 'I slow down early to move faster later.',
  },
  {
    t: 'Design is decision-making',
    d: 'Every pixel exists to reduce uncertainty or effort.',
  },
  {
    t: 'Systems over screens',
    d: 'I think in flows, states, and long-term behavior.',
  },
  {
    t: 'Collaborative by default',
    d: 'Best ideas emerge when design, product, and engineering think together.',
  },
];

export default function ProcessThinking() {
  return (
    <section id="zone-think" className="zone band band-think" aria-labelledby="think-title">
      <div className="panel wide">
        <header className="think-head" data-reveal>
          <h2 id="think-title" className="display think-title">
            My <em>process</em> isn&rsquo;t a checklist.
            <br />
            It&rsquo;s a way of <em>thinking</em>
          </h2>
        </header>

        <div className="think-grid">
          {PRINCIPLES.map((p, i) => (
            <article
              className="think-card"
              key={p.t}
              data-reveal
              style={{ transitionDelay: `${0.06 * i}s` }}
            >
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
