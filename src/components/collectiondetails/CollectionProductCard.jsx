import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const isUsableAffiliateUrl = (value) => {
  if (!value || /placeholder|xxxxx|yourtag/i.test(value)) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && (url.hostname === 'amzn.to' || /(^|\.)amazon\.[a-z.]+$/i.test(url.hostname));
  } catch {
    return false;
  }
};

export default function CollectionProductCard({ product }) {
  const hasRating = Number.isFinite(product.rating) && product.rating > 0;
  const filledStars = hasRating ? Math.round(product.rating) : 0;
  const hasAffiliateUrl = isUsableAffiliateUrl(product.affiliateUrl);

  return (
    <article className="bg-white rounded-2xl border border-gray-200 p-4 md:p-5 flex flex-col shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-[4/3] bg-gray-50 rounded-xl overflow-hidden mb-4 flex items-center justify-center p-4">
        {product.badge && <span className="absolute left-3 top-3 z-10 bg-white/95 text-gray-900 text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full">{product.badge}</span>}
        <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" loading="lazy" decoding="async" />
      </div>

      <div className="flex-1">
        <Link to={`/product/${product.slug}`} className="font-bold text-gray-950 text-base leading-snug line-clamp-2 hover:underline underline-offset-4">{product.name}</Link>
        {hasRating && (
          <div className="flex items-center gap-1.5 mt-2 mb-3" aria-label={`${product.rating.toFixed(1)} out of 5 stars${product.reviewCount ? `, ${product.reviewCount} reviews` : ''}`}>
            <span className="flex" aria-hidden="true">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={13} fill={index < filledStars ? 'currentColor' : 'none'} className={index < filledStars ? 'text-amber-500' : 'text-gray-300'} />)}</span>
            <span className="text-xs text-gray-600">{product.rating.toFixed(1)}{product.reviewCount ? ` · ${product.reviewCount.toLocaleString()} reviews` : ''}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100 mt-4">
        <div className="min-w-0">
          {Number.isFinite(product.price) && <span className="text-base font-bold text-gray-950">${product.price.toFixed(2)}</span>}
          {Number.isFinite(product.price) && Number.isFinite(product.originalPrice) && product.originalPrice > product.price && <span className="text-xs text-gray-500 line-through ml-2">${product.originalPrice.toFixed(2)}</span>}
        </div>
        <Link to={`/product/${product.slug}`} className="text-gray-900 border border-gray-300 hover:border-gray-950 text-xs font-semibold px-3 py-2 rounded-full transition-colors whitespace-nowrap">Details</Link>
      </div>

      {hasAffiliateUrl ? (
        <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-3 block text-center bg-gray-950 hover:bg-gray-800 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors">Check current price</a>
      ) : (
        <Link to={`/product/${product.slug}`} className="mt-3 block text-center bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm font-semibold px-4 py-2.5 rounded-full transition-colors">View product details</Link>
      )}
    </article>
  );
}
