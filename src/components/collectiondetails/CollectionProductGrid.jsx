import CollectionProductCard from './CollectionProductCard';

export default function CollectionProductGrid({ products }) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No products found in this collection.
      </div>
    );
  }

  return (
    <section className="my-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <CollectionProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}