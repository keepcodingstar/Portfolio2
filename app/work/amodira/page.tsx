import type { Metadata } from 'next';
import AmodiraView from './AmodiraView';

const URL_PATH = '/work/amodira';
const TITLE = 'Amodira: Sound of the Scent — a perfume you feel before it arrives';
const DESCRIPTION =
  'A 0→1 fragrance brand for Virgio. Invented “Sound of the Scent” — an original song per fragrance whose treble, mids and bass mirror its top, heart and base notes. Became the most-interacted element on the PDP.';

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
  name: 'Amodira — Sound of the Scent',
  headline: TITLE,
  description: DESCRIPTION,
  url: `https://sameerkapil.vercel.app${URL_PATH}`,
  author: { '@type': 'Person', name: 'Sameer Kapil' },
  creator: { '@type': 'Person', name: 'Sameer Kapil' },
  about: 'Brand 0→1, fragrance, product design, PDP',
  keywords: 'Amodira, fragrance, brand 0 to 1, sound of the scent, Virgio, product design',
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
