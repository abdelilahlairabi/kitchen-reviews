import { Link } from 'react-router-dom';

const AboutHeader = () => {
  return (
    <div>
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-xs text-gray-500 flex justify-start">
        <Link to="/" className="hover:text-black">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">About</span>
      </nav>
      
      <div 
        className="w-full h-48 md:h-64 bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: "url('/about/about-header-banner.jpeg')" }} /*[cite: 25] */
      >
        <div className="absolute inset-0 bg-white/60"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-3">About Us</h1>
          <p className="text-gray-800 font-medium max-w-lg mx-auto">
            Kitchen affiliate logans to trustign's space for kitchen e-commerce websites.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutHeader;