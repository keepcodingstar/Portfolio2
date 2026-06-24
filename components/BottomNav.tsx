'use client';

import { useAltitude, type ZoneId } from '@/components/AltitudeProvider';

/**
 * The navigation, as a centred glass dock at the FOOT of the screen. It still
 * reads as an ALTIMETER — the four worlds laid out left→right as a horizontal
 * altitude scale (Space · creative → Ground · contact) with the active world lit
 * by an ion dot — and snaps to any of them via the centre-anchored scroll.
 *
 * Built on the cheap `.glass` material (CSS frost), NOT the refractive
 * <GlassSurface> SVG filter: a wide bar over the live cloud canvas would re-run a
 * url() backdrop-filter every frame (see DESIGN.md "Backdrop-Cost Rule"). A
 * bottom bar is also mobile-native, so unlike the old side rail it stays visible
 * on phones.
 */

const STOPS: { id: ZoneId; label: string; sub: string }[] = [
  { id: 'zone-space', label: 'Space', sub: 'Creative' },
  { id: 'zone-sky', label: 'Sky', sub: 'You' },
  { id: 'zone-work', label: 'Work', sub: 'Shipped' },
  { id: 'zone-ground', label: 'Ground', sub: 'Contact' },
];

export default function BottomNav() {
  const { active, goTo } = useAltitude();

  return (
    <div className="navbar glass glass--react" aria-label="Site">
      <a
        className="navbar-brand"
        href="#zone-sky"
        aria-label="Sameer Kapil — home"
        onClick={(e) => {
          e.preventDefault();
          goTo('zone-sky');
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/logo-mark.jpg" alt="" width={30} height={30} aria-hidden />
      </a>

      <span className="navbar-divider" aria-hidden />

      <nav className="nav-stops" aria-label="Altitude">
        {STOPS.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`nav-stop${active === s.id ? ' is-active' : ''}`}
            aria-current={active === s.id}
            onClick={() => goTo(s.id)}
          >
            <span className="nav-dot" aria-hidden />
            <span className="nav-label">{s.label}</span>
            {/* plain-word meaning, revealed above the dock on hover */}
            <span className="nav-sub" aria-hidden>
              {s.sub}
            </span>
          </button>
        ))}
      </nav>

      <span className="navbar-divider" aria-hidden />

      {/* Route link (not a zone) — the standalone WebGL black-hole page. */}
      <a className="nav-stop nav-route" href="/black-hole" aria-label="Black hole — WebGL experiment">
        <span className="nav-dot" aria-hidden />
        <span className="nav-label">Void</span>
        <span className="nav-sub" aria-hidden>
          Shader
        </span>
      </a>

      <a
        className="navbar-cta"
        href="mailto:sameerkapildesigns@gmail.com"
        aria-label="Available for work — email Sameer"
      >
        <span className="navbar-pulse" aria-hidden />
      </a>
    </div>
  );
}
