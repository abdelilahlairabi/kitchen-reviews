import { useMemo } from 'react';
import { Heart, ShoppingBag, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProductsBySlugs } from '../hooks/useProducts';
import useProductSlugs from '../hooks/useProductSlugs';
import { SAVED_PRODUCTS_KEY } from '../utils/productPreferences';
import ProductImageFrame from '../components/ProductImageFrame';
import PageMeta from '../components/PageMeta';
import { getAmazonImageSrcSets } from '../utils/amazonImageSrcSets';

export default function SavedProducts() {
  const { slugs, isReady, removeSlug, clear } = useProductSlugs(SAVED_PRODUCTS_KEY, 24);
  const { data, isPending, isError, refetch } = useProductsBySlugs(slugs);
  const products = useMemo(() => {
    const bySlug = new Map((data || []).map((product) => [product.slug, product]));
    return slugs.map((slug) => bySlug.get(slug)).filter(Boolean);
  }, [data, slugs]);

  return (
    <main className="min-h-[60vh] w-full bg-[#fcfcfc] py-10 sm:py-14">
      <PageMeta title="Saved Kitchen Products | KitchenTrusted" description="Return to kitchen products you saved on KitchenTrusted." />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <nav className="mb-6 text-xs text-gray-500" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-black">Home</Link><span className="mx-2">/</span><span className="font-medium text-gray-900">Saved products</span>
        </nav>

        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-500">YOUR SHORTLIST</p>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">Saved Products</h1>
            <p className="mt-2 text-sm text-gray-600">Keep interesting picks together while you compare.</p>
          </div>
          {products.length > 0 && <button type="button" onClick={clear} className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-600 hover:text-gray-950">Clear saved</button>}
        </div>

        {!isReady || (slugs.length > 0 && isPending) ? (
          <p role="status" className="rounded-2xl border border-gray-200 bg-white py-14 text-center text-sm text-gray-500">Loading your saved products…</p>
        ) : isError ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-14 text-center">
            <p className="font-semibold text-gray-900">We couldn’t load your saved products.</p>
            <button type="button" onClick={() => refetch()} className="mt-4 rounded-md bg-[#dcb589] px-5 py-2.5 text-sm font-semibold text-black hover:bg-[#cba478]">Try again</button>
          </div>
        ) : products.length === 0 ? (
          <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white px-6 py-14 text-center shadow-sm sm:px-12">
            <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#f7f3ed] text-[#8c6744]"><Heart aria-hidden="true" className="h-7 w-7" /></span>
            <h2 className="text-xl font-bold text-gray-950">Your saved list is empty</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600">Tap the heart on any product to save it here. You can compare your shortlist later—no account needed.</p>
            <Link to="/products" className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#dcb589] px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#cba478]">
              <ShoppingBag aria-hidden="true" className="h-4 w-4" />Browse products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article key={product.id} className="relative flex min-w-0 flex-col rounded-2xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md sm:p-5">
                <button type="button" onClick={() => removeSlug(product.slug)} aria-label={`Remove ${product.name} from saved products`} title="Remove from saved products" className="absolute right-6 top-6 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-gray-600 shadow-sm transition-colors hover:text-gray-950"><X aria-hidden="true" className="h-4 w-4" /></button>
                <Link to={`/product/${product.slug}`} aria-label={`View ${product.name}`}>
                  <ProductImageFrame src={product.image} {...getAmazonImageSrcSets(product.image)} sizes="(max-width: 639px) calc(100vw - 64px), (max-width: 1023px) calc((100vw - 148px) / 2), (max-width: 1279px) calc((100vw - 104px) / 3 - 40px), 310px" alt={product.name} className="mb-4" />
                  <span className="line-clamp-2 min-h-10 text-sm font-bold text-gray-950 hover:underline">{product.name}</span>
                </Link>
                <div className="mb-4 mt-auto flex items-baseline gap-2 pt-4">
                  <span className="text-lg font-extrabold text-gray-950">${Number(product.price).toFixed(2)}</span>
                  {product.rating !== null && product.rating !== undefined && <span className="text-xs text-gray-500">★ {Number(product.rating).toFixed(1)} · {Number(product.reviewCount || 0).toLocaleString()} reviews</span>}
                </div>
                <Link to={`/product/${product.slug}`} className="block rounded-md border border-gray-300 py-2.5 text-center text-sm font-semibold text-gray-950 transition-colors hover:border-gray-600 hover:bg-gray-50">View details</Link>
              </article>
            ))}
          </div>
        )}

        {isReady && slugs.length > 0 && !isPending && !isError && products.length === 0 && (
          <div className="mt-4 text-center"><button type="button" onClick={clear} className="text-sm font-semibold text-gray-600 underline underline-offset-2 hover:text-gray-950">Clear unavailable saved items</button></div>
        )}
      </div>
    </main>
  );
}
