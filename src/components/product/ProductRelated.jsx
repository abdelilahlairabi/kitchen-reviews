import { Link } from 'react-router-dom';
import ProductImageFrame from '../ProductImageFrame';
import SaveProductButton from '../SaveProductButton';

const ExploreLink = ({ to, eyebrow, title, description }) => (
  <Link
    to={to}
    className="group flex min-h-24 items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white px-4 py-4 transition-colors hover:border-[#dcb589] hover:bg-[#fcfaf7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c6744] focus-visible:ring-offset-2"
  >
    <span className="min-w-0">
      <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500">{eyebrow}</span>
      <span className="mt-1 block text-sm font-semibold leading-snug text-gray-900">{title}</span>
      {description && <span className="mt-1 block text-xs leading-relaxed text-gray-600">{description}</span>}
    </span>
    <span aria-hidden="true" className="shrink-0 text-lg text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-gray-900">→</span>
  </Link>
);

const ProductRelated = ({ products = [], category, guides = [], collections = [] }) => {
  const hasExploreLinks = category || guides.length > 0 || collections.length > 0;
  if (!products.length && !hasExploreLinks) return null;

  return (
    <section className="mx-auto mb-10 max-w-5xl px-4 py-12 sm:px-6 lg:px-8" aria-label="Related product links">
      {hasExploreLinks && (
        <div className="mb-12">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8c6744]">Keep exploring</p>
            <h2 className="mt-1 text-xl font-bold tracking-tight text-gray-950">Find the next helpful page</h2>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {category && (
              <ExploreLink
                to={`/category/${category.slug}`}
                eyebrow="Browse category"
                title={category.name}
                description="See more products in this category."
              />
            )}
            {guides.map((guide) => (
              <ExploreLink
                key={guide.slug}
                to={`/guides/${guide.slug}`}
                eyebrow="Buying guide"
                title={guide.title}
                description={guide.desc}
              />
            ))}
            {collections.map((collection) => (
              <ExploreLink
                key={collection.slug}
                to={`/collections/${collection.slug}`}
                eyebrow="Curated collection"
                title={collection.name}
                description={collection.subtitle}
              />
            ))}
          </div>
        </div>
      )}

      {products.length > 0 && (
        <div>
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8c6744]">More to compare</p>
            <h2 className="mt-1 text-xl font-bold tracking-tight text-gray-950">Similar products</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {products.map((product) => (
              <article key={product.id} className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-4 text-center transition-shadow hover:shadow-md">
                <ProductImageFrame src={product.image} alt={product.name} className="mb-4">
                  <SaveProductButton product={product} className="absolute right-2 top-2 z-10" />
                </ProductImageFrame>
                <h3 className="mb-1 line-clamp-2 text-sm font-medium text-gray-900">{product.name}</h3>
                <div className="mb-2 text-xs text-[#a0aec0]" aria-label={`${product.rating} out of 5 stars`}>
                  {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
                </div>
                <p className="mb-3 text-lg font-bold">${Number(product.price).toFixed(2)}</p>
                <Link to={`/product/${product.slug}`} className="mt-auto rounded-full bg-[#ebd5b3] px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-[#dcb589]">
                  View details
                </Link>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductRelated;
