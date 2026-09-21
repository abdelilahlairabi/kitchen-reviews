import { Link } from 'react-router-dom';

const categories = [
  { name: 'Cabinets', image: '/homepage/category-cabinets.jpeg', link: '/categories/cabinets' },
  { name: 'Countertops', image: '/homepage/category-countertops.jpeg', link: '/categories/countertops' },
  { name: 'Sinks', image: '/homepage/category-sinks.jpeg', link: '/categories/sinks' },
  { name: 'Faucets', image: '/homepage/category-faucets.jpeg', link: '/categories/faucets' },
  { name: 'Lighting', image: '/homepage/category-lighting.jpeg', link: '/categories/lighting' },
];

const PopularCategories = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-12">
      {/* Section Title */}
      <h2 className="text-2xl sm:text-3xl font-extrabold text-black text-center mb-10">
        Popular Categories
      </h2>
      
      {/* Categories Row */}
      <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12">
        {categories.map((category) => (
          <Link 
            key={category.name} 
            to={category.link}
            className="flex flex-col items-center group"
          >
            {/* Circular Image Container with overflow-hidden to clip the square corners */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border border-gray-200 bg-white flex items-center justify-center overflow-hidden group-hover:shadow-lg transition-all duration-300">
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            {/* Category Label */}
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