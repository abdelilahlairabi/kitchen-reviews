import { Link } from 'react-router-dom';

const categoriesData = [
  { name: 'Bakeware', count: '136 Items', image: '/categories/category-bakeware.jpeg' },
  { name: 'Cabinets', count: '142 products', image: '/categories/category-cabinets.jpeg' },
  { name: 'Cookware', count: '142 products', image: '/categories/category-cookware.jpeg' },
  { name: 'Countertops', count: '142 products', image: '/categories/category-countertops.jpeg' },
  { name: 'Faucets', count: '142 products', image: '/categories/category-faucets.jpeg' },
  { name: 'Kitchen Islands', count: '42 Items', image: '/categories/category-kitchen-islands.jpeg' },
  { name: 'Kitchen Stands', count: '122 Items', image: '/categories/category-kitchen-stands.jpeg' },
  { name: 'Lighting', count: '142 products', image: '/categories/category-lighting.jpeg' },
  { name: 'Sinks', count: '142 products', image: '/categories/category-sinks.jpeg' },
  { name: 'Small Appliances', count: '185 Items', image: '/categories/category-small-appliances.jpeg' },
  { name: 'Storage & Organization', count: '214 Items', image: '/categories/category-storage-organization.jpeg' },
  { name: 'Utensil Organizers', count: '150 Items', image: '/categories/category-utensil-organizers.jpeg' },
  { name: 'Utensils', count: '270 Items', image: '/categories/category-utensils.jpeg' },
  { name: 'Water Filters', count: '58 Items', image: '/categories/category-water-filters.jpeg' }
];

const CategoriesGrid = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <h2 className="text-xl font-bold text-black mb-6">All Categories</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categoriesData.map((cat, index) => (
          <Link 
            key={index} 
            to={`/category/${cat.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} 
            className="group block bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            {/* Image Container */}
            <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              {/* Subtle gradient overlay at the bottom of the image */}
              <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-white/80 to-transparent"></div>
            </div>
            
            {/* Text Content */}
            <div className="p-5 flex justify-between items-center bg-white relative z-10">
              <div>
                <h3 className="text-lg font-bold text-black mb-1">{cat.name}</h3>
                <p className="text-sm text-gray-500">{cat.count}</p>
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