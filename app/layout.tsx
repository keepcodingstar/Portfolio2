import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Caveat } from 'next/font/google';
import './globals.css';

/**
 * Display = Awesome Serif (local, weight 400). Body = Helvetica Neue via the
 * system stack in globals.css (Helvetica Neue → Helvetica → Arial) — only the
 * Black Italic Helvetica file is on hand, unusable for body, so we lean on the
 * system face until the licensed Roman/Medium weights are dropped in.
 */
const awesomeSerif = localFont({
  src: '../public/fonts/AwesomeSerif-Regular.otf',
  weight: '400',
  variable: '--font-awesome-serif',
  display: 'swap',
});

/**
 * Script accent = Caveat. Used for exactly ONE emphasised word in the hero
 * statement (the kinetic hand-written "yes"), in ion-teal. Deliberate single-use
 * second face, not a body option.
 */
const caveat = Caveat({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-caveat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sameer Kapil — Product Designer',
  description:
    'Sameer Kapil is a product designer who designs for outcomes, not applause — checkout, pricing and trust flows that move real numbers. 500K+ users reached.',
  icons: {
    icon: '/brand/logo-mark.jpg',
    shortcut: '/brand/logo-mark.jpg',
    apple: '/brand/logo-mark.jpg',
  },
};

/**
 * Pre-paint scroll anchor. Runs synchronously at parse time — placed AFTER the
 * page markup, so #zone-sky already exists — and lands the viewport on the sky
 * zone BEFORE the first paint. That removes the visible scroll-jump from the top
 * of the document down to the sky, so the body no longer needs the opacity
 * fade-in to mask it: the page simply renders already anchored. AltitudeProvider
 * re-anchors once post-layout (after images settle) as a correction.
 */
const ANCHOR_SKY = `(function(){try{
  if('scrollRestoration' in history)history.scrollRestoration='manual';
  var el=document.getElementById('zone-sky');
  if(el){var r=el.getBoundingClientRect();
    var top=r.top+window.pageYOffset+r.height/2-window.innerHeight/2;
    window.scrollTo(0,Math.max(0,top));}
}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${awesomeSerif.variable} ${caveat.variable}`} suppressHydrationWarning>
      {/* the pre-paint script below mutates body's className (adds `preloading`)
          before React hydrates, so suppress the expected attribute mismatch here too */}
      <body suppressHydrationWarning>
        {/* Run BEFORE the page markup parses. The clouds + loader that cover the
            count, and the rule that hides the nav, are all client-side — they only
            take effect after hydration, so without this the server-rendered site
            (and the bottom nav) flash for a beat on load. `pl-cover` paints the
            opaque intro cover; `preloading` hides the nav from frame one. Both are
            cleared by <Preloader/> once the React intro has taken over.
            EVERY document load of the homepage now shows an intro (full for the
            black-hole replay, quick otherwise), so cover unconditionally; reduced
            motion is uncovered pre-paint by Preloader's layout effect.
            ONLY the home route mounts a Preloader to clear this — guard on
            pathname so the other pages aren't left covered. */}
        <script dangerouslySetInnerHTML={{ __html: "if(location.pathname==='/'){document.documentElement.classList.add('pl-cover');document.body.classList.add('preloading')}" }} />
        {children}
        <script dangerouslySetInnerHTML={{ __html: ANCHOR_SKY }} />
      </body>
    </html>
  );
}
