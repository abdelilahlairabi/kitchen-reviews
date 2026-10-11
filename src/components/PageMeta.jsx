import { useLocation } from 'react-router-dom';
import { resolveSiteUrl } from '../utils/siteUrl.js';

const siteOrigin = resolveSiteUrl(import.meta.env.VITE_SITE_URL);

function getCanonicalUrl(location, canonicalPath) {
  if (canonicalPath) return new URL(canonicalPath, siteOrigin).href;

  // Keep pagination pages distinct while avoiding duplicate URLs for sort/filter state.
  const page = Number(new URLSearchParams(location.search).get('page'));
  const pathname = location.pathname.replace(/\/+$/, '') || '/';
  const path = page > 1 ? `${pathname}?page=${page}` : pathname;
  return new URL(path, siteOrigin).href;
}

export default function PageMeta({
  title,
  description,
  robots = 'index,follow',
  canonicalPath,
  type = 'website',
}) {
  const location = useLocation();
  const canonicalUrl = getCanonicalUrl(location, canonicalPath);

  // React 19 hoists title/meta/link tags to <head> for both client rendering and SSR.
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="KitchenTrusted" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
  );
}
