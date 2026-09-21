import Image from 'next/image';
import { Screenshot } from '../checkout/CheckoutInteractions';
import styles from '../checkout/checkout.module.css';
import local from './amodira.module.css';
import { soundLayers } from './amodira-content';
import { FragranceTrackPlayer } from './FragranceAudio';

const ASSETS = '/work/amodira';
const MEDIA = [
  { name: 'Text', purpose: 'Describes the notes', path: 'M4 5h16M12 5v14M8 19h8' },
  { name: 'Images', purpose: 'Show the product', path: 'M3 4h18v16H3zM3 16l5-5 4 4 3-3 6 6M15 8h.01' },
  { name: 'Video', purpose: 'Sets the scene', path: 'M3 4h18v16H3zM10 8l6 4-6 4z' },
  { name: 'Sound', purpose: 'Expresses character', path: 'M4 10v4M8 6v12M12 3v18M16 6v12M20 10v4' },
] as const;

/** Illustrations of frequency layers, not measurements of the soundtrack. */
function MusicalLayer({ cycles }: { cycles: number }) {
  const points = Array.from({ length: 241 }, (_, i) => {
    const x = i;
    const envelope = Math.sin((i / 240) * Math.PI);
    const y = 40 - Math.sin((i / 240) * Math.PI * 2 * cycles) * 26 * envelope;
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  return <svg className={local.layerWave} viewBox="0 0 240 80" fill="none" aria-hidden="true">
    <path d="M0 40H240" stroke="currentColor" strokeOpacity=".12" />
    <path d={points} stroke="currentColor" strokeWidth="1.6" />
  </svg>;
}

export default function FragranceSoundConcept() {
  return (
    <figure className={local.conceptFigure}>
      <dl className={local.mediaChannels} aria-label="Ways to present fragrance on the web">
        {MEDIA.map(({ name, purpose, path }) => <div key={name} className={name === 'Sound' ? local.soundChannel : undefined}>
          <dt><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={path} /></svg>{name}</dt>
          <dd>{purpose}</dd>
        </div>)}
      </dl>

      <div className={local.directionBoard}>
        <div className={local.rayaIdentity}>
          <Image src={`${ASSETS}/fragrances/raya.webp`} alt="Raya perfume and its illustrated box." width={640} height={640} sizes="(max-width: 700px) 150px, 230px" />
          <span>Raya</span>
        </div>
        <div className={local.notesArtwork}>
          <Screenshot src={`${ASSETS}/raya-notes.webp`} label="Raya fragrance notes"
            alt="Raya’s fragrance-note artwork: top notes of blackcurrant, lavender and mandarin orange; middle notes of orange blossom and jasmine; base notes of Madagascar vanilla, musk, cedar and ambergris."
            width={1800} height={584} />
        </div>

        <div className={local.soundIdentity}>
          <div className={local.recordArt} aria-hidden="true"><span /><span /><span /></div>
          <span>Raya’s soundtrack</span>
          <FragranceTrackPlayer track={{ name: 'Raya', slug: 'raya' }} />
        </div>
        <div className={local.soundMapping}>
          <dl className={local.musicalLayers}>
            {soundLayers.map(({ fragrance, music, description, cycles }) => <div key={music}>
              <dt><span>{fragrance}</span><span className={local.layerConnection} aria-hidden="true">↕</span><strong>{music}</strong></dt>
              <dd><MusicalLayer cycles={cycles} /><p>{description}</p></dd>
            </div>)}
          </dl>
        </div>

        <dl className={local.musicalChoices} aria-label="How I interpreted Raya’s character">
          <div><dt>Graceful pacing</dt><dd>Reflects Raya’s calm character.</dd></div>
          <div><dt>Indian classical undertones</dt><dd>Reference her cultural roots.</dd></div>
          <div><dt>Warm, blooming melodies</dt><dd>Evoke the jasmine and vanilla notes.</dd></div>
        </dl>

      </div>
      <figcaption className={styles.mediaCaption}>Raya · From scent to sound.</figcaption>
    </figure>
  );
}
