import Link from 'next/link';
import { CheckoutHeader as CaseStudyHeader, EconicMention, Screenshot } from '../checkout/CheckoutInteractions';
import { econicTitle } from '../econic/econic-content';
import styles from '../checkout/checkout.module.css';
import local from './fair-pricing.module.css';

const ASSETS = '/work/fair-pricing';
const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'design', label: 'Design' },
  { id: 'reflection', label: 'Reflection' },
];

const annotations = [
  { number: 1, x: 94, y: 39, title: 'Explain each cost group', body: 'Short descriptions name what “Cost to make,” “Serving cost” and “Others” include.' },
  { number: 2, x: 94, y: 62, title: 'Give the total its own space', body: 'A highlighted row separates VIRGIO’s price from the costs above and comparison below.' },
  { number: 3, x: 94, y: 9, title: 'Keep the detail close', body: 'An accordion lets shoppers explore the breakdown within the product page.' },
];

const references = [
  { file: 'comp-asket-desktop.png', name: 'ASKET · Desktop', title: 'A comparison on one scale', width: 1400, height: 414, alt: 'ASKET’s full transparency section with landed cost, brand price, traditional retail and a cost breakdown.' },
  { file: 'comp-invoice.png', name: 'Itemised invoice', title: 'Line items that lead to a total', width: 1400, height: 724, alt: 'An itemised invoice beside the Alina skirt, listing materials, labour, fees, margin and tax.' },
  { file: 'comp-everlane.jpg', name: 'Photo callouts', title: 'Costs connected to the garment', width: 1400, height: 1010, alt: 'A garment photograph annotated with fabric, trims, labour, freight, packaging and landed costs.' },
  { file: 'comp-quince.png', name: 'Quince', title: 'Price and features side by side', width: 1400, height: 537, alt: 'Quince compares price, cashmere quality, shipping and returns across brands beside product details.' },
  { file: 'comp-purity.jpg', name: 'Purity cost breakdown', title: 'A visual category for each cost', width: 1400, height: 1305, alt: 'Illustrated icons and figures for fabric, trims, labour, packaging and operations.' },
  { file: 'comp-aforeafter.png', name: 'Afore After', title: 'Each category’s share', width: 1400, height: 1003, alt: 'Afore After’s percentage chart for operations, labour, materials, shipping, packaging, fees and VAT.' },
  { file: 'comp-asket-mobile.png', name: 'ASKET · Mobile', title: 'Cost within a wider transparency story', width: 1138, height: 1400, alt: 'ASKET’s mobile transparency section with landed cost, traceability, environmental impact and links to details.' },
  { file: 'comp-bullets.png', name: 'Percentage list', title: 'A breakdown in plain text', width: 1400, height: 551, alt: 'A text list of cost percentages for VAT, labour, materials, shipping, merchant fees and packaging.' },
];

function CompetitiveReference({ reference, index }: { reference: typeof references[number]; index: number }) {
  return (
    <figure className={local.reference}>
      <figcaption><span>{String(index + 1).padStart(2, '0')} / {reference.name}</span><strong>{reference.title}</strong></figcaption>
      <div className={local.referenceImage}>
        <Screenshot src={`${ASSETS}/${reference.file}`} width={reference.width} height={reference.height}
          label={`${reference.name} reference`} alt={reference.alt} />
      </div>
    </figure>
  );
}

