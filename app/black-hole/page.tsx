'use client';

import BlackHoleLaser from '@/components/BlackHoleLaser';
import RevealBody from '@/components/RevealBody';

/**
 * The LaserFlow light wrapped around a dark circle — an accretion ring black
 * hole. Its own black stage, kept off the light editorial homepage.
 */
export default function BlackHolePage() {
  return (
    <main style={{ height: '100dvh', position: 'relative', overflow: 'hidden', background: '#000' }}>
      <RevealBody />
      <BlackHoleLaser color="#f0c886" ringRadius={0.26} thickness={0.05} wispIntensity={7} flowSpeed={0.25} fogIntensity={2} />

      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '7%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          color: 'white',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <p style={{ margin: 0, fontSize: '0.7rem', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.5 }}>
          LaserFlow · wrapped
        </p>
        <h1 style={{ margin: '0.5rem 0 0', fontSize: '1.5rem', fontWeight: 600, opacity: 0.9 }}>Event Horizon</h1>
      </div>
    </main>
  );
}
