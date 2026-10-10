import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from './ProductCard';
import ProductGridSkeleton from './ProductGridSkeleton';
import ProductGridError from './ProductGridError';
import { rankFeaturedProducts } from '../utils/featuredProductRanking';
import { getAmazonImageSrcSets } from '../utils/amazonImageSrcSets';

const FEATURED_PRODUCT_COUNT = 8;

const getProductImageSrcSet = (image) => {
  if (!/^\/products\/product-(stand-mixer|pressure-cooker|coffee-maker|blender)\.jpeg$/.test(image)) return undefined;
  return `${image.replace('.jpeg', '-336.jpeg')} 336w, ${image} 672w`;
};

const FeaturedProductsGrid = () => {
  const { data, isPending, isError } = useProducts({
    page: 1,
    // Rank a broad popularity pool by review confidence, then diversify categories and brands.
    pageSize: 24,
    sort: 'popularity',
  });
  const products = rankFeaturedProducts(data?.products || [], FEATURED_PRODUCT_COUNT);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-busy={isPending}>
      <div className="mb-10 flex justify-center text-center">
        <h2 className="text-3xl font-bold text-black">Featured Products</h2>
      </div>
      {isPending ? (
        <><span className="sr-only" role="status">Loading featured products</span><ProductGridSkeleton variant="featured" /></>
      ) : isError ? (
        <ProductGridError variant="featured" message="Featured products are unavailable right now." />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {products.length === 0 ? <p className="col-span-full text-center text-gray-500">No products found for this filter.</p> : products.map((product, index) => <div key={product.id} className={index >= 4 ? 'hidden lg:block' : ''}><ProductCard product={product} imageSizes="(max-width: 359px) calc(100vw - 56px), (max-width: 639px) calc((100vw - 92px) / 2), (max-width: 1023px) calc((100vw - 136px) / 2), (max-width: 1279px) calc((100vw - 168px) / 4), 284px" imageSrcSet={getAmazonImageSrcSets(product.image).srcSet || getProductImageSrcSet(product.image)} /></div>)}
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
