'use client';

import { useEffect, useState } from 'react';

/**
 * A floating glass island — a frosted, rounded nav bar that hovers over the
 * page rather than sitting flush at the top. Real glassmorphism: it borrows the
 * blue sky behind the hero through backdrop-blur. It tightens its frost once you
 * scroll past the sky onto the paper so the links stay legible.
 */

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
];

export default function GlassNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="gn-wrap">
      <nav className={`gn${scrolled ? ' is-scrolled' : ''}`} aria-label="Primary">
        <a className="gn-brand" href="#top" aria-label="Sameer Kapil — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="gn-mark" src="/brand/logo-mark.jpg" alt="" width={28} height={28} aria-hidden />
          <span className="gn-name">Sameer Kapil</span>
        </a>

        <ul className="gn-links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>

        <a className="gn-cta" href="mailto:sameerkapildesigns@gmail.com">
          <span className="gn-pulse" aria-hidden />
          <span className="gn-cta-text">Available</span>
        </a>
      </nav>
    </div>
  );
}