export default function FairPricingView() {
  return (
    <div className={`${styles.page} ${local.page}`}>
      <CaseStudyHeader sections={sections} />
      <main id="case-study" tabIndex={-1} className={styles.main}>
        <section id="overview" tabIndex={-1} className={`${styles.hero} ${local.hero}`} aria-labelledby="fair-pricing-title">
          <h1 id="fair-pricing-title">
            <span className={styles.projectNumber}>Project 3 · Fair Pricing</span>
            <span className={styles.heroAccent}>Clarifying Prices</span> for Fashion Shoppers
          </h1>
          <p className={local.intro}>During my internship at VIRGIO, I designed a price breakdown to help shoppers understand what they were paying for.</p>

          <div className={local.openingProof}>
            <section className={`${local.evidencePanel} ${local.tweetPanel}`} aria-label="Customer response">
              <figure className={local.customerPost}>
                <Screenshot src={`${ASSETS}/viral-tweet.jpg`} width={1298} height={1436} priority
                  label="Customer’s post about Fair Pricing"
                  alt="A customer writes ‘Love this. Makes me trust the brand more,’ sharing VIRGIO’s price breakdown. The post shows 551.9K views." />
                <figcaption className={styles.mediaCaption}>A customer’s post</figcaption>
              </figure>
              <div className={local.proofCopy}>
                <p className={local.evidenceLabel}>A customer’s response</p>
                <blockquote>“Love this. Makes me trust the brand more.”</blockquote>
                <p className={local.postContext}>A customer shared the price breakdown alongside the garment.</p>
                <div className={local.reach}>
                  <span>500K+</span>
                  <p>Organic views on a customer’s post</p>
                </div>
              </div>
            </section>

            <section className={`${local.evidencePanel} ${local.award}`} aria-labelledby="award-title">
              <figure className={local.awardPhoto}>
                <Screenshot src={`${ASSETS}/award-digies.jpg`} width={784} height={1045}
                  label="Silver DIGIES award"
                  alt="VIRGIO’s Silver DIGIES trophy for Best E-commerce Design, a category including trust-building elements." />
              </figure>
              <div className={local.awardCopy}>
                <p className={local.evidenceLabel}>Recognition</p>
                <p className={local.awardValue}>Silver</p>
                <h2 id="award-title">Trust-building element</h2>
                <p className={local.awardCategory}>DIGIES Awards · Best E-commerce Design</p>
                <p className={local.ipCopy}>Fair Pricing became <strong>VIRGIO’s company IP</strong> and the foundation for <EconicMention label="Econic Fair" description="The cost-to-make campaign built on Fair Pricing." />, shaping the campaign’s story and pricing experience.</p>
              </div>
            </section>
          </div>

          <div className={`${styles.storyOpening} ${local.context}`}>
            <h2 className={styles.overviewLabel}>The problem</h2>
            <div className={styles.overviewContent}>
              <p className={styles.openingCopy}>A price tells shoppers <strong>what they will pay, but not what goes into it.</strong> VIRGIO wanted to make that breakdown transparent and easy to read.</p>
              <dl className={`${styles.metadata} ${local.metadata}`}>
                <div><dt>Role</dt><dd>Product design intern</dd></div>
                <div><dt>Platform</dt><dd>App &amp; web</dd></div>
                <div><dt>Focus</dt><dd>Information architecture, interface writing &amp; visual hierarchy</dd></div>
                <div><dt>Status</dt><dd>Shipped</dd></div>
              </dl>
            </div>
          </div>

          <section className={local.designQuestion} aria-labelledby="design-question-title">
            <h2 id="design-question-title"><strong>How might we</strong> help shoppers understand what they’re paying for without overwhelming the product page?</h2>
          </section>
        </section>

        <section id="design" tabIndex={-1} className={`${styles.section} ${local.design}`} aria-labelledby="competitive-title">
          <h2 id="competitive-title">Different ways to explain a price</h2>
          <p className={styles.prose}>I compared eight references across charts, itemised lists, product callouts and comparison tables.</p>
          <div className={local.collage} role="group" aria-label="Competitive analysis with eight pricing references">
            <CompetitiveReference reference={references[0]} index={0} />
            <div className={local.referenceMasonry}>
              {references.slice(1).map((reference, index) => (
                <CompetitiveReference key={reference.file} reference={reference} index={index + 1} />
              ))}
            </div>
            <p className={local.collageHint}>Competitive review</p>
          </div>
          <p className={local.decision}>I chose a <strong>familiar bill-style list</strong> to explain the costs, supported by a comparison bar for the overview.</p>

          <section className={styles.section} aria-labelledby="iterations-title">
            <h2 id="iterations-title">From line items to cost groups</h2>
            <p className={styles.prose}>The early modal listed costs individually. The next version grouped them into broader categories inside a product-page accordion.</p>
            <div className={local.iterations}>
              <figure>
                <div className={local.iterationStage}>
                  <Screenshot src={`${ASSETS}/widget-v1.png`} width={720} height={1082} label="Early price breakdown exploration"
                    alt="Early modal exploration with separate fabric, manufacturing and transportation items, subtotal rows and a price comparison." />
                </div>
                <figcaption><span>Early exploration</span><strong>Individual cost items</strong></figcaption>
              </figure>
              <figure>
                <div className={local.iterationStage}>
                  <Screenshot src={`${ASSETS}/widget-v2.png`} width={816} height={1018} label="Grouped price breakdown"
                    alt="Grouped version with Making Cost, Serving Cost and Others, each explained within an inline accordion." />
                </div>
                <figcaption><span>Refined structure</span><strong>Fewer groups, with explanations</strong></figcaption>
              </figure>
            </div>
            <div className={local.writingNote}>
              <h3>Getting the labels right</h3>
              <p>I revised the wording repeatedly through informal testing with colleagues, balancing <strong>what shoppers could understand</strong> with how VIRGIO wanted to present its prices.</p>
            </div>
          </section>

          <section className={styles.section} aria-labelledby="final-title">
            <h2 id="final-title">The total stands out. The detail explains it.</h2>
            <div className={local.finalDesign}>
              <figure>
                <div className={local.finalStage}>
                  <Screenshot src={`${ASSETS}/widget-v3.png`} width={1064} height={1138} annotations={annotations}
                    label="Final Fair Pricing widget"
                    alt="Final Fair Pricing accordion with explanatory cost groups, a highlighted VIRGIO price and a separate traditional-price comparison." />
                </div>
                <figcaption className={styles.mediaCaption}>Final design</figcaption>
              </figure>
              <ol className={`${styles.annotationNotes} ${local.notes}`} aria-label="Final design decisions">
                {annotations.map(({ number, title, body }) => (
                  <li key={number} value={number}>
                    <span className={styles.annotationNumber} aria-hidden="true">{number}</span>
                    <div><strong>{title}</strong><p>{body}</p></div>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </section>

        <section id="reflection" tabIndex={-1} className={`${styles.reflectionStory} ${local.reflection}`} aria-labelledby="reflection-title">
          <h2 id="reflection-title">Clarity lives in the small decisions</h2>
          <p>Grouping, labels and hierarchy shaped how the price was explained. Next, I’d test with shoppers outside the team to see how they interpret the categories and comparison price.</p>
        </section>

        <nav className={styles.next} aria-label="More case studies">
          <Link href="/work/amodira"><span aria-hidden>←</span><span><small>Previous project</small>Audio Experience for Fragrance Discovery</span></Link>
          <Link href="/work/econic"><span><small>Next project</small>{econicTitle}</span><span aria-hidden>→</span></Link>
        </nav>
      </main>
    </div>
  );
}
