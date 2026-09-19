import type { Metadata } from 'next';
import CheckoutView from './CheckoutView';
import { checkoutTitle, story } from './checkout-content';

const URL_PATH = '/work/checkout';
const TITLE = checkoutTitle;
const DESCRIPTION = story.results.body;

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
  name: TITLE,
  headline: TITLE,
  description: DESCRIPTION,
  url: `https://sameerkapil.com${URL_PATH}`,
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
