import Preloader from '@/components/Preloader';
import Starfield from '@/components/Starfield';
import CloudField from '@/components/CloudField'; // a few sky clouds on the descent to the ground
import AltitudeProvider from '@/components/AltitudeProvider';
import SideNav from '@/components/SideNav';
import Reveals from '@/components/Reveals';
// import TopBlackHole from '@/components/TopBlackHole'; // raymarched shader — hidden for now (perf)
import SpaceZone from '@/components/zones/SpaceZone';
import CreativeGallery from '@/components/zones/CreativeGallery';
import SkyHero from '@/components/zones/SkyHero';
import WorkZone from '@/components/zones/WorkZone';
import UIGallery from '@/components/zones/UIGallery';
import AboutProcess from '@/components/zones/AboutProcess';
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
        <SideNav />

        <main style={{ position: 'relative' }}>
          <Reveals />  {/* one [data-reveal] observer for the server-rendered zones */}
          {/* <TopBlackHole /> */}  {/* ◐ black hole — hidden for now to cut shader lag */}
          <SpaceZone />        {/* ↑ space · the creative manifesto */}
          <CreativeGallery />  {/* visual / creative gallery        */}
          <SkyHero />          {/* ◉ you, now — land here           */}
          <WorkZone />         {/* ↓ sky · the shipped work, counted */}
          <UIGallery />        {/* the screens behind the numbers   */}
          <AboutProcess />     {/* about · how I work · tools       */}
          <GroundFooter />     {/* ground · proper footer + contact  */}
        </main>
      </AltitudeProvider>
    </>
  );
}
