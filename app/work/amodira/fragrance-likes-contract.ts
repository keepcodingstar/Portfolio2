import { fragrances } from './amodira-content';

export type FragranceSlug = (typeof fragrances)[number]['slug'];
export type LikeCounts = Record<FragranceSlug, number>;
export type LikesSnapshot = { liked: FragranceSlug[]; counts: LikeCounts | null };

export const fragranceSlugs = fragrances.map(({ slug }) => slug);
export const emptyLikeCounts = (): LikeCounts => Object.fromEntries(fragranceSlugs.map((slug) => [slug, 0])) as LikeCounts;
export const isFragranceSlug = (value: unknown): value is FragranceSlug => typeof value === 'string' && fragranceSlugs.some((slug) => slug === value);
export const isVisitId = (value: unknown): value is string => typeof value === 'string' && /^[a-f\d]{8}-[a-f\d]{4}-4[a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/i.test(value);
