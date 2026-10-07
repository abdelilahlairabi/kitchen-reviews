import { Link } from 'react-router-dom';
import AffiliateLink from '../AffiliateLink';
import ProductImageFrame from '../ProductImageFrame';

export default function ShopThisLook({ products, styleTitle, isError = false }) {
  if (isError && products.length === 0) {
    return <section role="status" className="max-w-6xl mx-auto px-4 my-16 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center"><h2 className="font-bold text-gray-950">Related products are temporarily unavailable</h2><p className="text-sm text-gray-600 mt-2">The style guide is available, but the catalog could not be reached right now.</p><Link to="/products" className="inline-block mt-4 text-sm font-semibold underline underline-offset-4">Browse the catalog</Link></section>;
  }

  return (
    <section className="max-w-6xl mx-auto px-4 my-16" aria-labelledby="style-products-heading">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8c6744]">Selected from the product catalog</p>
        <h2 id="style-products-heading" className="text-2xl md:text-3xl font-bold tracking-tight text-gray-950 mt-2">Products to consider for {styleTitle}</h2>
        <p className="text-sm text-gray-600 mt-3 leading-relaxed">These related products can complement this design direction. Check current finishes, dimensions, specifications, and price before deciding.</p>
      </div>

      {/* Grille de 3 colonnes de produits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products?.map((product) => (
          <article
            key={product.id}
            className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col shadow-sm hover:shadow-md transition-shadow"
          >
            <div>
              {/* Conteneur Image Produit */}
              <ProductImageFrame src={product.image} alt={product.name} className="mb-4" />

              {/* Titre & Évaluation */}
              <Link to={`/product/${product.slug}`} className="block font-bold text-gray-900 text-xs md:text-sm line-clamp-2 mb-1 hover:underline">
                {product.name}
              </Link>
              
              {Number.isFinite(product.rating) && product.rating > 0 && <p className="text-xs text-gray-600 mb-2">Rated {product.rating.toFixed(1)}{product.reviewCount ? ` · ${product.reviewCount.toLocaleString()} reviews` : ''}</p>}

              {/* Prix */}
              <p className="text-sm font-bold text-gray-900">
                ${product.price?.toFixed(2)}
              </p>
            </div>

            {/* Bouton d'action */}
            <AffiliateLink href={product.affiliateUrl} className="mt-auto pt-4 block text-center bg-gray-950 hover:bg-gray-800 text-white text-sm font-semibold py-2.5 rounded-full transition-colors aria-disabled:opacity-50 aria-disabled:cursor-not-allowed" fallback="Link coming soon">Check current price</AffiliateLink>
          </article>
        ))}
      </div>
    </section>
  );
}
