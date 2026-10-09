export const SAVED_PRODUCTS_KEY = 'kitchentrusted:saved-products:v1';
export const RECENT_PRODUCTS_KEY = 'kitchentrusted:recent-products:v1';
const PRODUCT_PREFERENCES_EVENT = 'kitchentrusted:product-preferences-change';
const sessionValues = new Map();
const snapshots = new Map();
const EMPTY_SLUGS = [];
const SERVER_SNAPSHOT = { slugs: EMPTY_SLUGS, isReady: false };

function parseSlugs(value) {
  try {
    const parsed = JSON.parse(value || '[]');
    return Array.isArray(parsed)
      ? [...new Set(parsed.map((slug) => String(slug || '').trim()).filter(Boolean))]
      : [];
  } catch {
    return [];
  }
}

export function readProductSlugs(key) {
  if (typeof window === 'undefined') return [];
  if (sessionValues.has(key)) return [...sessionValues.get(key)];
  try {
    return parseSlugs(window.localStorage.getItem(key));
  } catch {
    return [];
  }
}

export function writeProductSlugs(key, slugs) {
  if (typeof window === 'undefined') return;
  const normalizedSlugs = [...new Set(slugs.map((slug) => String(slug || '').trim()).filter(Boolean))];
  sessionValues.set(key, normalizedSlugs);
  try {
    window.localStorage.setItem(key, JSON.stringify(normalizedSlugs));
  } catch {
    // Keep the current session usable when browser storage is disabled or full.
  }
  window.dispatchEvent(new CustomEvent(PRODUCT_PREFERENCES_EVENT, { detail: { key } }));
}

export function getProductSlugSnapshot(key, maximumItems) {
  if (typeof window === 'undefined') return SERVER_SNAPSHOT;
  const cacheKey = `${key}:${maximumItems}`;
  let rawValue;
  try {
    rawValue = window.localStorage.getItem(key) || '';
  } catch {
    rawValue = '';
  }
  const sessionValue = sessionValues.get(key);
  const cacheValue = sessionValue ? JSON.stringify(sessionValue) : rawValue;
  const cached = snapshots.get(cacheKey);
  if (cached?.rawValue === cacheValue) return cached.snapshot;

  const snapshot = {
    slugs: (sessionValue || parseSlugs(rawValue)).slice(0, maximumItems),
    isReady: true,
  };
  snapshots.set(cacheKey, { rawValue: cacheValue, snapshot });
  return snapshot;
}

export function getServerProductSlugSnapshot() {
  return SERVER_SNAPSHOT;
}

export function subscribeToProductPreferences(onChange) {
  if (typeof window === 'undefined') return () => {};
  const onStorage = (event) => {
    if (event.key) sessionValues.delete(event.key);
    else sessionValues.clear();
    onChange();
  };
  window.addEventListener('storage', onStorage);
  window.addEventListener(PRODUCT_PREFERENCES_EVENT, onChange);
  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(PRODUCT_PREFERENCES_EVENT, onChange);
  };
}

export { PRODUCT_PREFERENCES_EVENT };
