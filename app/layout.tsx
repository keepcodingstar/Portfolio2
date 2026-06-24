import type { Metadata } from 'next';
import localFont from 'next/font/local';
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

export const metadata: Metadata = {
  title: 'Sameer Kapil — Product Designer',
  description:
    'Sameer Kapil is a product designer who designs for outcomes, not applause — checkout, pricing and trust flows that move real numbers. 500K+ users reached.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={awesomeSerif.variable}>
      <body>{children}</body>
    </html>
  );
}
