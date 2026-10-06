import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const CollectionsHeader = ({ search, onSearchChange, resultCount }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-7">
      <nav aria-label="Breadcrumb" className="text-xs text-gray-500 mb-10 flex justify-start">
        <Link to="/" className="hover:text-black">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Collections</span>
      </nav>

      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-[#8c6744] font-semibold mb-3">Shop with a starting point</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-950 tracking-tight mb-4">Kitchen collections for real-life needs</h1>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed">Explore focused product shortlists for different kitchen styles, routines, and spaces. Each collection links to live catalog products so you can compare details before deciding.</p>
      </div>
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-y border-gray-200 py-5">
        <p className="text-sm text-gray-500" aria-live="polite">{resultCount} {resultCount === 1 ? 'collection' : 'collections'}</p>
        <label className="relative block w-full sm:max-w-xs">
          <span className="sr-only">Search kitchen collections</span>
          <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
          <input type="search" value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search collections" className="w-full rounded-full border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10" />
        </label>
      </div>
    </div>
  );
};

export default CollectionsHeader;
