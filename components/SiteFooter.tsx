'use client';

import { useState } from 'react';

/**
 * The grassland footer, ported off the homepage for standalone routes (case
 * studies). Same markup and classes as the homepage GroundFooter, but with no
 * dependence on AltitudeProvider — menu items are plain anchors back to the
 * homepage zones instead of goTo() scroll calls.
 */

const MENU: { href: string; label: string }[] = [
  { href: '/#zone-work', label: 'Work' },
  { href: '/#zone-space', label: 'Creative' },
  { href: '/#zone-sky', label: 'About' },
  { href: '/#zone-ground', label: 'Contact' },
];

const SOCIALS: { label: string; href: string; note?: string }[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sameerkapil' },
  { label: 'Dribbble', href: 'https://dribbble.com/SameerKapil' },
  { label: 'Email', href: 'mailto:sameerkapildesigns@gmail.com' },
  { label: 'Behance', href: '#', note: 'soon' },
];

export default function SiteFooter() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <footer id="zone-ground" className="zone zone-ground" aria-labelledby="ground-title">
      <div className="ground-scape" aria-hidden>
        <div className="gs-grassland" />
      </div>

      <div className="footer-mark">
        <a className="footer-mark-btn" href="/" aria-label="Sameer Kapil — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="footer-mark-logo"
            src="/brand/sameer-logo.svg"
            alt="Sameer Kapil"
            width={60}
            height={55}
          />
        </a>
      </div>

      <div className="panel wide ground-inner">
        <h2 id="ground-title" className="sr-only">
          Contact &amp; site footer
        </h2>

        <div className="footer-cols">
          <nav className="footer-col" aria-label="Menu">
            <h3 className="footer-h">Menu</h3>
            <ul>
              {MENU.map((m) => (
                <li key={m.href}>
                  <a href={m.href}>{m.label}</a>
                </li>
              ))}
              <li>
                <a href="/black-hole">Void</a>
              </li>
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Socials">
            <h3 className="footer-h">Socials</h3>
            <ul>
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
                    aria-disabled={s.note === 'soon' || undefined}
                  >
                    {s.label}
                    {s.note ? <span className="footer-note"> ({s.note})</span> : null}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col footer-news">
            <h3 className="footer-h">Newsletter</h3>
            <p className="footer-news-lede">
              Subscribe to get updates on new projects and insights
            </p>
            <form
              className="footer-sub"
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setSent(true);
              }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                aria-label="Email address"
              />
              <button type="submit" aria-label="Subscribe">
                {sent ? 'Subscribed' : 'Subscribe'} <span className="arrow">→</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
