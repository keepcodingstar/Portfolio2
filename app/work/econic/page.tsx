import type { Metadata } from 'next';
import EconicView from './EconicView';
import { econicTitle, econicDescription } from './econic-content';

const URL_PATH = '/work/econic';
const TITLE = econicTitle;
const DESCRIPTION = econicDescription;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL_PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL_PATH,
    type: 'article',
    images: ['/work/econic/thumb.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/work/econic/thumb.jpg'],
  },
};

const CASE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: TITLE,
  headline: TITLE,
  description: DESCRIPTION,
  url: `https://sameerkapil.com${URL_PATH}`,
  author: { '@type': 'Person', name: 'Sameer Kapil' },
  creator: { '@type': 'Person', name: 'Sameer Kapil' },
  about: 'Campaign UI, price transparency, e-commerce',
  keywords: 'Econic Fair, cost-to-make, campaign UI, Virgio, product design',
  award: 'e4m RetailEX Awards 2026 — Best Brand Campaign of the Year',
} as const;

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(CASE_JSONLD) }}
      />
      <EconicView />
    </>
  );
}
