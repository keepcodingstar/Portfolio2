import type { Metadata } from 'next';
import Preloader from '@/components/Preloader';
import Starfield from '@/components/Starfield';
import CloudField from '@/components/CloudField'; // a few sky clouds on the descent to the ground
import AltitudeProvider from '@/components/AltitudeProvider';
import BottomNav from '@/components/BottomNav';
import Reveals from '@/components/Reveals';
import GlassLight from '@/components/GlassLight';
import TopBlackHole from '@/components/TopBlackHole'; // small tilted black hole at the apex
import SpaceZone from '@/components/zones/SpaceZone';
import SkyHero from '@/components/zones/SkyHero';
import WorkZone from '@/components/zones/WorkZone';
import ProcessThinking from '@/components/zones/ProcessThinking';
import GroundFooter from '@/components/zones/GroundFooter';

/**
 * One continuous altitude journey, in natural top→bottom document order so
 * reading is never backwards. The page loads anchored at the SKY (handled by
 * AltitudeProvider): scrolling up rises into space (the creative side),
 * scrolling down descends through the colours of the sky to the ground.
 */
export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

const PERSON_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sameer Kapil',
  alternateName: ['Sameer UX', 'Sameer Kapil Designs', 'Sameer Kapil Portfolio'],
  url: 'https://sameerkapil.com',
  image: 'https://sameerkapil.com/brand/logo.jpg',
  jobTitle: 'Product Designer',
  worksFor: { '@type': 'Organization', name: 'Virgio' },
  description:
    'Product designer working on checkout, pricing and trust flows — outcomes over applause.',
  disambiguatingDescription:
    'Product designer (UX/UI) at Virgio. Not to be confused with Kapil Sharma or the Kapil Sharma Show.',
  knowsAbout: [
    'Product Design',
    'UX Design',
    'UI Design',
    'Checkout UX',
    'Pricing UX',
    'Design Systems',
    'Interaction Design',
    'Conversion Optimisation',
  ],
  sameAs: [
    'https://www.linkedin.com/in/sameerkapil/',
    'https://dribbble.com/SameerKapil',
    'https://www.behance.net/sameerkapil7',
  ],
} as const;

const WEBSITE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Sameer Kapil',
  alternateName: ['Sameer UX', 'Sameer Kapil Designs', 'Sameer Kapil Portfolio'],
  url: 'https://sameerkapil.com',
  inLanguage: 'en',
  publisher: { '@type': 'Person', name: 'Sameer Kapil' },
} as const;

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSONLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSONLD) }}
      />
      <Preloader />

      {/* fixed atmospheric layers, altitude-gated by CSS vars */}
      <Starfield />
      {/* a sparse handful of clouds scattered down the sky→ground descent */}
      <CloudField className="cloudfield" />

      <AltitudeProvider>
        <BottomNav />

        <main style={{ position: 'relative' }}>
          <Reveals />  {/* one [data-reveal] observer for the server-rendered zones */}
          <GlassLight />  {/* pointer-tracked specular light on .glass--react panels */}
          <TopBlackHole />  {/* ◐ small tilted black hole at the apex */}
          <SpaceZone />        {/* ↑ space · the beyond-the-work intro */}
          <SkyHero />          {/* ◉ you, now — land here           */}
          <WorkZone />         {/* ↓ sky · the shipped work, counted */}
          <ProcessThinking />  {/* sky · process — a way of thinking */}
          <GroundFooter />     {/* ground · proper footer + contact  */}
        </main>
      </AltitudeProvider>
    </>
  );
}
