export const isValidAmazonProductUrl = (value) => {
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();
    return url.protocol === 'https:'
      && ['amazon.com', 'www.amazon.com', 'amzn.to'].includes(hostname)
      && (hostname === 'amzn.to'
        ? /^\/[A-Z0-9]{4,}$/i.test(url.pathname)
        : /\/(?:dp|gp\/product)\/([A-Z0-9]{10})(?:[/?#]|$)/i.test(url.pathname));
  } catch {
    return false;
  }
};

export const validAmazonAffiliateUrlFilter = [
  'affiliate_url.imatch."^https://amazon[.]com/([^?#]*/)?dp/[A-Za-z0-9]{10}([/?#].*)?$"',
  'affiliate_url.imatch."^https://amazon[.]com/([^?#]*/)?gp/product/[A-Za-z0-9]{10}([/?#].*)?$"',
  'affiliate_url.imatch."^https://www[.]amazon[.]com/([^?#]*/)?dp/[A-Za-z0-9]{10}([/?#].*)?$"',
  'affiliate_url.imatch."^https://www[.]amazon[.]com/([^?#]*/)?gp/product/[A-Za-z0-9]{10}([/?#].*)?$"',
  'affiliate_url.imatch."^https://amzn[.]to/[A-Za-z0-9]{4,}([?#].*)?$"',
].join(',');

export const createAmazonVariantUrl = ({ asin, marketplace = 'amazon.com', affiliateUrl = '' }) => {
  const normalizedAsin = String(asin || '').trim().toUpperCase();
  if (!/^[A-Z0-9]{10}$/.test(normalizedAsin)) return null;

  let hostname = 'amazon.com';
  try {
    const parsedMarketplace = new URL(`https://${marketplace}`).hostname.toLowerCase();
    if (/^(?:www\.)?amazon\.[a-z.]+$/.test(parsedMarketplace)) {
      hostname = parsedMarketplace.replace(/^www\./, '');
    }
  } catch {
    // Use the supported default marketplace when the source value is malformed.
  }

  const url = new URL(`/dp/${normalizedAsin}`, `https://${hostname}`);
  try {
    const sourceUrl = new URL(affiliateUrl);
    const trackingTag = sourceUrl.searchParams.get('tag');
    if (trackingTag) url.searchParams.set('tag', trackingTag);
  } catch {
    // A variant can still link to its exact product when the main URL is unavailable.
  }

  return url.toString();
};
