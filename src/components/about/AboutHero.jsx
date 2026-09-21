import { Link } from 'react-router-dom';

const AboutHero = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
            We Help You Find the Perfect Kitchen Products
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Simplify your kitchen shopping journey with honest reviews, expert recommendations, and carefully curated selections designed for every home cook.
          </p>
          <Link 
            to="/products" 
            className="inline-block bg-[#ebd5b3] hover:bg-[#dcb589] text-black font-bold px-8 py-3 rounded-lg transition-colors"
          >
            Browse Products
          </Link>
        </div>
        <div className="flex-1 w-full">
          <img 
            src="/about/about-hero-woman-cooking.jpeg" /*[cite: 25] */
            alt="Woman cooking in kitchen" 
            className="w-full h-auto rounded-3xl object-cover shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutHero;