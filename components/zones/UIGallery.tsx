import Gallery, { type GalleryItem } from '@/components/Gallery';

/**
 * A gallery of shipped product UI in the descent band — the screens behind the
 * numbers in WorkZone. Warm "ground" palette. Placeholder tiles for now; swap
 * real screenshots via `src` on each item.
 */

const ITEMS: GalleryItem[] = [
  { title: 'Checkout, rebuilt', meta: 'Shopify → in-house', span: 'big', href: '/work/checkout' },
  { title: 'Fair Pricing Widget', meta: 'Now company IP', href: '/work/fair-pricing' },
  { title: 'Auth & sign-in', meta: 'Kwikpass → Shiprocket', span: 'tall' },
  { title: 'Cart & offer widgets', meta: 'Amodira' },
  { title: 'Pricing surfaces', meta: 'Trust & clarity', span: 'wide' },
  { title: 'Dashboard', meta: 'Merchant tooling' },
];

export default function UIGallery() {
  return (
    <section className="zone band band-ground" aria-labelledby="ui-title">
      <div className="panel wide">
        <div className="band-head" data-reveal>
          <h2 id="ui-title" className="display band-title">
            What the numbers actually looked like.
          </h2>
          <p className="band-lede">
            The shipped interfaces behind the metrics — checkout, pricing, auth
            and the surfaces where a percentage point is real money.
          </p>
        </div>
        <Gallery items={ITEMS} palette="ground" />
      </div>
    </section>
  );
}
