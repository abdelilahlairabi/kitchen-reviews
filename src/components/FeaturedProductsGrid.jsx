import { useState } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import AffiliateLink from './AffiliateLink';
import ProductGridSkeleton from './ProductGridSkeleton';
import ProductGridError from './ProductGridError';

const filters = ['All', 'Top Rated'];
const getProductImageSrcSet = (image) => {
  if (!/^\/products\/product-(stand-mixer|pressure-cooker|coffee-maker|blender)\.jpeg$/.test(image)) return undefined;
  return `${image.replace('.jpeg', '-336.jpeg')} 336w, ${image} 672w`;
};

const FeaturedProductsGrid = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const { data, isPending, isError } = useProducts({
    page: 1,
    pageSize: 8,
    sort: 'popularity',
    minimumRating: activeFilter === 'Top Rated' ? 4.8 : undefined,
  });
  const products = data?.products || [];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-busy={isPending}>
      <div className="flex flex-col items-center mb-12">
        <span className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">FEATURED PRODUCTS</span>
        <h2 className="text-3xl font-bold text-black mb-6">Featured Products</h2>
        <div className="flex gap-3">
          {filters.map((filter) => <button key={filter} type="button" onClick={() => setActiveFilter(filter)} aria-pressed={activeFilter === filter} className={`px-5 py-1.5 rounded-full text-sm font-semibold border border-black transition-colors ${activeFilter === filter ? 'bg-[#dcb589] text-black' : 'bg-white text-black hover:bg-gray-50'}`}>{filter}</button>)}
        </div>
      </div>
      {isPending ? (
        <><span className="sr-only" role="status">Loading featured products</span><ProductGridSkeleton variant="featured" /></>
      ) : isError ? (
        <ProductGridError variant="featured" message="Featured products are unavailable right now." />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {products.length === 0 ? <p className="col-span-full text-center text-gray-500">No products found for this filter.</p> : products.map((product, index) => (
            <article key={product.id} className={`min-h-[350px] bg-white border border-gray-200 rounded-xl p-3 flex flex-col hover:shadow-lg transition-shadow duration-300 sm:min-h-[400px] sm:p-4 ${index >= 4 ? 'hidden lg:flex' : ''}`}>
              <div className="w-full h-32 bg-[#f8f9fa] rounded-lg mb-3 flex items-center justify-center p-3 sm:h-48 sm:mb-4 sm:p-4">
                <img src={product.image} srcSet={getProductImageSrcSet(product.image)} sizes="(min-width: 1024px) 25vw, 46vw" alt={product.name} width="672" height="672" className="max-w-full max-h-full object-contain mix-blend-multiply" loading="lazy" />
              </div>
              <Link to={`/product/${product.slug}`} className="mb-1 line-clamp-2 min-h-10 text-xs font-extrabold text-black hover:text-gray-600 transition-colors sm:text-sm">{product.name}</Link>
              <p className="mb-2 text-sm font-extrabold text-black sm:text-base">${product.price.toFixed(2)}</p>
              <div className="flex items-center gap-1 mb-3 mt-auto sm:mb-4" role="img" aria-label={`${product.rating} out of 5 stars`}>
                {[...Array(5)].map((_, starIndex) => <Star key={starIndex} aria-hidden="true" className={`w-3.5 h-3.5 ${starIndex < Math.round(product.rating) ? 'fill-[#dcb589] text-[#dcb589]' : 'fill-gray-200 text-gray-200'}`} />)}
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <Link to={`/product/${product.slug}`} aria-label={`Details for ${product.name}`} className="block text-center border border-gray-300 hover:border-gray-500 py-2 rounded-md text-xs font-bold text-black transition-colors sm:py-2.5 sm:text-sm">Details</Link>
                <AffiliateLink href={product.affiliateUrl} className="block text-center bg-[#dcb589] hover:bg-[#cba478] py-2 rounded-md text-xs font-bold text-black transition-colors aria-disabled:opacity-50 aria-disabled:cursor-not-allowed sm:py-2.5 sm:text-sm" fallback="Link soon">Amazon</AffiliateLink>
              </div>
            </article>
          ))}
          </div>
          {products.length > 0 && (
            <div className="mt-9 flex justify-center">
              <Link to="/products" className="inline-flex items-center gap-2 rounded-full border border-gray-900 px-6 py-3 text-sm font-semibold text-gray-950 transition-colors hover:bg-gray-950 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
                View all products <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default FeaturedProductsGrid;
