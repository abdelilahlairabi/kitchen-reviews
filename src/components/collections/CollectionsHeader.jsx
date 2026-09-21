import { Link } from 'react-router-dom';

const CollectionsHeader = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8 text-center">
      <nav className="text-xs text-gray-500 mb-8 flex justify-start">
        <Link to="/" className="hover:text-black">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Collections</span>
      </nav>

      <h1 className="text-4xl font-extrabold text-black mb-3">
        Curated Kitchen Collections
      </h1>
      <p className="text-gray-600 text-sm">
        Hand-picked product sets designed for every kitchen style and need
      </p>
    </div>
  );
};

export default CollectionsHeader;