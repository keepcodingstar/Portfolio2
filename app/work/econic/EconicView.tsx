import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { CaseStudyArrival } from '@/components/work/CheckoutTransition';
import { CheckoutHeader, Screenshot } from '../checkout/CheckoutInteractions';
import EconicPreview from './EconicPreview';
import { campaignPhases, story } from './econic-content';
import shared from '../checkout/checkout.module.css';
import styles from './econic.module.css';

const ASSETS = '/work/econic/redesign';
const NAV = [{ id: 'overview', label: 'Overview' }, { id: 'challenge', label: 'Challenge' }, { id: 'design', label: 'Design' }, { id: 'learnings', label: 'Learnings' }] as const;

type SectionName = keyof typeof story;
function EmphasizedText({ text, phrase }: { text: string; phrase?: string }) {
  const start = phrase ? text.indexOf(phrase) : -1;
  if (!phrase || start < 0) return text;
  return <>{text.slice(0, start)}<strong className={styles.copyEmphasis}>{phrase}</strong>{text.slice(start + phrase.length)}</>;
}

function StorySection({ name, id, children, link }: { name: SectionName; id?: string; children: ReactNode; link?: ReactNode }) {
  const section = story[name];
  return (
    <section id={id} tabIndex={id ? -1 : undefined} className={`${shared.section} ${styles.section}`} aria-labelledby={`${name}-title`}>
      <h2 id={`${name}-title`}>{story[name].title}</h2>
      <p className={shared.prose}><EmphasizedText text={section.body} phrase={'emphasis' in section ? section.emphasis : undefined} />{link && <> {link}</>}</p>
      <figure className={styles.visual}>{children}</figure>
    </section>
  );
}
function Detail({ name, width, height, label, alt, phone = false }: { name: string; width: number; height: number; label: string; alt: string; phone?: boolean }) {
  return <Screenshot src={`${ASSETS}/${name}.webp`} width={width} height={height} label={label} alt={alt} phone={phone} unoptimized />;
}

