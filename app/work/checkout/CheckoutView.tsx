import Image from 'next/image';
import Link from 'next/link';
import { CheckoutArrival } from '@/components/work/CheckoutTransition';
import CaseStudyLearnings from '@/components/work/CaseStudyLearnings';
import { CheckoutHeader, EconicMention, Screenshot } from './CheckoutInteractions';
import { econicTitle } from '../econic/econic-content';
import { checkoutOutcomes, checkoutTitle, checkoutTitleAccent, combinedScreens, explorations, finalAnnotations, finalScreens, scope, story, type ScreenAnnotation, type StudyScreen } from './checkout-content';
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

function ScreenGallery({ screens, label, four = false, showSwipeHint = false }: { screens: StudyScreen[]; label: string; four?: boolean; showSwipeHint?: boolean }) {
  return (
    <div data-case-reveal className={styles.galleryBlock}>
      {showSwipeHint && <p className={styles.swipeHint}>Swipe to explore.</p>}
      <div className={`${styles.screenGallery} ${four ? styles.fourScreens : ''} ${screens.length === 2 ? styles.twoScreens : ''}`} role="group" aria-label={label} tabIndex={0}>
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
  const [primaryFinalScreen, ...supportingFinalScreens] = finalScreens;

  return (
    <div className={`${styles.page} ${styles.checkoutStudy}`}>
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
            <h2 data-case-reveal="text" id="before-title">{story.before.title}</h2>
            <p className={styles.prose}>{problemBefore}<strong>UI felt disconnected</strong>{problemAfter}</p>
            <figure data-case-reveal>
              <div className={`${styles.mediaStage} ${styles.beforeStage}`}>
                <Screenshot src={`${ASSETS}/shopify-checkout.webp`} label="Original Shopify checkout"
                  width={3024} height={2300} alt="VIRGIO’s original Shopify checkout, with shipping and payment on the left and the order summary on the right. Personal account details are hidden." />
              </div>
              <figcaption className={styles.mediaCaption}>Before · Shopify checkout</figcaption>
            </figure>
            <div className={styles.critiqueGrid}>
              <div><p className={styles.issueLabel}>Migration trigger</p><h3>Capacity we couldn’t directly scale</h3><p>Shopify checkout became a bottleneck even when our other systems handled the traffic, prompting the move in-house.</p></div>
              <div><p className={styles.issueLabel}>UX issue</p><h3>Limited control over the experience</h3><p>Shopify limited how we could tailor address entry, payment choices and checkout behaviour to VIRGIO.</p></div>
              <div><p className={styles.issueLabel}>UX issue</p><h3>Inconsistent with VIRGIO’s design system</h3><p>Checkout didn’t match VIRGIO’s new design system, making the final step feel disconnected.</p></div>
            </div>
          </section>

          <aside className={styles.principleCard} aria-labelledby="checkout-principle-title">
            <h3 id="checkout-principle-title" className={styles.principleLead}>{story.hesitation.lead}</h3>
            <p className={styles.designPrinciple}>{story.hesitation.body}</p>
          </aside>

          <section className={`${styles.section} ${styles.goalsSection}`} aria-labelledby="goals-title">
            <h2 data-case-reveal="text" id="goals-title">{story.goals.title}</h2>
            <p className={styles.prose}>{story.goals.description}</p>
            <div className={styles.tableWrap}>
              <table className={styles.scopeTable}>
                <caption className="sr-only">Checkout redesign goals, design scope, success measures, boundaries and constraints</caption>
                <tbody>{scope.map(([part, description]) => <tr key={part}><th scope="row">{part}</th><td>{description}</td></tr>)}</tbody>
              </table>
            </div>
            <p className={styles.question}><strong>{story.goals.lead}</strong> {story.goals.body}</p>
          </section>
        </section>

        <section id="design" tabIndex={-1} aria-labelledby="concept-title">
          <section className={styles.section} aria-labelledby="concept-title">
            <p className={styles.statusLabel}>Explored · Not shipped</p>
            <h2 data-case-reveal="text" id="concept-title">{story.concept.title}</h2>
            <p className={styles.prose}>{story.concept.body}</p>
            <ScreenGallery screens={combinedScreens} label="Combined checkout concept: four screens" four showSwipeHint />
            <p className={styles.conceptNote}>The final direction focused on verifying delivery details and completing payment.</p>
          </section>

          <section id="explorations" className={`${styles.section} ${styles.explorationSection}`} aria-labelledby="explorations-title">
            <p className={styles.statusLabel}>Further explorations · Not shipped</p>
            <h2 data-case-reveal="text" id="explorations-title">Other directions along the way</h2>
            <p className={styles.prose}>Three alternatives for organising saved cards, payment modes and the order summary.</p>
            <div data-case-reveal className={styles.galleryBlock}>
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
            <h2 data-case-reveal="text" id="final-title">{story.final.title}</h2>
            <p className={styles.prose}>{story.final.body}</p>
            <figure data-case-reveal className={styles.finalShowcase}>
              <div className={`${styles.mediaStage} ${styles.finalPhone}`}>
                <Screenshot src={`${ASSETS}/${primaryFinalScreen.file}.webp`} label={primaryFinalScreen.label}
                  width={primaryFinalScreen.width} height={primaryFinalScreen.height} phone
                  annotations={finalAnnotations} alt={primaryFinalScreen.alt} />
              </div>
              <figcaption className={styles.finalNotes}>
                <AnnotationNotes annotations={finalAnnotations} />
              </figcaption>
            </figure>
            <ScreenGallery screens={supportingFinalScreens} label="Final mobile checkout: empty address and editing states" showSwipeHint />
          </section>

          <section className={styles.section} aria-labelledby="address-title">
            <h2 data-case-reveal="text" id="address-title">{story.address.title}</h2>
            <p className={styles.prose}>{story.address.body}</p>
            <figure data-case-reveal>
              <div className={`${styles.mediaStage} ${styles.phoneStage}`}>
                <Screenshot src={`${ASSETS}/final-map-location.webp`} label="Final map location screen" width={804} height={1787} phone
                  alt="Map search and a draggable delivery pin, with a located address and a Confirm and Proceed action." />
                <Screenshot src="/work/checkout/address-mobile.png" label="Final address details form" width={804} height={1770} phone
                  alt="Editable address form with a map-backed location card, address fields and a selector for who the order is for." />
              </div>
              <figcaption className={styles.mediaCaption}>Locate the delivery point, then review the address.</figcaption>
            </figure>
          </section>
        </section>

        <section id="impact" tabIndex={-1} aria-labelledby="results-title">
          <section className={styles.section} aria-labelledby="results-title">
            <h2 data-case-reveal="text" id="results-title">{story.results.title}</h2>
            <p className={styles.prose}>{story.results.body}</p>
            <div data-case-reveal="group" className={styles.resultPair}>
              {checkoutOutcomes.map(({ value, label }) => (
                <div key={label}><span className={styles.resultValue}>{value}</span><p>{label}</p></div>
              ))}
            </div>
          </section>

          <CaseStudyLearnings {...story.learnings} />
        </section>

        <nav className={styles.next} aria-label="More case studies">
          <Link href="/work/econic"><span aria-hidden>←</span><span><small>Previous project</small>{econicTitle}</span></Link>
          <Link href="/work/fair-pricing"><span><small>Next project</small>Fair Pricing</span><span aria-hidden>→</span></Link>
        </nav>
      </main>
    </div>
  );
}
