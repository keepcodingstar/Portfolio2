'use client';

import GlassSurface from '@/components/GlassSurface';
import { useAltitude, type ZoneId } from '@/components/AltitudeProvider';

/**
 * The navigation, moved off the top and onto the left edge as a floating glass
 * column — built from the in-repo <GlassSurface> (real refractive glass). It
 * doubles as an ALTIMETER: it reads which world you're in and lets you snap to
 * any of them. Space (creative) at the top, Sky (you) at the hinge, Work below,
 * Ground at the bottom — the same vertical order as the page itself.
 */

const STOPS: { id: ZoneId; label: string; sub: string }[] = [
  { id: 'zone-space', label: 'Space', sub: 'Creative' },
  { id: 'zone-sky', label: 'Sky', sub: 'You' },
  { id: 'zone-work', label: 'Work', sub: 'Shipped' },
  { id: 'zone-ground', label: 'Ground', sub: 'Contact' },
];

export default function SideNav() {
  const { active, goTo } = useAltitude();

  return (
    <div className="sidenav-wrap">
      <GlassSurface
        width={84}
        height="auto"
        borderRadius={42}
        blur={11}
        backgroundOpacity={0.5}
        saturation={1.6}
        className="sidenav-glass"
      >
        <div className="sidenav-inner">
          <a className="sidenav-brand" href="#zone-sky" aria-label="Sameer Kapil — home"
             onClick={(e) => { e.preventDefault(); goTo('zone-sky'); }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-mark.jpg" alt="" width={34} height={34} aria-hidden />
          </a>

          <nav className="sidenav-stops" aria-label="Altitude">
            {STOPS.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`stop${active === s.id ? ' is-active' : ''}`}
                aria-current={active === s.id}
                onClick={() => goTo(s.id)}
              >
                <span className="stop-dot" aria-hidden />
                <span className="stop-label">{s.label}</span>
              </button>
            ))}
          </nav>

          {/* Route link (not a zone) — the standalone WebGL black-hole page. */}
          <a className="stop sidenav-route" href="/black-hole" aria-label="Black hole — WebGL experiment">
            <span className="stop-dot" aria-hidden />
            <span className="stop-label">Void</span>
          </a>

          <a className="sidenav-cta" href="mailto:sameerkapildesigns@gmail.com" aria-label="Available for work — email Sameer">
            <span className="sidenav-pulse" aria-hidden />
          </a>
        </div>
      </GlassSurface>
    </div>
  );
}
