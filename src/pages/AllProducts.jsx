import ProductFilters from '../components/ProductFilters';
import ProductGrid from '../components/ProductGrid';

const AllProducts = () => {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <ProductFilters />
      <ProductGrid />
    </div>
  );
};

export default AllProducts;