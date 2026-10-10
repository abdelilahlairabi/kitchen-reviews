import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';
import { getCategoryHeroSrcSet } from '../../utils/categoryImageSrcSets';

const CategoriesGrid = () => {
  return (
    <div className="mx-auto mb-12 max-w-6xl px-4 sm:mb-16 sm:px-6 lg:px-8">
      <h2 className="mb-4 text-lg font-bold text-black sm:mb-6 sm:text-xl">All Categories</h2>

      <div className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:gap-6 md:grid-cols-3">
        {categories.map((cat) => (
          <Link 
            key={cat.slug}
            to={`/category/${cat.slug}`}
            className="group block overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 sm:aspect-auto sm:h-64">
              <img
                src={cat.heroImage}
                srcSet={getCategoryHeroSrcSet(cat)}
                sizes="(max-width: 359px) calc(100vw - 58px), (max-width: 639px) calc((100vw - 96px) / 2), (max-width: 767px) calc((100vw - 140px) / 2), (max-width: 1023px) calc((100vw - 198px) / 3), (max-width: 1279px) calc((100vw - 238px) / 3), 305px"
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute bottom-0 h-1/3 w-full bg-gradient-to-t from-white/80 to-transparent"></div>
            </div>

            <div className="relative z-10 flex min-h-[96px] items-center justify-between gap-2 bg-white p-3 sm:min-h-0 sm:gap-4 sm:p-5">
              <div className="min-w-0">
                <h3 className="mb-1 line-clamp-2 text-sm font-bold leading-5 text-black sm:text-lg sm:leading-normal">{cat.name}</h3>
                <p className="line-clamp-2 text-xs leading-4 text-gray-500 sm:text-sm sm:leading-normal">{cat.description}</p>
              </div>
              <div className="shrink-0 text-black transition-transform group-hover:translate-x-1">
                <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
