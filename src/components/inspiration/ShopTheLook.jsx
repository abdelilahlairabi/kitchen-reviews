import { Link } from 'react-router-dom';
import AffiliateLink from '../AffiliateLink';

export default function ShopTheLook({ products, styleTitle, isError = false }) {
  if (isError && products.length === 0) {
    return <section role="status" className="max-w-6xl mx-auto px-4 my-16 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center"><h2 className="font-bold text-gray-950">Product picks are temporarily unavailable</h2><p className="text-sm text-gray-600 mt-2">The style guide is still available. Please try the catalog again in a little while.</p><Link to="/products" className="inline-block mt-4 text-sm font-semibold underline underline-offset-4">Browse the catalog</Link></section>;
  }

  return (
    <section className="max-w-6xl mx-auto px-4 my-16" aria-labelledby="shop-style-title">
      <div className="text-center mb-8 max-w-2xl mx-auto">
        <p className="text-xs font-semibold tracking-[0.18em] text-[#8c6744] uppercase">From the product catalog</p>
        <h2 id="shop-style-title" className="text-2xl md:text-3xl font-bold tracking-tight text-gray-950 mt-2">Products to consider for {styleTitle}</h2>
        <p className="text-sm text-gray-600 mt-3 leading-relaxed">These related items can complement the style. Compare their current specifications and finishes with your room before choosing.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {products.map((product) => (
          <article key={product.id} className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col hover:shadow-md transition-shadow">
            <Link to={`/product/${product.slug}`} className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950">
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center p-4 mb-4">
                <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" loading="lazy" decoding="async" />
              </div>
              <h3 className="font-bold text-gray-950 text-sm line-clamp-2 hover:underline underline-offset-4">{product.name}</h3>
            </Link>
            {Number.isFinite(product.price) && <p className="text-sm font-semibold text-gray-900 mt-2">${product.price.toFixed(2)}</p>}
            {Number.isFinite(product.rating) && product.rating > 0 && <p className="text-xs text-gray-600 mt-1">Rated {product.rating.toFixed(1)}{product.reviewCount ? ` · ${product.reviewCount.toLocaleString()} reviews` : ''}</p>}
            <div className="mt-auto pt-4">
              <AffiliateLink href={product.affiliateUrl} className="block text-center bg-gray-950 hover:bg-gray-800 text-white text-sm font-semibold py-2.5 px-3 rounded-full transition-colors aria-disabled:opacity-50 aria-disabled:cursor-not-allowed" fallback="Link coming soon">Check current price</AffiliateLink>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
