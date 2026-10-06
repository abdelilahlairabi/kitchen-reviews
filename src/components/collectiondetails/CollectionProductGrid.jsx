import CollectionProductCard from './CollectionProductCard';

export default function CollectionProductGrid({ products, isError = false }) {
  if (isError && products.length === 0) {
    return <section id="collection-products" role="status" className="my-10 rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center"><h2 className="font-bold text-gray-950">Products are temporarily unavailable</h2><p className="text-sm text-gray-600 mt-2">The collection guide is still available. Please try again in a little while.</p></section>;
  }

  if (products.length === 0) {
    return <section id="collection-products" className="my-10 rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center"><h2 className="font-bold text-gray-950">No catalog products are linked to this collection yet</h2><p className="text-sm text-gray-600 mt-2">You can still use the collection notes above to plan your shortlist.</p></section>;
  }

  return (
    <section id="collection-products" aria-labelledby="collection-products-heading" className="my-12 scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8c6744] mb-2">From the live product catalog</p>
          <h2 id="collection-products-heading" className="text-2xl md:text-3xl font-bold tracking-tight text-gray-950">Products in this collection</h2>
        </div>
        <p className="text-sm text-gray-500">{products.length} {products.length === 1 ? 'product' : 'products'}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {products.map((product) => <CollectionProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );
}
