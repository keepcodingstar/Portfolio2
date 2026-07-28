import type { Metadata } from 'next';
import CheckoutView from './CheckoutView';

const URL_PATH = '/work/checkout';
const TITLE = 'Checkout, off Shopify — +2.68% conversion, 25.7% faster';
const DESCRIPTION =
  'Migrated Virgio’s revenue-critical checkout off Shopify to escape peak-load throttling, then rebuilt address and payment around one idea: show the consequence of every choice the moment it’s made.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL_PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL_PATH,
    type: 'article',
    images: ['/work/checkout/payment-desktop.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/work/checkout/payment-desktop.png'],
  },
};

const CASE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'Checkout, off Shopify',
  headline: TITLE,
  description: DESCRIPTION,
  url: `https://sameerkapil.vercel.app${URL_PATH}`,
  author: { '@type': 'Person', name: 'Sameer Kapil' },
  creator: { '@type': 'Person', name: 'Sameer Kapil' },
  about: 'Checkout UX, conversion optimisation, e-commerce',
  keywords: 'checkout design, Shopify migration, conversion, Virgio, product design',
} as const;

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(CASE_JSONLD) }}
      />
      <CheckoutView />
    </>
  );
}
