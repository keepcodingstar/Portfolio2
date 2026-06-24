'use client';

import { useRef } from 'react';
import LaserFlow from '@/components/LaserFlow';
import RevealBody from '@/components/RevealBody';

/**
 * Standalone showcase for the LaserFlow effect — its own dark stage, kept off
 * the light editorial homepage. The beam runs behind a card, and moving the
 * pointer reveals a soft glow through a radial mask on the foreground layer.
 */
export default function LaserFlowPage() {
  const revealRef = useRef<HTMLDivElement>(null);

  return (
    <main
      style={{
        height: '100dvh',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#120F17',
      }}
      onMouseMove={e => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const el = revealRef.current;
        if (el) {
          el.style.setProperty('--mx', `${x}px`);
          el.style.setProperty('--my', `${y + rect.height * 0.5}px`);
        }
      }}
      onMouseLeave={() => {
        const el = revealRef.current;
        if (el) {
          el.style.setProperty('--mx', '-9999px');
          el.style.setProperty('--my', '-9999px');
        }
      }}
    >
      <RevealBody />
      <LaserFlow horizontalBeamOffset={0.1} verticalBeamOffset={0.0} color="#FF79C6" />

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(86%, 40rem)',
          padding: '3rem 2.5rem',
          backgroundColor: 'rgba(18, 15, 23, 0.6)',
          backdropFilter: 'blur(6px)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 121, 198, 0.45)',
          color: 'white',
          textAlign: 'center',
          zIndex: 6,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: '0.75rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            opacity: 0.6,
          }}
        >
          React Bits · WebGL
        </p>
        <h1 style={{ margin: '0.75rem 0 0.5rem', fontSize: '2rem', fontWeight: 600 }}>LaserFlow</h1>
        <p style={{ margin: 0, opacity: 0.7, fontSize: '0.95rem', lineHeight: 1.5 }}>
          Move your pointer across the stage — the fog tilts toward it and the beam reveals through the mask.
        </p>
      </div>

      {/* Foreground reveal layer: a radial mask follows the pointer */}
      <div
        ref={revealRef}
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 5,
          pointerEvents: 'none',
          mixBlendMode: 'lighten',
          opacity: 0.35,
          background: 'radial-gradient(circle at 50% 30%, #FF79C6 0%, transparent 60%)',
          ['--mx' as string]: '-9999px',
          ['--my' as string]: '-9999px',
          WebkitMaskImage:
            'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
          maskImage:
            'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
        }}
      />
    </main>
  );
}
