import { lazy, Suspense } from 'react';
import FeaturedSection from '../components/FeaturedSection';
import Hero from '../components/Hero';
import KitchenInspiration from '../components/KitchenInspiration';
import Newsletter from '../components/Newsletter';
import PopularCategories from '../components/PopularCategories';
import ShopByNeed from '../components/ShopByNeed';
import ProductGridSkeleton from '../components/ProductGridSkeleton';

const BestSellers = lazy(() => import('../components/BestSellers'));
const FeaturedProductsGrid = lazy(() => import('../components/FeaturedProductsGrid'));
const AmazonDeals = lazy(() => import('../components/AmazonDeals'));

function BestSellersFallback() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-busy="true">
      <span className="sr-only" role="status">Loading best sellers</span>
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Curated Kitchen Furniture &amp; Appliance Reviews</h2>
        <p className="text-gray-600 text-lg">Discover Top Recommendations for a Beautiful, Functional Home</p>
      </div>
      <div className="text-center mb-8">
        <span className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2 block">BEST SELLERS / TRENDING</span>
        <h3 className="text-2xl font-bold text-black">Best Sellers on Amazon</h3>
      </div>
      <ProductGridSkeleton variant="bestSellers" />
    </section>
  );
}

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

function AmazonDealsFallback() {
  return (
    <section className="w-full bg-[#f4f6f8] py-16" aria-busy="true">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="sr-only" role="status">Loading deals</span>
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest text-gray-600 uppercase mb-2 block">DEALS / AMAZON PICKS</span>
          <h2 className="text-3xl font-bold text-black">Today&apos;s Amazon Deals</h2>
        </div>
        <ProductGridSkeleton variant="deals" />
      </div>
    </section>
  );
}

const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <PopularCategories />
      <FeaturedSection />
      <Suspense fallback={<BestSellersFallback />}><BestSellers /></Suspense>
      <ShopByNeed />
      <Suspense fallback={<FeaturedProductsFallback />}><FeaturedProductsGrid /></Suspense>
      <KitchenInspiration />
      <Suspense fallback={<AmazonDealsFallback />}><AmazonDeals /></Suspense>
      <Newsletter />
    </div>
  );
};

export default Home;
