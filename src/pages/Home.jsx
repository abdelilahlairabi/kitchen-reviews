import { lazy, Suspense } from 'react';
import Hero from '../components/Hero';
import KitchenInspiration from '../components/KitchenInspiration';
import ShopByNeed from '../components/ShopByNeed';
import HomeProductShelves from '../components/HomeProductShelves';
import ProductGridSkeleton from '../components/ProductGridSkeleton';

const FeaturedProductsGrid = lazy(() => import('../components/FeaturedProductsGrid'));

function FeaturedProductsFallback() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-busy="true">
      <span className="sr-only" role="status">Loading featured products</span>
      <div className="mb-10 flex justify-center text-center">
        <h2 className="text-3xl font-bold text-black">Featured Products</h2>
      </div>
      <ProductGridSkeleton variant="featured" />
    </section>
  );
}

const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <ShopByNeed />
      <Suspense fallback={<FeaturedProductsFallback />}><FeaturedProductsGrid /></Suspense>
      <KitchenInspiration />
      <HomeProductShelves />
    </div>
  );
};

export default Home;
