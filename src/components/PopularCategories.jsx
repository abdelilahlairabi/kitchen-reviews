import { Link } from 'react-router-dom';
import { categories } from '../data/categories';

const popularSlugs = ['cookware', 'small-appliances', 'sinks', 'faucets', 'storage-organization'];
const popularCategories = popularSlugs
  .map((slug) => categories.find((category) => category.slug === slug))
  .filter(Boolean);
const sourceDimensions = {
  cookware: [672, 502],
  'small-appliances': [672, 502],
  sinks: [1024, 1024],
  faucets: [1024, 1024],
  'storage-organization': [672, 502],
};

const PopularCategories = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-12">
      {/* Section Title */}
      <h2 className="text-2xl sm:text-3xl font-extrabold text-black text-center mb-10">
        Popular Categories
      </h2>

      <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12">
        {popularCategories.map((category) => (
          <Link 
            key={category.name}
            to={`/category/${category.slug}`}
            className="flex flex-col items-center group"
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border border-gray-200 bg-white flex items-center justify-center overflow-hidden group-hover:shadow-lg transition-all duration-300">
              <img
                src={category.heroImage}
                srcSet={`/categories/category-${category.slug}-card.webp 440w, ${category.heroImage} ${sourceDimensions[category.slug][0]}w`}
                sizes="(min-width: 768px) 160px, 96px"
                alt=""
                aria-hidden="true"
                width={sourceDimensions[category.slug][0]}
                height={sourceDimensions[category.slug][1]}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                decoding="async"
              />
            </div>
            <span className="mt-4 text-sm sm:text-base font-semibold text-black group-hover:text-gray-600 transition-colors">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularCategories;
