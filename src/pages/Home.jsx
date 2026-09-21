import AmazonDeals from '../components/AmazonDeals';
import BestSellers from '../components/BestSellers';
import FeaturedProductsGrid from '../components/FeaturedProductsGrid';
import FeaturedSection from '../components/FeaturedSection';
import Hero from '../components/Hero';
import KitchenInspiration from '../components/KitchenInspiration';
import Newsletter from '../components/Newsletter';
import PopularCategories from '../components/PopularCategories';
import ShopByNeed from '../components/ShopByNeed';

const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <PopularCategories />
      <FeaturedSection />
      <BestSellers />
      <ShopByNeed />
      <FeaturedProductsGrid />
      <KitchenInspiration />
      <AmazonDeals />
      <Newsletter />
    </div>
  );
};

export default Home;