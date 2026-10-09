export const SAVED_PRODUCTS_KEY = 'kitchentrusted:saved-products:v1';
export const RECENT_PRODUCTS_KEY = 'kitchentrusted:recent-products:v1';
const PRODUCT_PREFERENCES_EVENT = 'kitchentrusted:product-preferences-change';

export function readProductSlugs(key) {
  if (typeof window === 'undefined') return [];

  try {
    const parsed = JSON.parse(window.localStorage.getItem(key) || '[]');
    return Array.isArray(parsed)
      ? [...new Set(parsed.map((slug) => String(slug || '').trim()).filter(Boolean))]
      : [];
  } catch {
    return [];
  }
}

export function writeProductSlugs(key, slugs) {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(key, JSON.stringify(slugs));
    window.dispatchEvent(new Event(PRODUCT_PREFERENCES_EVENT));
  } catch {
    // Keep the current session usable when browser storage is disabled or full.
  }
}

export { PRODUCT_PREFERENCES_EVENT };
