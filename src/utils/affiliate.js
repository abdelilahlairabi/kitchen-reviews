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
