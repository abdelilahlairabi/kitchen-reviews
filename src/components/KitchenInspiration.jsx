import { Link } from 'react-router-dom';

const KitchenInspiration = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Section Title */}
      <h2 className="text-sm font-bold tracking-widest text-black text-center uppercase mb-10">
        Kitchen Inspiration
      </h2>
      
      {/* Asymmetric Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:h-[600px]">
        
        {/* Left Column: Large Vertical Image */}
        <Link 
          to="/inspiration/farmhouse" 
          className="relative block h-[400px] md:h-full rounded-2xl overflow-hidden group"
        >
          <img 
            src="/homepage/inspiration-modern-farmhouse.jpeg" 
            alt="Modern Farmhouse Kitchen" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {/* Dark Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity group-hover:opacity-100"></div>
          
          <div className="absolute bottom-8 inset-x-0 text-center">
            <span className="text-white text-xl sm:text-2xl font-medium tracking-wide">
              Modern Farmhouse
            </span>
          </div>
        </Link>

        {/* Right Column: Two Stacked Horizontal Images */}
        <div className="flex flex-col gap-4 h-[500px] md:h-full">
          
          {/* Top Right Image */}
          <Link 
            to="/inspiration/minimalist" 
            className="relative flex-1 block rounded-2xl overflow-hidden group"
          >
            <img 
              src="/homepage/inspiration-minimalist-white.jpeg" 
              alt="Minimalist White Kitchen" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity group-hover:opacity-100"></div>
            
            <div className="absolute bottom-6 inset-x-0 text-center">
              <span className="text-white text-lg sm:text-xl font-medium tracking-wide">
                Minimalist White
              </span>
            </div>
          </Link>

          {/* Bottom Right Image */}
          <Link 
            to="/inspiration/scandinavian" 
            className="relative flex-1 block rounded-2xl overflow-hidden group"
          >
            <img 
              src="/homepage/inspiration-warm-scandinavian.jpeg" 
              alt="Warm Scandinavian Kitchen" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity group-hover:opacity-100"></div>
            
            <div className="absolute bottom-6 inset-x-0 text-center">
              <span className="text-white text-lg sm:text-xl font-medium tracking-wide">
                Warm Scandinavian
              </span>
            </div>
          </Link>
          
        </div>

      </div>
    </section>
  );
};

export default KitchenInspiration;