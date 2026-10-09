import { Heart } from 'lucide-react';
import useProductSlugs from '../hooks/useProductSlugs';
import { SAVED_PRODUCTS_KEY } from '../utils/productPreferences';

export default function SaveProductButton({ product, className = '' }) {
  const { slugs, toggleSlug } = useProductSlugs(SAVED_PRODUCTS_KEY, 24);
  const isSaved = slugs.includes(product.slug);

  return (
    <button
      type="button"
      onClick={() => toggleSlug(product.slug)}
      aria-label={`${isSaved ? 'Remove' : 'Save'} ${product.name} ${isSaved ? 'from' : 'to'} saved products`}
      aria-pressed={isSaved}
      title={isSaved ? 'Remove from saved products' : 'Save product'}
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-gray-700 shadow-sm transition hover:border-gray-400 hover:text-gray-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700 ${className}`}
    >
      <Heart aria-hidden="true" className={`h-5 w-5 ${isSaved ? 'fill-[#dcb589] text-[#8c6744]' : ''}`} />
    </button>
  );
}
