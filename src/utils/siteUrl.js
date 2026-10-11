export const DEFAULT_SITE_URL = 'https://kitchentrustedpicks.com';

const LEGACY_SITE_URLS = new Set([
  'https://kitchen-reviews-seven.vercel.app',
]);

export function resolveSiteUrl(configuredUrl) {
  const normalizedUrl = typeof configuredUrl === 'string'
    ? configuredUrl.trim().replace(/\/+$/, '')
    : '';

  if (!normalizedUrl || LEGACY_SITE_URLS.has(normalizedUrl.toLowerCase())) {
    return DEFAULT_SITE_URL;
  }

  return normalizedUrl;
}
