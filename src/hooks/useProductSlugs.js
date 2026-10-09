import { useCallback, useSyncExternalStore } from 'react';
import {
  getProductSlugSnapshot,
  getServerProductSlugSnapshot,
  readProductSlugs,
  subscribeToProductPreferences,
  writeProductSlugs,
} from '../utils/productPreferences';

export default function useProductSlugs(storageKey, maximumItems = 12) {
  const snapshot = useSyncExternalStore(
    subscribeToProductPreferences,
    () => getProductSlugSnapshot(storageKey, maximumItems),
    getServerProductSlugSnapshot,
  );

  const update = useCallback((nextSlugs) => {
    const uniqueSlugs = [...new Set(nextSlugs.map((slug) => String(slug || '').trim()).filter(Boolean))]
      .slice(0, maximumItems);
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

  return { ...snapshot, addSlug, toggleSlug, removeSlug, clear };
}
