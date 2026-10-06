import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const categories = ['All Guides', 'Buying Guides', 'How-To', 'Comparisons', 'Trends'];

const GuidesHeader = ({ activeCategory, onCategoryChange, search, onSearchChange, resultCount }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
      <nav aria-label="Breadcrumb" className="text-xs text-gray-500 mb-10 flex justify-start">
        <Link to="/" className="hover:text-black">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Guides</span>
      </nav>

      <div className="max-w-3xl mx-auto text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-[#9b7049] font-semibold mb-3">KitchenTrusted learning center</p>
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-950 mb-4 tracking-tight">
        Kitchen Buying Guides & Tips
      </h1>
      <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
        Clear, practical advice for choosing kitchen products, planning upgrades, and caring for the tools you use every day.
      </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 border-y border-gray-200 py-5">
        <div className="flex flex-wrap gap-2" aria-label="Filter guides by type">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${activeCategory === category ? 'bg-gray-950 text-white border-gray-950' : 'bg-white text-gray-700 border-gray-300 hover:border-gray-950'}`}
            >
              {category}
            </button>
          ))}
        </div>
        <label className="relative block w-full md:max-w-xs">
          <span className="sr-only">Search kitchen guides</span>
          <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search guides"
            className="w-full rounded-full border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
          />
        </label>
      </div>
      <p className="text-sm text-gray-500 mt-4" aria-live="polite">{resultCount} {resultCount === 1 ? 'guide' : 'guides'}</p>
    </div>
  );
};

export default GuidesHeader;
