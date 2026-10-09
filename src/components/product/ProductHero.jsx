import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AffiliateLink from '../AffiliateLink';
import SaveProductButton from '../SaveProductButton';

const formatPrice = (value) => {
  const amount = Number(value);
  return Number.isFinite(amount) ? `$${amount.toFixed(2)}` : null;
};

const ProductHero = ({ product, category }) => {
  const gallery = useMemo(() => {
    const images = (product.images || []).filter((image) => image?.url);
    return images.length ? images : (product.image ? [{ url: product.image, standardUrl: product.image, alt: product.name }] : []);
  }, [product.images, product.image, product.name]);
  const [activeImageUrl, setActiveImageUrl] = useState('');
  const activeImage = gallery.find((image) => image.url === activeImageUrl) || gallery[0];
  const price = formatPrice(product.price);
  const originalPrice = formatPrice(product.originalPrice);
  const hasRating = product.rating !== null && product.rating !== undefined && product.rating !== '' && Number.isFinite(Number(product.rating));
  const roundedRating = hasRating ? Math.max(0, Math.min(5, Math.round(Number(product.rating)))) : 0;
  const marketplace = String(product.sourceMarketplace || 'amazon.com').toLowerCase();
  const validMarketplace = /^amazon\.[a-z.]+$/.test(marketplace) ? marketplace : 'amazon.com';
  let affiliateTag = '';
  try {
    affiliateTag = new URL(product.affiliateUrl).searchParams.get('tag') || '';
  } catch {
    // Some affiliate links are short links; keep the primary URL as the fallback.
  }
  const variants = (product.variants || []).flatMap((group) => {
    const values = Array.isArray(group?.value) ? group.value : [group];
    return values.filter((variant) => variant?.asin && variant?.value);
  });

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
            {activeImage ? (
              <img src={activeImage.url} alt={activeImage.alt || product.name} className="max-h-full max-w-full object-contain" fetchPriority="high" />
            ) : <span className="text-sm text-gray-400">Product image unavailable</span>}
          </div>
          {gallery.length > 1 && <div className="flex gap-3 overflow-x-auto pb-2" aria-label="Product images">
            {gallery.map((image, index) => <button
              key={`${image.url}-${index}`}
              type="button"
              onClick={() => setActiveImageUrl(image.url)}
              aria-label={`Show product image ${index + 1}`}
              aria-pressed={(activeImage?.url || '') === image.url}
              className={`h-20 w-20 shrink-0 rounded-lg border bg-white p-2 transition-colors ${activeImage?.url === image.url ? 'border-gray-900' : 'border-gray-200 hover:border-gray-500'}`}
            ><img src={image.standardUrl || image.url} alt="" className="h-full w-full object-contain" loading="lazy" /></button>)}
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

          {product.description && <p className="mb-6 line-clamp-4 text-sm leading-6 text-gray-600">{product.description}</p>}
          {product.features?.length > 0 && <ul className="mb-7 space-y-2.5">
            {product.features.slice(0, 7).map((feature, index) => <li key={`${feature}-${index}`} className="flex items-start gap-2 text-sm leading-5 text-gray-700"><span className="mt-px text-green-700" aria-hidden="true">✓</span><span>{feature}</span></li>)}
          </ul>}

          {variants.length > 0 && <div className="mb-6">
            <h2 className="mb-2 text-sm font-semibold text-gray-800">Available options</h2>
            <div className="flex flex-wrap gap-2">
              {variants.map((variant) => {
                const url = new URL(`/dp/${encodeURIComponent(variant.asin)}`, `https://${validMarketplace}`);
                if (affiliateTag) url.searchParams.set('tag', affiliateTag);
                const href = affiliateTag ? url.toString() : product.affiliateUrl;
                return <a key={`${variant.asin}-${variant.value}`} href={href} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 transition hover:border-gray-500">
                  {variant.image && <img src={variant.image} alt="" className="h-7 w-7 rounded-full bg-gray-50 object-contain" loading="lazy" />}
                  <span>{variant.value}</span>
                </a>;
              })}
            </div>
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
