import type { Metadata } from 'next';
import AmodiraView from './AmodiraView';
import { amodiraTitle, amodiraDescription } from './amodira-content';

const URL_PATH = '/work/amodira';
const TITLE = amodiraTitle;
const DESCRIPTION = amodiraDescription;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL_PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL_PATH,
    type: 'article',
    images: ['/work/amodira/raya-sound.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/work/amodira/raya-sound.png'],
  },
};

const CASE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: amodiraTitle,
  headline: TITLE,
  description: DESCRIPTION,
  url: `https://sameerkapil.com${URL_PATH}`,
  author: { '@type': 'Person', name: 'Sameer Kapil' },
  creator: { '@type': 'Person', name: 'Sameer Kapil' },
  about: 'Fragrance discovery, concept development, interaction design, AI audio creation',
  keywords: 'Amodira, fragrance, sound of the scent, Virgio, product design, usability testing, AI audio',
} as const;

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(CASE_JSONLD) }}
      />
      <AmodiraView />
    </>
  );
}
