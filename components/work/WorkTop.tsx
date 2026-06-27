'use client';

import Link from 'next/link';

type NavLink = { href: string; label: string; cta?: boolean };

/**
 * The floating glass top bar shared by every /work page: a back affordance on
 * the left, light links on the right, all riding the frosted `.glass` material.
 * The cta link (Contact) smooth-scrolls to the footer at the bottom of the page.
 */
export default function WorkTop({
  back,
  links = [],
}: {
  back: { href: string; label: string };
  links?: NavLink[];
}) {
  return (
    <header className="work-top">
      <div className="work-top-inner glass">
        <Link href={back.href} className="work-back">
          <span className="ar" aria-hidden>←</span>
          {back.label}
        </Link>
        <nav className="work-top-links">
          {links.map((l) =>
            l.cta ? (
              <a
                key={l.href + l.label}
                href={l.href}
                className="cta"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth',
                  });
                }}
              >
                {l.label}
              </a>
            ) : (
              <Link key={l.href + l.label} href={l.href}>
                {l.label}
              </Link>
            ),
          )}
        </nav>
      </div>
    </header>
  );
}
