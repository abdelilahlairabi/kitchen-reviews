import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';

const CategoriesGrid = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <h2 className="text-xl font-bold text-black mb-6">All Categories</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link 
            key={cat.slug}
            to={`/category/${cat.slug}`}
            className="group block bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
              <img
                src={cat.heroImage}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-white/80 to-transparent"></div>
            </div>

            <div className="p-5 flex justify-between items-center bg-white relative z-10">
              <div>
                <h3 className="text-lg font-bold text-black mb-1">{cat.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{cat.description}</p>
              </div>
              <div className="text-black group-hover:translate-x-1 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesGrid;
