import { useCallback, useEffect, useState } from 'react';
import { PRODUCT_PREFERENCES_EVENT, readProductSlugs, writeProductSlugs } from '../utils/productPreferences';

export default function useProductSlugs(storageKey, maximumItems = 12) {
  const [slugs, setSlugs] = useState([]);

  const refresh = useCallback(() => setSlugs(readProductSlugs(storageKey).slice(0, maximumItems)), [maximumItems, storageKey]);

  useEffect(() => {
    refresh();
    window.addEventListener('storage', refresh);
    window.addEventListener(PRODUCT_PREFERENCES_EVENT, refresh);
    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener(PRODUCT_PREFERENCES_EVENT, refresh);
    };
  }, [refresh]);

  const update = useCallback((nextSlugs) => {
    const uniqueSlugs = [...new Set(nextSlugs.map((slug) => String(slug || '').trim()).filter(Boolean))]
      .slice(0, maximumItems);
    setSlugs(uniqueSlugs);
    writeProductSlugs(storageKey, uniqueSlugs);
  }, [maximumItems, storageKey]);

  const addSlug = useCallback((slug) => {
    const normalizedSlug = String(slug || '').trim();
    if (!normalizedSlug) return;
    update([normalizedSlug, ...readProductSlugs(storageKey).filter((savedSlug) => savedSlug !== normalizedSlug)]);
  }, [storageKey, update]);

  const toggleSlug = useCallback((slug) => {
    const normalizedSlug = String(slug || '').trim();
    if (!normalizedSlug) return;
    const currentSlugs = readProductSlugs(storageKey);
    update(currentSlugs.includes(normalizedSlug)
      ? currentSlugs.filter((savedSlug) => savedSlug !== normalizedSlug)
      : [normalizedSlug, ...currentSlugs]);
  }, [storageKey, update]);

  const removeSlug = useCallback((slug) => {
    update(readProductSlugs(storageKey).filter((savedSlug) => savedSlug !== slug));
  }, [storageKey, update]);

  const clear = useCallback(() => update([]), [update]);

  return { slugs, addSlug, toggleSlug, removeSlug, clear };
}
