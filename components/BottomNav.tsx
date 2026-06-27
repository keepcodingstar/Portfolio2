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

const STOPS: { id: ZoneId; label: string }[] = [
  { id: 'zone-space', label: 'About Me' },
  { id: 'zone-sky', label: 'Home' },
  { id: 'zone-work', label: 'My Work' },
  { id: 'zone-ground', label: 'Contact' },
];

export default function BottomNav() {
  const { active, goTo } = useAltitude();

  return (
    <div
      className={`navbar glass glass--react${active === 'zone-ground' ? ' is-tucked' : ''}`}
      aria-label="Site"
    >
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
          </button>
        ))}
      </nav>
    </div>
  );
}
