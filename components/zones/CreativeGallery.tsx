import Gallery, { type GalleryItem } from '@/components/Gallery';

/**
 * A visual gallery in the SPACE band — the creative experiments and explorations
 * that live above the work. Sits between the deep-space manifesto and the sky.
 * Placeholder tiles for now; swap real images via `src` on each item.
 */

const ITEMS: GalleryItem[] = [
  { title: 'Sound of the Scent', meta: 'Audio interaction · perfume PDP', span: 'big' },
  { title: 'ZERO — brand & app', meta: 'Circular fashion · 0→1' },
  { title: 'Eco-nic Fair', meta: 'Campaign system · Amodira', span: 'tall' },
  { title: 'Type studies', meta: 'Editorial · display' },
  { title: 'Motion explorations', meta: 'Micro-interactions', span: 'wide' },
  { title: '3D & material', meta: 'Glass · light · depth' },
  { title: 'Poster series', meta: 'Personal' },
];

export default function CreativeGallery() {
  return (
    <section className="zone band band-space" aria-labelledby="creative-title">
      <div className="panel wide">
        <div className="band-head" data-reveal>
          <p className="eyebrow">In orbit · visual work</p>
          <h2 id="creative-title" className="display band-title">
            Built to be <em>felt</em>.
          </h2>
          <p className="band-lede">
            Experiments, brand worlds and motion — the side of the practice that
            isn&rsquo;t chasing a conversion rate.
          </p>
        </div>
        <Gallery items={ITEMS} palette="space" />
      </div>
    </section>
  );
}
