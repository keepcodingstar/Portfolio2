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
export default function Home() {
  return (
    <>
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
