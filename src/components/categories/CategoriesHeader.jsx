import { Link } from 'react-router-dom';

const CategoriesHeader = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 text-center">
      <nav className="text-xs text-gray-500 mb-10 flex justify-start">
        <Link to="/" className="hover:text-black">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Categories</span>
      </nav>

      <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-4">
        Shop by Category
      </h1>
      <p className="text-gray-600 text-sm">
        Find the perfect products for every part of your kitchen
      </p>
    </div>
  );
};

export default CategoriesHeader;