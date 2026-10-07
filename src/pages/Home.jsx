import { lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import KitchenInspiration from '../components/KitchenInspiration';
import Newsletter from '../components/Newsletter';
import PopularCategories from '../components/PopularCategories';
import ShopByNeed from '../components/ShopByNeed';
import ProductGridSkeleton from '../components/ProductGridSkeleton';

const FeaturedProductsGrid = lazy(() => import('../components/FeaturedProductsGrid'));

function FeaturedProductsFallback() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-busy="true">
      <span className="sr-only" role="status">Loading featured products</span>
      <div className="flex flex-col items-center mb-12">
        <span className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">FEATURED PRODUCTS</span>
        <h2 className="text-3xl font-bold text-black mb-6">Featured Products</h2>
        <div className="flex gap-3" aria-hidden="true">
          <span className="h-8 w-14 rounded-full bg-gray-200" />
          <span className="h-8 w-20 rounded-full bg-gray-200" />
        </div>
      </div>
      <ProductGridSkeleton variant="featured" />
    </section>
  );
}

const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <PopularCategories />
      <Suspense fallback={<FeaturedProductsFallback />}><FeaturedProductsGrid /></Suspense>
      <ShopByNeed />
      <KitchenInspiration />
      <Newsletter />
    </div>
  );
};

export default Home;
