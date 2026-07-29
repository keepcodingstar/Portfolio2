import type { MetadataRoute } from 'next';

const SITE_URL = 'https://sameerkapil.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = [
    { path: '/', priority: 1.0, changeFrequency: 'monthly' as const },
    { path: '/work', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/work/fair-pricing', priority: 0.9, changeFrequency: 'yearly' as const },
    { path: '/work/checkout', priority: 0.8, changeFrequency: 'yearly' as const },
    { path: '/work/econic', priority: 0.8, changeFrequency: 'yearly' as const },
    { path: '/work/amodira', priority: 0.7, changeFrequency: 'yearly' as const },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
