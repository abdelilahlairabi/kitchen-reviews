import { ArrowLeftRight, Check } from 'lucide-react';
import useProductSlugs from '../hooks/useProductSlugs';
import { COMPARE_PRODUCTS_KEY, MAX_COMPARE_PRODUCTS } from '../utils/productPreferences';

export default function CompareProductButton({ product }) {
  const { slugs, toggleSlug } = useProductSlugs(COMPARE_PRODUCTS_KEY, MAX_COMPARE_PRODUCTS);
  const isSelected = slugs.includes(product.slug);
  const isAtLimit = slugs.length >= MAX_COMPARE_PRODUCTS && !isSelected;

  return (
    <button
      type="button"
      onClick={() => !isAtLimit && toggleSlug(product.slug)}
      aria-label={`${isSelected ? 'Remove' : 'Add'} ${product.name} ${isSelected ? 'from' : 'to'} comparison`}
      aria-pressed={isSelected}
      title={isAtLimit ? `Compare up to ${MAX_COMPARE_PRODUCTS} products` : undefined}
      className={`mb-2 inline-flex min-h-8 items-center gap-1.5 self-start rounded-full border px-2.5 text-[11px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 ${isSelected ? 'border-gray-950 bg-gray-950 text-white' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-400 hover:text-gray-950'} ${isAtLimit ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      {isSelected ? <Check aria-hidden="true" className="h-3.5 w-3.5" /> : <ArrowLeftRight aria-hidden="true" className="h-3.5 w-3.5" />}
      Compare
    </button>
  );
}
