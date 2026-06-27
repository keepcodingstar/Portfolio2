'use client';

import type { ZoneId } from '@/components/AltitudeProvider';

/**
 * The single site-wide footer — the grassland "Let's talk" contact slab. Used on
 * the homepage (where it receives `goTo` and the menu smooth-scrolls the altitude
 * journey) and on every standalone route (case studies), where it falls back to
 * plain `/#zone-x` anchors back to the homepage zones. Same markup either way.
 */

const EMAIL = 'sameerkapildesigns@email.com';
const RESUME =
  'https://drive.google.com/file/d/10p_BLhpwUbNwaStiL4AJAZwFRSFM45CA/view?usp=drive_link';

type Social = { label: string; href: string; icon: keyof typeof ICONS };

const SOCIALS: Social[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sameerkapil/', icon: 'linkedin' },
  { label: 'Dribbble', href: 'https://dribbble.com/SameerKapil', icon: 'dribbble' },
  { label: 'Behance', href: 'https://www.behance.net/sameerkapil7', icon: 'behance' },
  { label: 'Email', href: `mailto:${EMAIL}`, icon: 'email' },
];

const NAV: { id: ZoneId; label: string }[] = [
  { id: 'zone-work', label: 'Works' },
  { id: 'zone-sky', label: 'About' },
];

const COLOPHON: { k: string; v: string }[] = [
  { k: 'Updated on', v: 'June 2026' },
  { k: 'Made in', v: 'India' },
  { k: 'Copyright', v: '©2026 Sameer Kapil' },
  { k: 'Location', v: 'Bengaluru, IN' },
];

type Props = {
  /** Home-page altitude scroller. When omitted (standalone routes), the brand
   *  mark and nav fall back to anchors that route back to the homepage zones. */
  goTo?: (zone: ZoneId) => void;
};

export default function SiteFooter({ goTo }: Props) {
  return (
    <footer id="zone-ground" className="zone zone-ground" aria-labelledby="ground-title">
      {/* the grassland you land on — purely decorative, sits behind the content */}
      <div className="ground-scape" aria-hidden>
        <div className="gs-grassland" />
      </div>

      {/* ─ the brand mark — pinned over the open field, above the figure ─ */}
      <div className="footer-mark">
        {goTo ? (
          <button
            type="button"
            className="footer-mark-btn"
            aria-label="Sameer Kapil — back to the top"
            onClick={() => goTo('zone-sky')}
          >
            <FooterLogo />
          </button>
        ) : (
          <a className="footer-mark-btn" href="/" aria-label="Sameer Kapil — home">
            <FooterLogo />
          </a>
        )}
      </div>

      <div className="panel wide ground-inner">
        <h2 id="ground-title" className="sr-only">
          Contact &amp; site footer
        </h2>

        {/* ─ the contact invitation — the bottom of the journey is a hello ─ */}
        <a className="footer-talk display" href={`mailto:${EMAIL}`}>
          Let&rsquo;s <span className="script">talk</span>.
        </a>

        {/* ─ socials (left) · primary nav (right) ─ */}
        <div className="footer-rail">
          <ul className="footer-socials" aria-label="Social links">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  {ICONS[s.icon]}
                </a>
              </li>
            ))}
          </ul>

          <nav className="footer-links" aria-label="Footer">
            {NAV.map((n) =>
              goTo ? (
                <button key={n.id} type="button" onClick={() => goTo(n.id)}>
                  {n.label}
                </button>
              ) : (
                <a key={n.id} href={`/#${n.id}`}>
                  {n.label}
                </a>
              ),
            )}
            <a href={RESUME} target="_blank" rel="noreferrer">
              Résumé
            </a>
          </nav>
        </div>

        {/* ─ colophon: instrument readouts on the landing strip ─ */}
        <dl className="footer-colophon">
          {COLOPHON.map((c) => (
            <div className="colo-item" key={c.k}>
              <dt className="colo-k">{c.k}</dt>
              <dd className="colo-v">{c.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </footer>
  );
}

function FooterLogo() {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      className="footer-mark-logo"
      src="/brand/sameer-logo.svg"
      alt="Sameer Kapil"
      width={60}
      height={55}
    />
  );
}

/** Inline brand glyphs (24×24, currentColor) so the footer needs no icon assets. */
const ICONS = {
  linkedin: (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  ),
  dribbble: (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false">
      <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z" />
    </svg>
  ),
  behance: (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false">
      <path d="M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.274 3.966 3.966 0 0 0-.835-.073H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false">
      <path d="M3 4a2 2 0 00-2 2v.217l11 6.5 11-6.5V6a2 2 0 00-2-2H3z" />
      <path d="M23 8.541l-11 6.5-11-6.5V18a2 2 0 002 2h18a2 2 0 002-2V8.541z" />
    </svg>
  ),
};
