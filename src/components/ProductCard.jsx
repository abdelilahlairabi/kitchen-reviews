import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { isValidAmazonProductUrl } from '../utils/affiliate';
import { getAmazonImageSrcSets } from '../utils/amazonImageSrcSets';
import AffiliateLink from './AffiliateLink';
import ProductImageFrame from './ProductImageFrame';
import SaveProductButton from './SaveProductButton';

const defaultImageSizes = '(max-width: 359px) calc(100vw - 56px), (max-width: 639px) calc((100vw - 92px) / 2), (max-width: 1023px) calc(50vw - 64px), (max-width: 1279px) calc((100vw - 144px) / 3), 246px';

export default function ProductCard({
  product,
  imageSizes = defaultImageSizes,
  imageSrcSet,
  loading = 'lazy',
  fetchPriority,
  fallbackToProductDetails = false,
}) {
  const imageSrcSets = getAmazonImageSrcSets(product.image);
  const hasRating = Number.isFinite(product.rating) && product.rating > 0;
  const hasAffiliateUrl = isValidAmazonProductUrl(product.affiliateUrl);
  const hasOriginalPrice = Number.isFinite(product.price)
    && Number.isFinite(product.originalPrice)
    && product.originalPrice > product.price;

  return (
    <article className="relative flex h-full flex-col rounded-xl border border-gray-200 bg-white p-3 transition-shadow duration-300 hover:shadow-md sm:p-4">
      <ProductImageFrame
        src={product.image}
        {...imageSrcSets}
        srcSet={imageSrcSet || imageSrcSets.srcSet}
        sizes={imageSizes}
        alt={product.name}
        className="mb-3 sm:mb-4"
        loading={loading}
        fetchPriority={fetchPriority}
      >
        {product.badge && <span className="absolute left-2 top-2 z-10 rounded-full bg-white/95 px-2 py-1 text-[9px] font-semibold uppercase text-gray-900 sm:left-3 sm:top-3 sm:px-2.5 sm:text-[10px]">{product.badge}</span>}
        <SaveProductButton product={product} className="absolute right-2 top-2 z-10" />
      </ProductImageFrame>

      <Link to={`/product/${product.slug}`} className="mb-1 line-clamp-3 min-h-[60px] text-xs font-bold leading-5 text-gray-950 transition-colors hover:text-gray-600 sm:line-clamp-2 sm:min-h-[40px] sm:text-sm">
        <h2>{product.name}</h2>
      </Link>

      {hasRating && (
        <div className="mb-3 flex min-w-0 items-center gap-1" role="img" aria-label={`${product.rating.toFixed(1)} out of 5 stars${product.reviewCount ? `, ${product.reviewCount.toLocaleString()} reviews` : ''}`}>
          <span className="flex shrink-0 gap-0.5" aria-hidden="true">
            {Array.from({ length: 5 }, (_, index) => <Star key={index} className={`h-3.5 w-3.5 ${index < Math.round(product.rating) ? 'fill-[#dcb589] text-[#dcb589]' : 'fill-gray-200 text-gray-200'}`} />)}
          </span>
          <span className="truncate text-[10px] font-medium text-gray-500 sm:text-xs">
            {product.rating.toFixed(1)}{product.reviewCount ? ` (${product.reviewCount.toLocaleString()})` : ''}
          </span>
        </div>
      )}

      <div className="mb-3 mt-auto flex flex-wrap items-baseline gap-x-2 gap-y-1 sm:mb-4">
        {Number.isFinite(product.price) && <span className="text-sm font-extrabold text-gray-950 sm:text-base">${product.price.toFixed(2)}</span>}
        {hasOriginalPrice && <span className="text-xs text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>}
        {product.discountPercent > 0 && <span className="text-[10px] font-bold text-red-700 sm:text-xs">-{product.discountPercent}%</span>}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Link to={`/product/${product.slug}`} aria-label={`View details for ${product.name}`} className="block min-h-10 rounded-md border border-gray-300 px-1 py-2.5 text-center text-[11px] font-bold text-gray-950 transition-colors hover:border-gray-500 sm:text-sm">Details</Link>
        {hasAffiliateUrl ? (
          <AffiliateLink href={product.affiliateUrl} className="block min-h-10 rounded-md bg-[#dcb589] px-1 py-2.5 text-center text-[11px] font-bold text-gray-950 transition-colors hover:bg-[#cba478] sm:text-sm">Amazon</AffiliateLink>
        ) : fallbackToProductDetails ? (
          <Link to={`/product/${product.slug}`} className="block min-h-10 rounded-md bg-[#dcb589] px-1 py-2.5 text-center text-[11px] font-bold text-gray-950 transition-colors hover:bg-[#cba478] sm:text-sm">View product</Link>
        ) : (
          <AffiliateLink href={product.affiliateUrl} className="block min-h-10 rounded-md bg-[#dcb589] px-1 py-2.5 text-center text-[11px] font-bold text-gray-950 transition-colors hover:bg-[#cba478] aria-disabled:cursor-not-allowed aria-disabled:opacity-50 sm:text-sm" fallback="Link soon">Amazon</AffiliateLink>
        )}
      </div>
    </article>
  );
}
