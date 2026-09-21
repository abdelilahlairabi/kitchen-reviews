import { Link } from 'react-router-dom';

const GuidesHeader = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8 text-center">
      <nav className="text-xs text-gray-500 mb-8 flex justify-start">
        <Link to="/" className="hover:text-black">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Guides</span>
      </nav>

      <h1 className="text-4xl font-extrabold text-black mb-3">
        Kitchen Buying Guides & Tips
      </h1>
      <p className="text-gray-600 text-sm mb-10">
        Expert advice to help you choose the right products for your kitchen
      </p>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3">
        <button className="px-5 py-2 rounded-full border border-gray-300 text-sm font-medium hover:border-black transition-colors">All Guides</button>
        <button className="px-5 py-2 rounded-full bg-[#ebd5b3] text-black border border-transparent text-sm font-medium">Buying Guides</button>
        <button className="px-5 py-2 rounded-full border border-gray-300 text-sm font-medium hover:border-black transition-colors">How-To</button>
        <button className="px-5 py-2 rounded-full border border-gray-300 text-sm font-medium hover:border-black transition-colors">Comparisons</button>
        <button className="px-5 py-2 rounded-full border border-gray-300 text-sm font-medium hover:border-black transition-colors">Trends</button>
      </div>
    </div>
  );
};

export default GuidesHeader;