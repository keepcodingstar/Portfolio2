import Image from 'next/image';
import Link from 'next/link';
import { CheckoutArrival } from '@/components/work/CheckoutTransition';
import { CheckoutHeader, EconicMention, Screenshot } from './CheckoutInteractions';
import { checkoutOutcomes, checkoutTitle, checkoutTitleAccent, combinedScreens, desktopAnnotations, explorations, finalScreens, scope, story, type ScreenAnnotation, type StudyScreen } from './checkout-content';
import styles from './checkout.module.css';

const ASSETS = '/work/checkout/redesign';

function AnnotationNotes({ annotations }: { annotations: ScreenAnnotation[] }) {
  return (
    <ol className={styles.annotationNotes} aria-label="Design annotations">
      {annotations.map((annotation) => (
        <li key={annotation.number} value={annotation.number}>
          <span className={styles.annotationNumber} aria-hidden="true">{annotation.number}</span>
          <div><strong>{annotation.title}</strong><p>{annotation.body}</p></div>
        </li>
      ))}
    </ol>
  );
}

function ScreenGallery({ screens, label, four = false, showHint = false }: { screens: StudyScreen[]; label: string; four?: boolean; showHint?: boolean }) {
  return (
    <div className={styles.galleryBlock}>
      {showHint && <p className={`${styles.galleryHint} ${styles.galleryHintAbove}`}><span className={styles.swipeHint}>Swipe to explore. </span>Select a screen to enlarge ↗</p>}
      <div className={`${styles.screenGallery} ${four ? styles.fourScreens : ''}`} role="group" aria-label={label} tabIndex={0}>
        {screens.map((screen) => (
          <figure key={screen.file} className={styles.screenItem}>
            <div className={styles.screenMat}>
              <Screenshot src={`${ASSETS}/${screen.file}.webp`} label={screen.label} alt={screen.alt}
                width={screen.width} height={screen.height} annotations={screen.annotations} phone />
            </div>
            <figcaption>{screen.annotations ? <AnnotationNotes annotations={screen.annotations} /> : screen.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function CheckoutCase() {
  const [contextBefore, contextAfter] = story.context.body.split('Econic 25');
  const [problemBefore, problemAfter] = story.before.body.split('UI felt disconnected');

  return (
    <div className={styles.page}>
      <CheckoutArrival />
      <CheckoutHeader />
      <main id="case-study" tabIndex={-1} className={styles.main}>
        <section className={styles.hero} aria-labelledby="checkout-title">
          <h1 id="checkout-title">
            <span className={styles.projectNumber}>Project 1:</span>
            <span className={styles.heroAccent}>{checkoutTitleAccent}</span>{checkoutTitle.slice(checkoutTitleAccent.length)}
          </h1>
          <figure className={styles.heroFrame}>
            <Image data-checkout-hero className={styles.heroImage} src="/work/checkout/thumb.jpg"
              alt="VIRGIO in-house checkout: payment, map address pin, and add-address screens"
              width={1056} height={660} sizes="(max-width: 600px) 90vw, (max-width: 1232px) 88vw, 1094px" priority />
          </figure>
        </section>

        <section id="overview" tabIndex={-1} aria-labelledby="overview-title">
          <div className={styles.storyOpening}>
            <h2 id="overview-title" className={styles.overviewLabel}>Overview</h2>
            <div className={styles.overviewContent}>
              <p className={styles.openingCopy}>{contextBefore}<EconicMention />{contextAfter}</p>
              <p className={styles.openingCopy}>Following the in-house migration and redesign, we saw <strong>2.68% higher conversion</strong> and <strong>25.7% less time to complete checkout</strong>.</p>
              <dl className={styles.metadata}>
                <div><dt>Role</dt><dd>Product design</dd></div>
                <div><dt>Platform</dt><dd>Mobile &amp; desktop</dd></div>
                <div><dt>Timeline</dt><dd>2 weeks</dd></div>
                <div><dt>Status</dt><dd>Live in production</dd></div>
              </dl>
            </div>
          </div>

          <section className={styles.section} aria-labelledby="before-title">
            <h2 id="before-title">{story.before.title}</h2>
            <p className={styles.prose}>{problemBefore}<strong>UI felt disconnected</strong>{problemAfter}</p>
            <figure>
              <div className={`${styles.mediaStage} ${styles.beforeStage}`}>
                <Screenshot src={`${ASSETS}/shopify-checkout.webp`} label="Original Shopify checkout"
                  width={3024} height={2300} alt="VIRGIO’s original Shopify checkout, with shipping and payment on the left and the order summary on the right. Personal account details are hidden." />
              </div>
              <figcaption className={styles.mediaCaption}><span>Before · Shopify checkout</span><span>Select image to enlarge ↗</span></figcaption>
            </figure>
            <div className={styles.critiqueGrid}>
              <div><p className={styles.issueLabel}>Migration trigger</p><h3>Capacity we couldn’t directly scale</h3><p>The sale exposed a dependency on Shopify checkout capacity, even when our other systems could handle the traffic. This prompted the move in-house.</p></div>
              <div><p className={styles.issueLabel}>UX issue</p><h3>Limited control over the experience</h3><p>The Shopify checkout gave us less flexibility to tailor address entry, payment choices and checkout behaviour to VIRGIO’s needs.</p></div>
              <div><p className={styles.issueLabel}>UX issue</p><h3>Inconsistent with VIRGIO’s design system</h3><p>Checkout didn’t fully align with VIRGIO’s new design system, making the final step feel separate from the rest of the shopping journey.</p></div>
            </div>
          </section>

          <aside className={styles.principleCard} aria-label="Reducing hesitation at checkout">
            <p className={styles.principleLead}><span className={styles.heroAccent}>{story.hesitation.accent}</span>{story.hesitation.lead.slice(story.hesitation.accent.length)}</p>
            <p className={styles.designPrinciple}>{story.hesitation.body}</p>
          </aside>

          <section className={`${styles.section} ${styles.goalsSection}`} aria-labelledby="goals-title">
            <h2 id="goals-title">{story.goals.title}</h2>
            <p className={styles.prose}>{story.goals.description}</p>
            <div className={styles.tableWrap}>
              <table className={styles.scopeTable}>
                <caption className="sr-only">Checkout redesign goals, design scope, success measures, boundaries and constraints</caption>
                <thead><tr><th scope="col">Part</th><th scope="col">What this meant for checkout</th></tr></thead>
                <tbody>{scope.map(([part, description]) => <tr key={part}><th scope="row">{part}</th><td>{description}</td></tr>)}</tbody>
              </table>
            </div>
            <p className={styles.question}><strong>{story.goals.lead}</strong> {story.goals.body}</p>
          </section>
        </section>

        <section id="design" tabIndex={-1} aria-labelledby="concept-title">
          <section className={styles.section} aria-labelledby="concept-title">
            <p className={styles.statusLabel}>Explored · Not shipped</p>
            <h2 id="concept-title">{story.concept.title}</h2>
            <p className={styles.prose}>{story.concept.body}</p>
            <ScreenGallery screens={combinedScreens} label="Combined checkout concept: four screens" four showHint />
            <p className={styles.conceptNote}>The combined concept was not taken forward. The shipped direction kept checkout focused on verifying delivery details and completing payment.</p>
          </section>

          <section id="explorations" className={`${styles.section} ${styles.explorationSection}`} aria-labelledby="explorations-title">
            <p className={styles.statusLabel}>Further explorations · Not shipped</p>
            <h2 id="explorations-title">Other directions along the way</h2>
            <p className={styles.prose}>Three alternatives for organising saved cards, payment modes and the order summary.</p>
            <div className={styles.galleryBlock}>
              <p className={`${styles.galleryHint} ${styles.galleryHintAbove}`}>Select a screen to enlarge ↗</p>
              <div className={styles.explorationGrid}>
                {explorations.map((screen) => (
                  <article key={screen.file}>
                    <div className={`${styles.screenMat} ${styles.explorationMat}`}>
                      <Screenshot src={`${ASSETS}/${screen.file}.webp`} label={screen.label} alt={screen.alt}
                        width={screen.width} height={screen.height} phone />
                    </div>
                    <div>
                      <h3>{screen.title}</h3>
                      <p>{screen.observation}</p>
                      <p className={styles.tradeoff}><span>{screen.noteLabel ?? 'Trade-off'}</span>{screen.consideration}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.section} aria-labelledby="final-title">
            <p className={styles.statusLabel}>Final design</p>
            <h2 id="final-title">{story.final.title}</h2>
            <p className={styles.prose}>{story.final.body}</p>
            <figure>
              <div className={styles.mediaStage}>
                <Screenshot src="/work/checkout/payment-desktop.png" label="Final desktop checkout" width={2560} height={1788}
                  annotations={desktopAnnotations}
                  alt="Final desktop checkout with a selected delivery address, credits and gift cards, payment options and a visible order summary." />
              </div>
              <figcaption>
                <p className={styles.mediaCaption}>Final checkout · Desktop</p>
                <AnnotationNotes annotations={desktopAnnotations} />
              </figcaption>
            </figure>
            <ScreenGallery screens={finalScreens} label="Final mobile checkout: saved address, empty address and editing states" />
          </section>

          <section className={styles.section} aria-labelledby="address-title">
            <h2 id="address-title">{story.address.title}</h2>
            <p className={styles.prose}>{story.address.body}</p>
            <figure>
              <div className={`${styles.mediaStage} ${styles.phoneStage}`}>
                <Screenshot src={`${ASSETS}/final-map-location.webp`} label="Final map location screen" width={804} height={1787} phone
                  alt="Map search and a draggable delivery pin, with a located address and a Confirm and Proceed action." />
                <Screenshot src="/work/checkout/address-mobile.png" label="Final address details form" width={804} height={1770} phone
                  alt="Editable address form with a map-backed location card, address fields and a selector for who the order is for." />
              </div>
              <figcaption className={styles.mediaCaption}><span>Locate the delivery point, then review the address.</span><span>Select a screen to enlarge ↗</span></figcaption>
            </figure>
          </section>
        </section>

        <section id="impact" tabIndex={-1} aria-labelledby="measurement-title">
          <section className={`${styles.section} ${styles.measurementLayout}`} aria-labelledby="measurement-title">
            <div>
              <h2 id="measurement-title">{story.measurement.title}</h2>
              <p className={styles.prose}>{story.measurement.body}</p>
            </div>
            <aside className={styles.insight} aria-label="Post-launch finding">
              <Image className={styles.heatmap} src={`${ASSETS}/dead-click-detail.webp`}
                alt="Heatmap detail showing clicks clustered near the close button."
                width={206} height={188} sizes="52px" />
              <p><strong>Caught within days of launch.</strong> Microsoft Clarity heatmaps and session recordings revealed a close button’s tiny click target.</p>
            </aside>
          </section>

          <section className={styles.section} aria-labelledby="results-title">
            <h2 id="results-title">{story.results.title}</h2>
            <p className={styles.prose}>{story.results.body}</p>
            <div className={styles.resultPair}>
              {checkoutOutcomes.map(({ value, label }) => (
                <div key={label}><span className={styles.resultValue}>{value}</span><p>{label}</p></div>
              ))}
            </div>
          </section>

          <section className={styles.reflectionStory} aria-labelledby="reflection-title">
            <h2 id="reflection-title">{story.reflection.title}</h2>
            <p>{story.reflection.body}</p>
          </section>
        </section>

        <nav className={styles.next} aria-label="More case studies">
          <Link href="/work/econic"><span aria-hidden>←</span><span><small>Previous project</small>Econic 25</span></Link>
          <Link href="/work/amodira"><span><small>Next project</small>Amodira: Sound of the Scent</span><span aria-hidden>→</span></Link>
        </nav>
      </main>
    </div>
  );
}
