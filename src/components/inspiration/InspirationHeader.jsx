import { Link } from 'react-router-dom';

export default function InspirationHeader({ categories, activeCategory, onSelectCategory }) {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-6 pb-8 text-center">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 mb-6 flex items-center justify-center gap-2">
        <Link to="/" className="hover:underline">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Inspiration</span>
      </nav>

      {/* Titre & Sous-titre */}
      <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
        Kitchen Inspiration
      </h1>
      <p className="text-gray-600 text-sm md:text-base mb-8">
        Real kitchens, real style — find the look that fits your space
      </p>

      {/* Filtres par style */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
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