import type { Metadata } from 'next';
import EconicView from './EconicView';

const URL_PATH = '/work/econic';
const TITLE = 'Econic 2025 — preview the sale before it started, 50× revenue when it did';
const DESCRIPTION =
  'Virgio’s 2nd-anniversary “anti-sale”: every garment sold at its cost to make. A Preview toggle let shoppers see every sale price days early. Won Best Brand Campaign of the Year at the e4m RetailEX Awards 2026.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL_PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL_PATH,
    type: 'article',
    images: ['/work/econic/award-retailex.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/work/econic/award-retailex.png'],
  },
};

const CASE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'Econic 2025',
  headline: TITLE,
  description: DESCRIPTION,
  url: `https://sameerkapil.vercel.app${URL_PATH}`,
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
