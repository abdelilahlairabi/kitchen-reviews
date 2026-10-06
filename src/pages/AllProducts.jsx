import ProductFilters from '../components/ProductFilters';
import ProductGrid from '../components/ProductGrid';
import PageMeta from '../components/PageMeta';

const AllProducts = () => {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <PageMeta title="Kitchen Products & Reviews | KitchenTrusted" description="Browse kitchen product reviews and recommendations. Filter by category, price, and rating to find options for your home." />
      <ProductFilters />
      <ProductGrid />
    </div>
  );
};

export default AllProducts;
