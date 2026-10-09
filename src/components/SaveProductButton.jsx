import { useEffect, useRef, useState } from 'react';
import { Heart } from 'lucide-react';
import useProductSlugs from '../hooks/useProductSlugs';
import { SAVED_PRODUCTS_KEY } from '../utils/productPreferences';

export default function SaveProductButton({ product, className = '' }) {
  const { slugs, toggleSlug } = useProductSlugs(SAVED_PRODUCTS_KEY, 24);
  const [feedback, setFeedback] = useState('');
  const feedbackTimeout = useRef(null);
  const isSaved = slugs.includes(product.slug);

  useEffect(() => () => window.clearTimeout(feedbackTimeout.current), []);

  const handleToggle = () => {
    toggleSlug(product.slug);
    setFeedback(isSaved ? 'Removed from saved' : 'Saved for later');
    window.clearTimeout(feedbackTimeout.current);
    feedbackTimeout.current = window.setTimeout(() => setFeedback(''), 1800);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={handleToggle}
        aria-label={`${isSaved ? 'Remove' : 'Save'} ${product.name} ${isSaved ? 'from' : 'to'} saved products`}
        aria-pressed={isSaved}
        title={isSaved ? 'Remove from saved products' : 'Save product'}
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-gray-700 shadow-sm transition hover:border-gray-400 hover:text-gray-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
      >
        <Heart aria-hidden="true" className={`h-5 w-5 ${isSaved ? 'fill-[#dcb589] text-[#8c6744]' : ''}`} />
      </button>
      {feedback && <span role="status" aria-live="polite" className="absolute right-0 top-full z-20 mt-1 whitespace-nowrap rounded-md bg-gray-950 px-2 py-1 text-[10px] font-medium text-white shadow">{feedback}</span>}
    </div>
  );
}
