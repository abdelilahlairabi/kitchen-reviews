import { useMemo } from 'react';
import { Clock3, Heart, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProductsBySlugs } from '../hooks/useProducts';
import useProductSlugs from '../hooks/useProductSlugs';
import { RECENT_PRODUCTS_KEY, SAVED_PRODUCTS_KEY } from '../utils/productPreferences';
import ProductImageFrame from './ProductImageFrame';

function ProductShelf({ title, icon: Icon, slugs, products, isPending, onRemove, onClear }) {
  if (!slugs.length) return null;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10" aria-busy={isPending}>
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-950 sm:text-2xl">
          <Icon aria-hidden="true" className="h-5 w-5 text-[#8c6744]" />{title}
        </h2>
        {onClear && products.length > 0 && <button type="button" onClick={onClear} className="text-xs font-semibold text-gray-500 underline underline-offset-2 hover:text-gray-900">Clear saved</button>}
      </div>

      {isPending && products.length === 0 ? (
        <p role="status" className="py-5 text-sm text-gray-500">Loading your products…</p>
      ) : products.length === 0 ? (
        <p className="py-5 text-sm text-gray-500">These products are no longer available in the catalog.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">
          {products.map((product) => (
            <article key={product.id} className="relative flex min-w-0 flex-col rounded-xl border border-gray-200 bg-white p-2.5 transition-shadow hover:shadow-md sm:p-3">
              {onRemove && <button type="button" onClick={() => onRemove(product.slug)} aria-label={`Remove ${product.name} from saved products`} title="Remove from saved products" className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-gray-600 shadow-sm hover:text-gray-950"><X aria-hidden="true" className="h-4 w-4" /></button>}
              <Link to={`/product/${product.slug}`} aria-label={`View ${product.name}`}>
                <ProductImageFrame src={product.image} alt={product.name} className="mb-3" />
                <span className="line-clamp-2 min-h-10 text-xs font-semibold text-gray-900 hover:underline">{product.name}</span>
              </Link>
              <p className="mt-2 text-sm font-extrabold text-gray-950">${Number(product.price).toFixed(2)}</p>
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
      <ProductShelf title="Continue browsing" icon={Clock3} slugs={recent.slugs} {...recentShelf} />
      <ProductShelf title="Your saved products" icon={Heart} slugs={saved.slugs} {...savedShelf} onRemove={saved.slugs.length ? saved.removeSlug : undefined} onClear={saved.clear} />
    </>
  );
}
