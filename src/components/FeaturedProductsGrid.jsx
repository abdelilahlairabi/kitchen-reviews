import { useState } from 'react';
import { Star } from 'lucide-react';
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
  const { data, isPending, isError } = useProducts({ page: 1, pageSize: 12, sort: 'popularity' });
  const products = (data?.products || []).filter((product) => activeFilter !== 'Top Rated' || product.rating >= 4.8);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.length === 0 ? <p className="col-span-full text-center text-gray-500">No products found for this filter.</p> : products.map((product) => (
            <article key={product.id} className="min-h-[400px] bg-white border border-gray-200 rounded-xl p-4 flex flex-col hover:shadow-lg transition-shadow duration-300">
              <div className="w-full h-48 bg-[#f8f9fa] rounded-lg mb-4 flex items-center justify-center p-4">
                <img src={product.image} srcSet={getProductImageSrcSet(product.image)} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 336px" alt={product.name} width="672" height="672" className="max-w-full max-h-full object-contain mix-blend-multiply" loading="lazy" />
              </div>
              <Link to={`/product/${product.slug}`} className="text-sm font-extrabold text-black mb-1 truncate hover:text-gray-600 transition-colors">{product.name}</Link>
              <p className="text-sm font-extrabold text-black mb-2">${product.price.toFixed(2)}</p>
              <div className="flex items-center gap-1 mb-4 mt-auto" role="img" aria-label={`${product.rating} out of 5 stars`}>
                {[...Array(5)].map((_, index) => <Star key={index} aria-hidden="true" className={`w-3.5 h-3.5 ${index < Math.round(product.rating) ? 'fill-[#dcb589] text-[#dcb589]' : 'fill-gray-200 text-gray-200'}`} />)}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link to={`/product/${product.slug}`} aria-label={`Details for ${product.name}`} className="block text-center border border-gray-300 hover:border-gray-500 py-2.5 rounded-md text-sm font-bold text-black transition-colors">Details</Link>
                <AffiliateLink href={product.affiliateUrl} className="block text-center bg-[#dcb589] hover:bg-[#cba478] py-2.5 rounded-md text-sm font-bold text-black transition-colors aria-disabled:opacity-50 aria-disabled:cursor-not-allowed" fallback="Link soon">Amazon</AffiliateLink>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedProductsGrid;
