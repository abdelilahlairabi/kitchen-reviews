import { Link } from 'react-router-dom';

const CategoriesCallToAction = () => {
  return (
    <div className="mb-6 w-full bg-gray-100 py-10 sm:mb-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="mb-3 text-xl font-bold text-black sm:text-2xl">
          Can't Find What You Need?
        </h2>
        <p className="mb-6 text-sm text-gray-600 sm:mb-8 sm:text-base">
          Explore our full catalog and compare trusted kitchen products
        </p>
        <Link 
          to="/products" 
          className="inline-block bg-[#ebd5b3] hover:bg-[#dcb589] text-black font-bold px-8 py-3 rounded-lg transition-colors"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default CategoriesCallToAction;
