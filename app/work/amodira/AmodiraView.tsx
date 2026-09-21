import Image from 'next/image';
import Link from 'next/link';
import { CaseStudyArrival } from '@/components/work/CheckoutTransition';
import { CheckoutHeader as CaseStudyHeader, Screenshot } from '../checkout/CheckoutInteractions';
import styles from '../checkout/checkout.module.css';
import local from './amodira.module.css';
import FragranceSoundConcept from './FragranceSoundConcept';
import { FragranceAudioProvider, FragranceTrackCard, FragranceTrackPlayer } from './FragranceAudio';
import { FragranceLikesProvider, FragranceLikesHint } from './FragranceLikes';
import { amodiraTitle, amodiraTitleAccent, amodiraSkills, fragrances, story } from './amodira-content';

const ASSETS = '/work/amodira';

export default function AmodiraView() {
  return (
    <FragranceLikesProvider>
    <FragranceAudioProvider>
    <div className={`${styles.page} ${local.page}`}>
      <CaseStudyArrival />
      <CaseStudyHeader />
      <main id="case-study" tabIndex={-1} className={styles.main}>
        <section className={styles.hero} aria-labelledby="amodira-title">
          <h1 id="amodira-title">
            <span className={styles.projectNumber}>Project 2: </span>
            <span className={styles.heroAccent}>{amodiraTitleAccent}</span>{amodiraTitle.slice(amodiraTitleAccent.length)}
          </h1>
          <p className={local.heroSkills}>{amodiraSkills}</p>
          <figure className={styles.heroFrame}>
            <Image data-case-study-hero className={styles.heroImage} src={`${ASSETS}/thumb.jpg`}
                alt="Early Raya audio player with a chart connecting fragrance notes to musical layers."
              width={1056} height={660} sizes="(max-width: 600px) 90vw, (max-width: 1232px) 88vw, 1094px" priority />
            <figcaption className={local.heroCaption}>Sound of the Scent · Early Raya concept</figcaption>
          </figure>
        </section>

        <section id="overview" tabIndex={-1} aria-labelledby="overview-title">
          <div className={styles.storyOpening}>
            <h2 id="overview-title" className={styles.overviewLabel}>Overview</h2>
            <div className={styles.overviewContent}>
              <p className={styles.openingCopy}>{story.overview.context} {story.overview.role} {story.overview.decision} <strong>{story.overview.outcome}</strong></p>
              <dl className={`${styles.metadata} ${local.metadata}`}>
                <div><dt>Role</dt><dd>Concept development &amp; interaction design</dd></div>
                <div><dt>Audio creation</dt><dd>8 AI-created tracks</dd></div>
                <div><dt>Validation</dt><dd>Usability testing</dd></div>
                <div><dt>Status</dt><dd>Shipped · Amodira</dd></div>
              </dl>
            </div>
          </div>

          <section className={styles.section} aria-labelledby="problem-title">
            <h2 id="problem-title">{story.problem.title}</h2>
            <p className={styles.prose}>{story.problem.body}</p>
            <figure className={local.collectionPhoto}>
              <Image src={`${ASSETS}/collection.webp`} width={1600} height={1200}
                alt="Amodira’s eight perfumes with their illustrated royal packaging."
                sizes="(max-width: 600px) 90vw, (max-width: 1232px) 88vw, 1120px" />
              <figcaption className={styles.mediaCaption}>Amodira’s eight perfumes, united by a royal theme.</figcaption>
            </figure>
          </section>
        </section>

        <section id="design" tabIndex={-1} aria-labelledby="concept-title">
          <section className={styles.section} aria-labelledby="concept-title">
            <h2 id="concept-title">{story.concept.title}</h2>
            <p className={styles.prose}>{story.concept.body}</p>
            <FragranceSoundConcept />
            <section className={local.storytelling} aria-labelledby="vaanan-story-title">
              <h3 id="vaanan-story-title">{story.concept.storytelling.title}</h3>
              <p className={styles.prose}>{story.concept.storytelling.body}</p>
              <div className={local.storyExample}>
                <div className={local.storyTrack}>
                  <div className={local.storyIdentity}>
                    <Image src={`${ASSETS}/fragrances/${story.concept.storytelling.track.slug}.webp`}
                      alt="Vaanan perfume with its illustrated royal packaging." width={640} height={640} sizes="64px" />
                    <span>{story.concept.storytelling.track.name}</span>
                  </div>
                  <FragranceTrackPlayer track={story.concept.storytelling.track} />
                </div>
                <ol className={local.storyArc} aria-label="Vaanan: connecting a royal story to everyday life through sound">
                  {story.concept.storytelling.flow.map(({ label, title }, index) => <li key={label}>
                    <span className={local.visualLabel}>{label}</span>
                    <strong>
                      {title}
                      {index < story.concept.storytelling.flow.length - 1 && (
                        <svg className={local.storyArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M4 12h16m-6-6 6 6-6 6" />
                        </svg>
                      )}
                    </strong>
                  </li>)}
                </ol>
              </div>
            </section>
          </section>

          <section id="soundtracks" className={styles.section} aria-labelledby="soundtracks-title">
            <h2 id="soundtracks-title">{story.soundtracks.title}</h2>
            <p className={styles.prose}>{story.soundtracks.body}</p>
            <figure className={local.fragranceCollection}>
              <ul className={local.fragranceGrid}>
                {fragrances.map((track) => <FragranceTrackCard key={track.slug} track={track} />)}
              </ul>
              <figcaption className={styles.mediaCaption}><span>Hover or tap the image for scent notes. Press play to listen.</span><FragranceLikesHint /></figcaption>
            </figure>
          </section>

          <section className={styles.section} aria-labelledby="sound-profile-title">
            <h2 id="sound-profile-title">{story.soundProfile.title}</h2>
            <p className={styles.prose}>{story.soundProfile.body}</p>
            <figure className={local.profileStudy}>
              <div className={local.profileStage}>
                <Screenshot src={`${ASSETS}/raya-sound-profile-hq.png`} label="Raya sound and scent intensity profile"
                  alt="Early Raya intensity chart. Treble maps to top notes, mids to heart notes and bass to base notes. The curve gives treble the strongest emphasis and bass the subtlest."
                  width={769} height={609} />
              </div>
              <figcaption className={styles.mediaCaption}>Early concept · Raya’s intensity chart</figcaption>
            </figure>
          </section>

          <section className={styles.section} aria-labelledby="iteration-title">
            <h2 id="iteration-title">{story.iteration.title}</h2>
            <p className={styles.prose}>{story.iteration.body}</p>
            <div className={local.comparison}>
              <figure>
                <div className={local.comparisonStage}>
                  <Screenshot src={`${ASSETS}/raya-v1-complex.png`} label="Raya before usability testing"
                    alt="The first Raya widget, with an audio player, a frequency chart mapping treble, mids and bass to top, heart and base notes, and three descriptions."
                    width={986} height={312} />
                </div>
                <figcaption className={local.comparisonCaption}>
                  <strong>Before · Frequency chart</strong>
                </figcaption>
              </figure>
              <figure>
                <div className={`${local.comparisonStage} ${local.finalStage}`}>
                  <Screenshot src={`${ASSETS}/raya-sound.png`} label="Raya after usability testing"
                    alt="The revised Raya widget, with an audio player and three short descriptions connecting the music to the fragrance. The frequency chart has been removed."
                    width={542} height={524} />
                </div>
                <figcaption className={local.comparisonCaption}>
                  <strong>After · Three short descriptions</strong>
                </figcaption>
              </figure>
            </div>
          </section>
        </section>

        <section id="impact" tabIndex={-1} aria-labelledby="impact-title">
          <section className={styles.section} aria-labelledby="impact-title">
            <h2 id="impact-title">{story.impact.title}</h2>
            <p className={styles.prose}>{story.impact.body}</p>
            <div className={local.outcome}>
              <div className={local.outcomeMetric}>
                <span className={styles.resultValue}>2nd</span>
                <p>Most interacted element<br />after the Back button</p>
              </div>
              <ol className={local.interactionOrder} aria-label="Product page interaction ranking">
                <li><span>01</span>Back button</li>
                <li><span>02</span>Sound of the Scent</li>
              </ol>
            </div>
          </section>

          <section className={styles.reflectionStory} aria-labelledby="reflection-title">
            <h2 id="reflection-title">{story.reflection.title}</h2>
            <p>{story.reflection.body}</p>
          </section>
        </section>

        <nav className={styles.next} aria-label="More case studies">
          <Link href="/work/checkout"><span aria-hidden>←</span><span><small>Previous project</small>Faster Checkout</span></Link>
          <Link href="/work/fair-pricing"><span><small>Next project</small>Fair Pricing</span><span aria-hidden>→</span></Link>
        </nav>
      </main>
    </div>
    </FragranceAudioProvider>
    </FragranceLikesProvider>
  );
}
