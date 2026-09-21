import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="relative rounded-2xl overflow-hidden min-h-[400px] md:min-h-[500px] lg:min-h-[550px] flex items-center">
        
        {/* Background Image */}
        {/* Assure-toi que le nom du fichier correspond à ton image dans le dossier public */}
        <img 
          src="/homepage/hero-modern-kitchen.jpeg" 
          alt="Modern Kitchen" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent sm:w-3/4 md:w-2/3 lg:w-1/2"></div>

        {/* Content */}
        <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black leading-tight tracking-tight mb-4">
            Find the best<br />
            kitchen products<br />
            Reviews to ldarn.
          </h1>
          
          <p className="text-base sm:text-lg text-gray-700 mb-8 max-w-md">
            Find our best kitchen products mlot to<br />
            kitchen, and new years.
          </p>

          <Link 
            to="/collections" 
            className="inline-block bg-[#dcb589] hover:bg-[#cba478] text-black font-semibold py-3 px-6 rounded-md transition-colors"
          >
            Explore Top Picks
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;