import { Link } from 'react-router-dom';

const CategoriesHeader = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-7 pt-6 text-center sm:px-6 sm:pb-10 sm:pt-8 lg:px-8">
      <nav className="mb-6 flex justify-start text-xs text-gray-500 sm:mb-10">
        <Link to="/" className="hover:text-black">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Categories</span>
      </nav>

      <h1 className="mb-3 text-3xl font-extrabold text-black sm:mb-4 sm:text-4xl md:text-5xl">
        Shop by Category
      </h1>
      <p className="text-sm text-gray-600">
        Find the perfect products for every part of your kitchen
      </p>
    </div>
  );
};

export default CategoriesHeader;
