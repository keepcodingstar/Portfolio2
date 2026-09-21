import type { Metadata } from 'next';
import FairPricingView from './FairPricingView';

const URL_PATH = '/work/fair-pricing';
const TITLE = 'Clarifying Prices for Fashion Shoppers';
const DESCRIPTION =
  'Designing VIRGIO’s Fair Pricing breakdown: 500K+ organic views on a customer’s post, Silver at DIGIES for a trust-building element, and company IP behind Econic Fair.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL_PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL_PATH,
    type: 'article',
    images: ['/work/fair-pricing/viral-tweet.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/work/fair-pricing/viral-tweet.jpg'],
  },
};

const CASE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'Fair Pricing',
  headline: TITLE,
  description: DESCRIPTION,
  url: `https://sameerkapil.com${URL_PATH}`,
  author: { '@type': 'Person', name: 'Sameer Kapil' },
  creator: { '@type': 'Person', name: 'Sameer Kapil' },
  about: 'Price transparency, e-commerce, product design',
  keywords: 'fair pricing, price transparency, e-commerce, Virgio, product design',
  award: 'Silver — DIGIES Awards, Best E-commerce Design, trust-building element',
} as const;

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(CASE_JSONLD) }}
      />
      <FairPricingView />
    </>
  );
}
