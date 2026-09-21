import { Link } from 'react-router-dom';

const FeaturedSection = () => {
  return (
    <section className="w-full bg-[#f4f7f9] py-16 sm:py-24 my-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Main Image */}
          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-sm">
            <img 
              src="/homepage/featured-kitchen.jpeg" 
              alt="Kitchen interior" 
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Right Column: Content */}
          <div className="flex flex-col items-start lg:pl-8">
            {/* Pill Badge */}
            <span className="inline-block bg-[#dcb589] text-black text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              Products
            </span>

            {/* Main Title */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black leading-tight tracking-tight mb-6">
              What does your<br />
              kitchen need?
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 mb-10 max-w-md">
              Find well-reviewed essentials for every kitchen and<br className="hidden sm:block" />
              create a space that feels like your own.
            </p>

            {/* Small Product Images Row */}
            <div className="flex items-center gap-6 sm:gap-10">
              <Link to="/category/cabinets" className="group">
                <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-xl shadow-sm flex items-center justify-center p-4 group-hover:shadow-md transition-shadow">
                  <img 
                    src="/homepage/cat-cabinets.jpeg" 
                    alt="Cabinet" 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
              
              <Link to="/category/faucets" className="group">
                <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-xl shadow-sm flex items-center justify-center p-4 group-hover:shadow-md transition-shadow">
                  <img 
                    src="/homepage/cat-faucets.jpeg" 
                    alt="Faucet" 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
