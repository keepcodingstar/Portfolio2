'use client';

import { useAltitude } from '@/components/AltitudeProvider';
import SiteFooter from '@/components/SiteFooter';

/**
 * The homepage's ground zone. Renders the shared site-wide footer, wired to the
 * altitude scroller so the menu smooth-scrolls the journey instead of routing.
 */
export default function GroundFooter() {
  const { goTo } = useAltitude();
  return <SiteFooter goTo={goTo} />;
}