export default function EconicView() {
  return (
    <div className={`${shared.page} ${styles.page}`}>
      <CaseStudyArrival />
      <CheckoutHeader sections={NAV} />
      <main id="case-study" tabIndex={-1} className={shared.main}>
        <section className={`${shared.hero} ${styles.hero}`} aria-labelledby="econic-title">
          <h1 id="econic-title"><span className={shared.projectNumber}>Project 4 · VIRGIO · Econic Fair ’25</span><span className={shared.heroAccent}>Helping Shoppers Navigate</span><br />a Cost-to-Make Sale<br />from Discovery to Purchase</h1>
          <p className={styles.heroDescription}>I co-designed the shopping experience with the VIRGIO team, helping shoppers move from an early price preview to sale-day purchase.</p>
          <figure className={shared.heroFrame}>
            <div className={styles.heroHighlights} role="group" aria-label="VIRGIO campaign results">
              <div className={styles.heroRevenue}>
                <span className={styles.revenueValue}>50×</span>
                <div><strong>one usual day’s revenue</strong><span className={styles.heroAwardCredit}>Total revenue across three sale days</span></div>
              </div>
              <div className={styles.heroAward}>
                <div className={styles.heroAwardPhoto}><Detail name="award" width={618} height={805} label="Econic Fair RetailEX award" alt="VIRGIO Eco-nic Fair ’25 trophy for Best Brand Campaign of the Year at e4m RetailEX Awards 2026." /></div>
                <div><span className={styles.visualLabel}>e4m RetailEX Awards 2026</span><strong>Best Brand Campaign of the Year</strong><span className={styles.heroAwardCredit}>Awarded to the VIRGIO campaign</span></div>
              </div>
            </div>
            <Image data-case-study-hero className={shared.heroImage} src="/work/econic/thumb.jpg" alt="Econic Fair price preview toggle, as featured on the homepage."
              width={1056} height={660} sizes="(max-width: 600px) 90vw, (max-width: 1232px) 88vw, 1094px" priority unoptimized />
          </figure>
        </section>

        <section id="overview" tabIndex={-1} aria-labelledby="overview-title">
          <div className={shared.storyOpening}>
            <h2 id="overview-title" className={shared.overviewLabel}>Overview</h2>
            <div className={shared.overviewContent}>
              <p className={shared.openingCopy}><EmphasizedText text={story.overview.body} phrase={story.overview.emphasis} /></p>
              <dl className={shared.metadata}>
                <div><dt>My role</dt><dd>Co-design · VIRGIO team</dd></div>
                <div><dt>Timeline</dt><dd>3–4 weeks</dd></div>
                <div><dt>Scope</dt><dd>Mobile & desktop</dd></div>
                <div><dt>Focus</dt><dd>Interaction design & pricing communication</dd></div>
              </dl>
            </div>
          </div>
        </section>

        <p className={styles.framingQuestion}><EmphasizedText text={story.overview.question} phrase="How might we" /></p>

        <StorySection name="phases" id="challenge">
          <div className={styles.phaseVisual}>
            <div className={styles.phaseGrid} tabIndex={0} role="group" aria-label="Three campaign phases, scroll to explore">
              {campaignPhases.map((phase) => (
                <div key={phase.name} className={`${styles.phase} ${phase.screens.length > 1 ? styles.phaseWithStates : ''}`}>
                  <span className={styles.stateLabel}>{phase.phase}</span>
                  <span className={styles.phaseName}>{phase.name}</span>
                  <span className={styles.phaseGoal}>{phase.goal}</span>
                  <div className={styles.phaseScreens}>
                    {phase.screens.map((screen) => (
                      <div key={screen.image}>
                        <div className={styles.wireframe}>
                          <Detail name={screen.image} width={screen.width} height={screen.height} label={screen.label} alt={screen.alt} />
                        </div>
                        {phase.screens.length > 1 && <span className={styles.wireframeCaption}>{screen.label}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </StorySection>

        <div id="design" tabIndex={-1} className={styles.anchor}>
          <StorySection name="language">
            <div className={styles.languageVisual}>
              <div className={styles.languageCampaign}><Detail name="brand-banner" width={748} height={452} label="Econic campaign identity" alt="Econic Fair logo, green countdown and zero margins message over picnic campaign photography." /></div>
              <div className={styles.languageType}><Detail name="brand-type-refined" width={1138} height={770} label="Campaign typography" alt="Together we made fashion fair. Three days. Zero margins. All heart." /></div>
              <div className={styles.languageCountdown}><Detail name="countdown-promise" width={510} height={264} label="Fair countdown and promise" alt="Econic Fair countdown, Zero margins. Zero markup., and the November 7–9 cost-to-make message." /></div>
              <div className={styles.languageCounter}><Detail name="campaign-counters" width={812} height={218} label="Campaign banners" alt="Econic shopping and savings banners using playful shapes and the campaign type treatment." /></div>
            </div>
          </StorySection>

          <StorySection name="preview"><EconicPreview /></StorySection>

          <StorySection name="pricing" link={<Link className={styles.inlineLink} href="/work/fair-pricing">Explore Fair Pricing ↗</Link>}>
            <div className={styles.pricingComposition}>
              <Detail name="fair-pricing-composition" width={1806} height={1372} label="Fair pricing on the product page" alt="Econic product-page preview with the fair-pricing breakdown: ₹690 cost to make is highlighted, while serving cost and other costs are crossed out in the fair-price view." />
            </div>
          </StorySection>

          <StorySection name="amodira" link={<Link className={styles.inlineLink} href="/work/amodira">More work for Amodira ↗</Link>}>
            <div className={styles.amodiraVisual}>
              <div className={styles.amodiraWidget}><Detail name="amodira-cart-widget" width={720} height={840} label="Amodira cart widget" alt="Amodira's best deal of the sale widget introduces fragrances through floral and product imagery, with Add actions." /></div>
              <div className={styles.amodiraVariants}><Detail name="amodira-variants" width={682} height={899} label="Amodira variant sheet" alt="Fragrance formats with individual prices and Add to bag actions." /></div>
            </div>
          </StorySection>
        </div>

        <section id="results" tabIndex={-1} className={`${shared.section} ${styles.section} ${styles.results}`} aria-labelledby="results-title">
          <h2 id="results-title">{story.results.title}</h2>
          <dl className={styles.resultsGrid}>
            {story.results.metrics.map(({ label, value, context }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd><span className={styles.resultValue}>{value}</span><span className={styles.resultContext}>{context}</span></dd>
              </div>
            ))}
            <div className={styles.resultAward}>
              <dt>{story.results.award.label}</dt>
              <dd>{story.results.award.title}</dd>
            </div>
          </dl>
          <p className={styles.resultsCredit}>{story.results.body}</p>
        </section>

        <section id="learnings" tabIndex={-1} className={`${shared.section} ${styles.section} ${styles.learnings}`} aria-labelledby="learnings-title">
          <h2 id="learnings-title">{story.learnings.title}</h2>
          <p className={shared.prose}><EmphasizedText text={story.learnings.body} phrase={story.learnings.emphasis} /></p>
        </section>

        <nav className={shared.next} aria-label="More case studies">
          <Link href="/work/fair-pricing"><span aria-hidden>←</span><span><small>Previous project</small>Fair Pricing</span></Link>
          <Link href="/work/checkout"><span><small>Next project</small>Faster Checkout</span><span aria-hidden>→</span></Link>
        </nav>
      </main>
    </div>
  );
}
