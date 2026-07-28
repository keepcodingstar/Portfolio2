import type { Metadata } from 'next';
import WorkHub from './WorkHub';

export const metadata: Metadata = {
  title: 'Work — Selected case studies',
  description:
    'Selected product-design work by Sameer Kapil, 2021–2025. Checkout, pricing and trust flows where a single percentage point is real money.',
  alternates: { canonical: '/work' },
  openGraph: {
    title: 'Work — Sameer Kapil',
    description:
      'Selected product-design case studies: Checkout off Shopify, Fair Pricing, Econic 2025, Amodira.',
    url: '/work',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Work — Sameer Kapil',
    description:
      'Selected product-design case studies: Checkout off Shopify, Fair Pricing, Econic 2025, Amodira.',
  },
};

export default function Page() {
  return <WorkHub />;
}
