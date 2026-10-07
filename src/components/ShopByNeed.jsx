import { Link } from 'react-router-dom';

const needs = [
  { id: 1, title: 'Small Kitchens', image: '/homepage/need-small-kitchens.webp', link: '/collections/small-kitchen-essentials' },
  { id: 2, title: 'Storage Solutions', image: '/homepage/need-storage-solutions.webp', link: '/collections/smart-kitchen-tech' },
  { id: 3, title: 'Modern Upgrades', image: '/homepage/need-modern-upgrades.webp', link: '/collections/luxury-kitchen-must-haves' },
  { id: 4, title: 'Budget Friendly', image: '/homepage/need-budget-friendly.webp', link: '/collections/budget-friendly-upgrades' },
];

const ShopByNeed = () => {
  return (
    <section className="w-full bg-[#f4f7f9] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-black text-center mb-10">
          Shop by Kitchen Need
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
          {needs.map((need) => (
            <Link 
              key={need.id}
              to={need.link}
              className="flex flex-col items-center group"
            >
              <div className="w-full bg-white p-2 rounded-2xl shadow-sm group-hover:shadow-md transition-shadow duration-300">
                <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 rounded-xl overflow-hidden">
                  <img
                    src={need.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              <span className="mt-4 text-base font-semibold text-black group-hover:text-gray-600 transition-colors">
                {need.title}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ShopByNeed;
