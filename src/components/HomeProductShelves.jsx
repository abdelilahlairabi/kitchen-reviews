import { useMemo } from 'react';
import { Clock3, Heart, Star, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProductsBySlugs } from '../hooks/useProducts';
import useProductSlugs from '../hooks/useProductSlugs';
import { RECENT_PRODUCTS_KEY, SAVED_PRODUCTS_KEY } from '../utils/productPreferences';
import ProductImageFrame from './ProductImageFrame';
import SaveProductButton from './SaveProductButton';

function ProductShelf({ title, description, icon: Icon, slugs, products, isPending, onRemove, onClear }) {
  if (!slugs.length) return null;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10" aria-busy={isPending}>
      <div className="mb-6 flex items-end justify-between gap-4 border-b border-[#e9e3d9] pb-4">
        <div>
          <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#8c6744]">Your kitchen shortlist</p>
          <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-gray-950 sm:text-2xl">
            <Icon aria-hidden="true" className="h-5 w-5 text-[#8c6744]" />{title}
          </h2>
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        </div>
        {onClear && products.length > 0 && <button type="button" onClick={onClear} className="shrink-0 rounded-full border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-600 transition hover:border-gray-950 hover:text-gray-950">Clear saved</button>}
      </div>

      {isPending && products.length === 0 ? (
        <p role="status" className="py-5 text-sm text-gray-500">Loading your products…</p>
      ) : products.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-300 bg-[#faf9f6] px-5 py-8 text-center text-sm text-gray-500">These products are no longer available in the catalog.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 xl:grid-cols-4">
          {products.map((product) => (
            <article key={product.id} className="flex min-w-0 flex-col rounded-2xl border border-gray-200 bg-white p-3 transition duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg sm:p-4">
              <div className="relative mb-4">
                <Link to={`/product/${product.slug}`} aria-label={`View ${product.name}`} className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950">
                  <ProductImageFrame src={product.image} alt={product.name} />
                </Link>
                {onRemove ? (
                  <button type="button" onClick={() => onRemove(product.slug)} aria-label={`Remove ${product.name} from saved products`} title="Remove from saved products" className="absolute right-2 top-2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-gray-600 shadow-sm transition hover:text-gray-950"><X aria-hidden="true" className="h-4 w-4" /></button>
                ) : (
                  <SaveProductButton product={product} className="absolute right-2 top-2 z-10" />
                )}
              </div>
              <Link to={`/product/${product.slug}`} className="mb-2 line-clamp-2 min-h-10 text-sm font-bold text-gray-950 hover:underline">{product.name}</Link>
              {Number.isFinite(product.rating) && product.rating > 0 && (
                <div className="mb-3 flex items-center gap-1.5" aria-label={`${product.rating.toFixed(1)} out of 5 stars${product.reviewCount ? `, based on ${product.reviewCount} reviews` : ''}`}>
                  <Star aria-hidden="true" className="h-4 w-4 fill-[#dcb589] text-[#dcb589]" />
                  <span className="text-xs font-semibold text-gray-700">{product.rating.toFixed(1)}</span>
                  {product.reviewCount > 0 && <span className="text-xs text-gray-500">({product.reviewCount.toLocaleString()})</span>}
                </div>
              )}
              <p className="mt-auto border-t border-gray-100 pt-3 text-base font-extrabold text-gray-950">${Number(product.price).toFixed(2)}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function useShelfProducts(slugs) {
  const { data, isPending } = useProductsBySlugs(slugs);
  const products = useMemo(() => {
    const bySlug = new Map((data || []).map((product) => [product.slug, product]));
    return slugs.map((slug) => bySlug.get(slug)).filter(Boolean);
  }, [data, slugs]);
  return { products, isPending };
}

export default function HomeProductShelves() {
  const recent = useProductSlugs(RECENT_PRODUCTS_KEY, 6);
  const saved = useProductSlugs(SAVED_PRODUCTS_KEY, 24);
  const recentShelf = useShelfProducts(recent.slugs);
  const savedShelf = useShelfProducts(saved.slugs);

  return (
    <>
      <ProductShelf title="Recently viewed" description="Pick up where you left off." icon={Clock3} slugs={recent.slugs} {...recentShelf} />
      <ProductShelf title="Your saved products" description="A handy shortlist of kitchen finds you want to revisit." icon={Heart} slugs={saved.slugs} {...savedShelf} onRemove={saved.slugs.length ? saved.removeSlug : undefined} onClear={saved.clear} />
    </>
  );
}
