import { Link } from 'react-router-dom';

const CategoriesCallToAction = () => {
  return (
    <div className="w-full bg-gray-100 py-16 mb-10">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-black mb-3">
          Can't Find What You Need?
        </h2>
        <p className="text-gray-600 mb-8">
          Browse our full product catalog or contact our kitchen experts
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