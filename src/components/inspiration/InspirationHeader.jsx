import { Link } from 'react-router-dom';

export default function InspirationHeader({ categories, activeCategory, onSelectCategory }) {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-7 pb-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-gray-500 mb-10 flex items-center gap-2">
        <Link to="/" className="hover:underline">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Inspiration</span>
      </nav>

      {/* Titre & Sous-titre */}
      <div className="max-w-3xl mx-auto text-center mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-[#8c6744] font-semibold mb-3">Design ideas to make your own</p>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-950 tracking-tight mb-4">Kitchen design inspiration</h1>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed">Explore three distinct kitchen styles, discover the materials and details behind each one, and open a practical guide for more ideas.</p>
      </div>

      {/* Filtres par style */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3" role="group" aria-label="Filter kitchen styles">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-[#D4A373] text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
