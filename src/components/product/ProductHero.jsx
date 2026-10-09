import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import AffiliateLink from '../AffiliateLink';
import SaveProductButton from '../SaveProductButton';
import { createAmazonVariantUrl } from '../../utils/affiliate';
import { getAmazonImageSrcSets } from '../../utils/amazonImageSrcSets';

const formatPrice = (value) => {
  const amount = Number(value);
  return Number.isFinite(amount) ? `$${amount.toFixed(2)}` : null;
};

const VISIBLE_VARIANT_COUNT = 4;

const ProductHero = ({ product, category }) => {
  const gallery = useMemo(() => {
    const images = (product.images || []).filter((image) => image?.url);
    return images.length ? images : (product.image ? [{ url: product.image, standardUrl: product.image, alt: product.name }] : []);
  }, [product.images, product.image, product.name]);
  const [activeImageUrl, setActiveImageUrl] = useState('');
  const [failedImageUrls, setFailedImageUrls] = useState(() => new Set());
  const [showAllDetails, setShowAllDetails] = useState(false);
  const [showAllVariants, setShowAllVariants] = useState(false);
  const activeImage = gallery.find((image) => image.url === activeImageUrl) || gallery[0];
  const activeImageSrcSets = getAmazonImageSrcSets(activeImage?.url);
  const price = formatPrice(product.price);
  const originalPrice = formatPrice(product.originalPrice);
  const hasRating = product.rating !== null && product.rating !== undefined && product.rating !== '' && Number.isFinite(Number(product.rating));
  const roundedRating = hasRating ? Math.max(0, Math.min(5, Math.round(Number(product.rating)))) : 0;
  const marketplace = String(product.sourceMarketplace || 'amazon.com').toLowerCase();
  const validMarketplace = /^amazon\.[a-z.]+$/.test(marketplace) ? marketplace : 'amazon.com';
  const variants = (product.variants || []).flatMap((group) => {
    const values = Array.isArray(group?.value) ? group.value : [group];
    return values.filter((variant) => /^[A-Z0-9]{10}$/i.test(String(variant?.asin || '').trim()) && variant?.value);
  });
  const hasExpandableDetails = String(product.description || '').length > 360 || (product.features?.length || 0) > 4;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-xs text-gray-500 mb-8" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-black">Home</Link><span className="mx-2">/</span>
        {category ? <Link to={`/category/${category.slug}`} className="hover:text-black">{category.name}</Link> : <span>Products</span>}
        <span className="mx-2">/</span><span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <div className="flex min-w-0 flex-col gap-4">
          <div className="flex h-[360px] items-center justify-center overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 sm:h-[440px]">
            {activeImage && !failedImageUrls.has(activeImage.url) ? (
              <picture className="flex h-full w-full items-center justify-center">
                {activeImageSrcSets.avifSrcSet && <source type="image/avif" srcSet={activeImageSrcSets.avifSrcSet} sizes="(max-width: 767px) calc(100vw - 80px), (max-width: 1279px) calc(50vw - 80px), 560px" />}
                {activeImageSrcSets.webpSrcSet && <source type="image/webp" srcSet={activeImageSrcSets.webpSrcSet} sizes="(max-width: 767px) calc(100vw - 80px), (max-width: 1279px) calc(50vw - 80px), 560px" />}
                <img
                  src={activeImage.url}
                  srcSet={activeImageSrcSets.srcSet}
                  sizes="(max-width: 767px) calc(100vw - 80px), (max-width: 1279px) calc(50vw - 80px), 560px"
                  alt={activeImage.alt || product.name}
                  width="672"
                  height="672"
                  className="max-h-full max-w-full object-contain"
                  fetchPriority="high"
                  decoding="async"
                  onError={() => setFailedImageUrls((current) => new Set(current).add(activeImage.url))}
                />
              </picture>
            ) : (
              <div role="img" aria-label={`Product image unavailable: ${product.name}`} className="flex flex-col items-center gap-3 text-center text-sm text-gray-500">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-10 w-10 text-gray-400" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <circle cx="8.5" cy="9" r="1.5" />
                  <path d="m21 15-5-5L5 20M3 3l18 18" />
                </svg>
                <span>Product image unavailable</span>
              </div>
            )}
          </div>
          {gallery.length > 1 && <div className="flex gap-3 overflow-x-auto pb-2" aria-label="Product images">
            {gallery.map((image, index) => {
              const thumbnailUrl = image.standardUrl || image.url;
              const thumbnailSrcSets = getAmazonImageSrcSets(thumbnailUrl, [96, 160, 320]);
              return <button
                key={`${image.url}-${index}`}
                type="button"
                onClick={() => setActiveImageUrl(image.url)}
                aria-label={`Show product image ${index + 1}`}
                aria-pressed={(activeImage?.url || '') === image.url}
                className={`h-20 w-20 shrink-0 rounded-lg border bg-white p-2 transition-colors ${activeImage?.url === image.url ? 'border-gray-900' : 'border-gray-200 hover:border-gray-500'}`}
              >
                <picture className="block h-full w-full">
                  {thumbnailSrcSets.avifSrcSet && <source type="image/avif" srcSet={thumbnailSrcSets.avifSrcSet} sizes="64px" />}
                  {thumbnailSrcSets.webpSrcSet && <source type="image/webp" srcSet={thumbnailSrcSets.webpSrcSet} sizes="64px" />}
                  <img
                    src={thumbnailUrl}
                    srcSet={thumbnailSrcSets.srcSet}
                    sizes="64px"
                    alt=""
                    width="160"
                    height="160"
                    className="h-full w-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </button>;
            })}
          </div>}
        </div>

        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {product.brandName && <span className="text-sm font-semibold text-gray-700">{product.brandName}</span>}
            {product.badge && <span className="rounded-full bg-[#f4eadb] px-3 py-1 text-xs font-semibold text-gray-800">{product.badge}</span>}
            <SaveProductButton product={product} className="ml-auto" />
          </div>
          <h1 className="mb-3 text-2xl font-bold leading-tight text-gray-950 sm:text-3xl">{product.name}</h1>
          {(product.modelNumber || product.upc) && <p className="mb-4 text-xs text-gray-500">
            {product.modelNumber && <span>Model: {product.modelNumber}</span>}
            {product.modelNumber && product.upc && <span className="mx-2">·</span>}
            {product.upc && <span>UPC: {product.upc}</span>}
          </p>}

          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="text-amber-500" aria-hidden="true">{'★'.repeat(roundedRating)}{'☆'.repeat(5 - roundedRating)}</span>
            <span className="text-sm font-semibold text-gray-800">{hasRating ? Number(product.rating).toFixed(1) : '—'}</span>
            {product.reviewCount > 0 && <span className="text-sm text-gray-500">{Number(product.reviewCount).toLocaleString()} ratings</span>}
          </div>

          <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            {price && <span className="text-3xl font-extrabold tracking-tight text-gray-950">{price}</span>}
            {originalPrice && price && originalPrice !== price && <>
              <span className="text-base text-gray-400 line-through">{originalPrice}</span>
              {product.discountPercent > 0 && <span className="text-sm font-semibold text-red-700">{product.discountPercent}% off</span>}
            </>}
          </div>
          {product.isCouponAvailable && <p className="mb-4 text-sm font-medium text-green-800">A coupon may be available on Amazon. Check the current offer.</p>}

          {product.description && <p className={`mb-4 text-sm leading-6 text-gray-600 ${showAllDetails ? '' : 'line-clamp-4'}`}>{product.description}</p>}
          {product.features?.length > 0 && <ul className={`space-y-2.5 ${hasExpandableDetails ? 'mb-2' : 'mb-7'}`}>
            {product.features.slice(0, showAllDetails ? product.features.length : 4).map((feature, index) => <li key={`${feature}-${index}`} className="flex items-start gap-2 text-sm leading-5 text-gray-700"><span className="mt-px text-green-700" aria-hidden="true">✓</span><span>{feature}</span></li>)}
          </ul>}
          {hasExpandableDetails && <button
            type="button"
            onClick={() => setShowAllDetails((expanded) => !expanded)}
            aria-expanded={showAllDetails}
            className="mb-7 inline-flex min-h-9 items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 text-xs font-semibold text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2"
          >{showAllDetails ? <>Show fewer details <ChevronUp aria-hidden="true" className="h-3.5 w-3.5" /></> : <>More product details <ChevronDown aria-hidden="true" className="h-3.5 w-3.5" /></>}</button>}

          {variants.length > 0 && <div className="mb-6">
            <h2 className="mb-2 text-sm font-semibold text-gray-800">Available options</h2>
            <div className="flex flex-wrap gap-2">
              {variants.slice(0, showAllVariants ? variants.length : VISIBLE_VARIANT_COUNT).map((variant) => {
                const href = createAmazonVariantUrl({
                  asin: variant.asin,
                  marketplace: validMarketplace,
                  affiliateUrl: product.affiliateUrl,
                });
                if (!href) return null;
                return <a key={`${variant.asin}-${variant.value}`} href={href} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 transition hover:border-gray-500">
                  {variant.image && <img src={variant.image} alt="" className="h-7 w-7 rounded-full bg-gray-50 object-contain" loading="lazy" />}
                  <span>{variant.value}</span>
                </a>;
              })}
            </div>
            {variants.length > VISIBLE_VARIANT_COUNT && <button
              type="button"
              onClick={() => setShowAllVariants((expanded) => !expanded)}
              aria-expanded={showAllVariants}
              className="mt-3 inline-flex min-h-9 items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 text-xs font-semibold text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2"
            >{showAllVariants ? <>Show fewer options <ChevronUp aria-hidden="true" className="h-3.5 w-3.5" /></> : <>View all {variants.length} options <ChevronDown aria-hidden="true" className="h-3.5 w-3.5" /></>}</button>}
          </div>}

          <AffiliateLink href={product.affiliateUrl} className="mb-2 block w-full rounded-xl bg-[#ebd5b3] py-3.5 text-center font-bold text-gray-950 transition hover:bg-[#dcb589]" fallback="Product link coming soon">Check price on Amazon</AffiliateLink>
          <p className="mb-5 text-center text-xs text-gray-500">As an Amazon Associate I earn from qualifying purchases. Price and availability may change.</p>
          {product.lastScrapedAt && <p className="mt-2 text-center text-[11px] text-gray-400">Product information last checked {new Date(product.lastScrapedAt).toLocaleDateString()}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductHero;
