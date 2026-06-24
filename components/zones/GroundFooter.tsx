'use client';

import { useAltitude, type ZoneId } from '@/components/AltitudeProvider';

/**
 * The ground — the bottom of the descent, where the warm horizon meets earth.
 * A proper multi-column footer: brand + status, navigation back through the
 * worlds (smooth centre-scroll via the provider), contact, and the colophon.
 * Dark ink on the light, warm ground layer.
 */

const WORLDS: { id: ZoneId; label: string }[] = [
  { id: 'zone-space', label: 'Space · creative' },
  { id: 'zone-sky', label: 'Sky · the start' },
  { id: 'zone-work', label: 'Work · shipped' },
  { id: 'zone-ground', label: 'Ground · contact' },
];

export default function GroundFooter() {
  const { goTo } = useAltitude();

  return (
    <footer id="zone-ground" className="zone zone-ground" aria-labelledby="ground-title">
      {/* the grassland you finally land on — cool emerald field, an ion airglow
          along the grass line, and a swaying blade silhouette. Purely decorative,
          sits behind the content; reduced-motion stills the sway (see globals). */}
      <div className="ground-scape" aria-hidden>
        <div className="gs-haze" />
        <div className="gs-field" />
        <svg
          className="gs-grass"
          viewBox="0 0 1200 240"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* far band — pale, cool, short */}
          <path
            className="gs-far"
            d="M0,240 L0,206 L52,170 L104,206 L160,174 L216,206 L276,166 L336,206 L398,176 L460,206 L526,168 L592,206 L658,174 L724,206 L790,166 L856,206 L922,176 L988,206 L1054,168 L1120,206 L1160,178 L1200,206 L1200,240 Z"
          />
          {/* mid band — richer, taller */}
          <path
            className="gs-mid"
            d="M0,240 L0,200 L46,150 L98,200 L150,158 L210,200 L268,142 L330,200 L392,160 L454,200 L520,148 L586,200 L652,156 L720,200 L788,144 L856,200 L924,160 L990,200 L1058,150 L1126,200 L1170,162 L1200,200 L1200,240 Z"
          />
          {/* near band — deepest emerald, tallest */}
          <path
            className="gs-near"
            d="M0,240 L0,196 L40,128 L92,196 L146,138 L208,196 L268,120 L332,196 L396,140 L458,196 L524,126 L592,196 L660,136 L728,196 L796,122 L864,196 L932,140 L1000,196 L1068,128 L1136,196 L1180,144 L1200,196 L1200,240 Z"
          />
          {/* a handful of foreground blades that catch the breeze */}
          <g className="gs-tufts">
            <path className="gs-blade" d="M150,240 C146,192 158,150 152,118 C166,150 168,196 162,240 Z" />
            <path className="gs-blade" d="M430,240 C424,188 440,144 432,108 C450,146 452,194 446,240 Z" />
            <path className="gs-blade" d="M712,240 C708,196 720,150 714,120 C728,152 730,198 724,240 Z" />
            <path className="gs-blade" d="M988,240 C982,186 998,140 990,104 C1008,144 1010,192 1004,240 Z" />
          </g>
        </svg>
      </div>

      <div className="panel wide ground-inner">
        <div className="ground-cta">
          <p className="eyebrow">On the ground · roots &amp; contact</p>
          <h2 id="ground-title" className="display ground-title">
            Let&rsquo;s make the numbers <em>move</em>.
          </h2>
        </div>

        <div className="ground-cols glass glass--thick glass--react">
          <div className="ground-col brandcol">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="ground-mark" src="/brand/logo-mark.jpg" alt="" width={40} height={40} />
            <p className="ground-name serif">Sameer Kapil</p>
            <p className="ground-blurb">
              Product designer for commerce — checkout, pricing and trust flows
              that move real numbers.
            </p>
            <p className="ground-status"><span className="dot" aria-hidden /> Available for work</p>
          </div>

          <nav className="ground-col" aria-label="The worlds">
            <h3 className="ground-h">Navigate</h3>
            <ul>
              {WORLDS.map((w) => (
                <li key={w.id}>
                  <button type="button" onClick={() => goTo(w.id)}>{w.label}</button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ground-col">
            <h3 className="ground-h">Connect</h3>
            <ul>
              <li><a href="mailto:sameerkapildesigns@gmail.com">sameerkapildesigns@gmail.com<span className="arrow">↗</span></a></li>
              <li><a href="tel:+919050537614">+91 90505 37614</a></li>
              <li><a href="https://www.linkedin.com/in/sameerkapil" target="_blank" rel="noreferrer">LinkedIn<span className="arrow">↗</span></a></li>
              <li><a href="https://dribbble.com/SameerKapil" target="_blank" rel="noreferrer">Dribbble<span className="arrow">↗</span></a></li>
            </ul>
          </div>
        </div>

        <div className="colophon">
          <span>© 2026 Sameer Kapil · Bangalore, via Hisar</span>
          <span>Set in Awesome Serif &amp; Helvetica Neue</span>
          <button type="button" className="to-top" onClick={() => goTo('zone-sky')}>
            Back to the sky <span className="arrow">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
