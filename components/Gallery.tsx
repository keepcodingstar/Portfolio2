import Image from 'next/image';
import Link from 'next/link';

/**
 * A reusable portfolio gallery grid. Tiles are gradient placeholders tinted to
 * the band they live in (`space` = deep cosmos → ion-cyan, `ground` = cool azure
 * → ice horizon), each labelled and ready to swap a real image into via `src`. A few
 * tiles span two columns/rows for a masonry rhythm. Caption + lift are CSS-only,
 * so this stays a server component and is reduced-motion safe.
 *
 * Drop real images into /public/gallery/** and add `src` (+ `alt`) to an item.
 */

export type GalleryItem = {
  title: string;
  meta?: string;
  span?: 'wide' | 'tall' | 'big';
  src?: string;
  alt?: string;
  href?: string; // when set, the tile links to a full case study
};

const PALETTES: Record<'space' | 'ground', string[]> = {
  // deep cosmos rising into ionized cyan / aurora-teal
  space: [
    'linear-gradient(135deg, #050d22 0%, #2bb6d6 100%)',
    'linear-gradient(135deg, #08142e 0%, #5ad1ee 100%)',
    'linear-gradient(135deg, #0a1733 0%, #1fc6a6 100%)',
    'linear-gradient(135deg, #060f24 0%, #2f86d6 100%)',
    'linear-gradient(135deg, #0d1c3e 0%, #58c7e8 100%)',
    'linear-gradient(135deg, #07142b 0%, #3fa9c8 100%)',
  ],
  // clear azure settling into a cool, ice-bright horizon
  ground: [
    'linear-gradient(135deg, #2a4f82 0%, #8ec8f1 100%)',
    'linear-gradient(135deg, #2f86d6 0%, #cfe6f4 100%)',
    'linear-gradient(135deg, #1f5fa8 0%, #5ad1ee 100%)',
    'linear-gradient(135deg, #3f7ab8 0%, #bcdcf0 100%)',
    'linear-gradient(135deg, #1fc6a6 0%, #c2e2f7 100%)',
    'linear-gradient(135deg, #2bb6d6 0%, #e9f5fd 100%)',
  ],
};

export default function Gallery({
  items,
  palette = 'space',
}: {
  items: GalleryItem[];
  palette?: 'space' | 'ground';
}) {
  const tones = PALETTES[palette];
  return (
    <ul className="gallery">
      {items.map((it, i) => (
        <li
          key={it.title}
          className={`tile${it.span ? ` ${it.span}` : ''}${it.href ? ' tile-link' : ''}`}
          tabIndex={it.href ? undefined : 0}
        >
          {it.src ? (
            <Image
              className="tile-img"
              src={it.src}
              alt={it.alt ?? it.title}
              fill
              sizes="(max-width: 680px) 90vw, 30vw"
            />
          ) : (
            <span
              className={`tile-ph${palette === 'space' ? ' tile-ph-seamless' : ''}`}
              aria-hidden
              style={palette === 'space' ? undefined : { background: tones[i % tones.length] }}
            >
              <span className="tile-num">{String(i + 1).padStart(2, '0')}</span>
            </span>
          )}
          <span className="tile-cap">
            <span className="tile-title">{it.title}</span>
            {it.meta && <span className="tile-meta">{it.meta}</span>}
            {it.href && <span className="tile-go" aria-hidden>→</span>}
          </span>
          {it.href && (
            <Link
              href={it.href}
              className="tile-stretch"
              aria-label={`${it.title} — read case study`}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
