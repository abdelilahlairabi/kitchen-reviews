import { ArrowRight, BookOpen, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductImageFrame from '../ProductImageFrame';
import SaveProductButton from '../SaveProductButton';

const ResourceLink = ({ to, kind, title, description }) => (
  <Link
    to={to}
    className="group flex min-w-0 items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 transition-colors hover:border-[#d6c2a6] hover:bg-[#fcfaf7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c6744] focus-visible:ring-offset-2"
  >
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5f0e8] text-[#765b3d]">
      <BookOpen size={18} aria-hidden="true" />
    </span>
    <span className="min-w-0 flex-1">
      <span className="block text-xs font-medium text-gray-500">{kind}</span>
      <span className="mt-1 block text-base font-semibold leading-snug text-gray-950 group-hover:underline group-hover:underline-offset-4">{title}</span>
      {description && <span className="mt-2 block line-clamp-2 text-sm leading-6 text-gray-600">{description}</span>}
      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#765b3d]">
        {kind === 'Buying guide' ? 'Read the guide' : 'Explore the collection'}
        <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </span>
  </Link>
);

const formatPrice = (value) => {
  const price = Number(value);
  return Number.isFinite(price) && price > 0 ? `$${price.toFixed(2)}` : null;
};

const RelatedProductCard = ({ product }) => {
  const rating = Number(product.rating);
  const hasRating = Number.isFinite(rating) && rating > 0;
  const reviewCount = Number(product.reviewCount);
  const price = formatPrice(product.price);
  const originalPrice = formatPrice(product.originalPrice);

  return (
    <article className="group flex min-w-0 flex-col rounded-2xl border border-gray-200 bg-white p-3 transition-shadow hover:shadow-md sm:p-4">
      <ProductImageFrame src={product.image} alt={product.name} className="mb-4">
        {product.badge && <span className="absolute left-3 top-3 z-10 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-gray-800">{product.badge}</span>}
        <SaveProductButton product={product} className="absolute right-2 top-2 z-10" />
      </ProductImageFrame>

      <div className="flex flex-1 flex-col">
        <Link to={`/product/${product.slug}`} className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-gray-950 hover:underline hover:underline-offset-4 sm:text-[15px]">
          {product.name}
        </Link>

        {hasRating && (
          <div className="mt-2 flex min-h-5 items-center gap-1.5" aria-label={`${rating.toFixed(1)} out of 5 stars${reviewCount > 0 ? `, ${reviewCount.toLocaleString()} reviews` : ''}`}>
            <span className="inline-flex items-center gap-0.5 text-amber-600" aria-hidden="true">
              {Array.from({ length: 5 }, (_, index) => <Star key={index} size={13} fill={index < Math.round(rating) ? 'currentColor' : 'none'} className={index < Math.round(rating) ? '' : 'text-gray-300'} />)}
            </span>
            <span className="text-xs text-gray-600">{rating.toFixed(1)}{reviewCount > 0 ? ` · ${reviewCount.toLocaleString()}` : ''}</span>
          </div>
        )}

        <div className="mt-auto flex items-baseline gap-2 pt-4">
          {price && <span className="text-base font-bold text-gray-950">{price}</span>}
          {originalPrice && Number(product.originalPrice) > Number(product.price) && <span className="text-xs text-gray-500 line-through">{originalPrice}</span>}
        </div>

        <Link to={`/product/${product.slug}`} className="mt-3 inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 transition-colors hover:border-gray-900 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2">
          Read review <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
};

const ProductRelated = ({ products = [], category, guides = [], collections = [] }) => {
  const resources = [
    ...guides.map((guide) => ({
      slug: `guide-${guide.slug}`,
      to: `/guides/${guide.slug}`,
      kind: 'Buying guide',
      title: guide.title,
      description: guide.desc,
    })),
    ...collections.map((collection) => ({
      slug: `collection-${collection.slug}`,
      to: `/collections/${collection.slug}`,
      kind: 'Curated collection',
      title: collection.name,
      description: collection.subtitle,
    })),
  ];

  if (!products.length && !resources.length) return null;

  return (
    <section className="mx-auto mb-12 max-w-6xl px-4 py-12 sm:px-6 lg:px-8" aria-label="Related products and buying resources">
      {products.length > 0 && (
        <div>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                {category ? `More ${category.name} to compare` : 'More products to compare'}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">A few other well-reviewed picks to help you compare your options.</p>
            </div>
            {category?.slug && (
              <Link to={`/category/${category.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 underline decoration-gray-300 underline-offset-4 transition-colors hover:decoration-gray-900">
                See all {category.name} <ArrowRight size={16} aria-hidden="true" />
              </Link>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
            {products.map((product) => <RelatedProductCard key={product.id} product={product} />)}
          </div>
        </div>
      )}

      {resources.length > 0 && (
        <div className={`${products.length ? 'mt-14 border-t border-gray-200 pt-10' : ''}`}>
          <div className="mb-5">
            <p className="text-sm font-medium text-[#765b3d]">{guides.length > 0 && collections.length > 0 ? 'Buying advice & curated picks' : guides.length > 0 ? 'Buying advice' : 'Curated picks'}</p>
            <h2 className="mt-1 text-xl font-bold tracking-tight text-gray-950 sm:text-2xl">
              {guides.length > 0 ? 'Make your choice with confidence' : 'More ideas for your kitchen'}
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {resources.map((resource) => <ResourceLink key={resource.slug} {...resource} />)}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductRelated;
