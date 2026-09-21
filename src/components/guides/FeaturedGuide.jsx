import { Link } from 'react-router-dom';

const FeaturedGuide = ({ guide, isLoading }) => {
  if (isLoading) return <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"><div className="h-[350px] md:h-[450px] rounded-3xl bg-gray-100 animate-pulse" /></div>;
  if (!guide) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div 
        className="relative w-full h-[350px] md:h-[450px] rounded-3xl overflow-hidden bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url('${guide.image}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
        
        <div className="relative z-10 p-8 md:p-12 max-w-xl">
          <span className="bg-[#ebd5b3] text-black text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">
            Featured
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            {guide.title}
          </h2>
          <p className="text-gray-300 text-sm mb-6">
            By {guide.author?.name || 'Kitchen Experts'} • {guide.time}
          </p>
          <Link 
            to={`/guides/${guide.slug}`} 
            className="inline-block bg-[#ebd5b3] hover:bg-[#dcb589] text-black font-bold px-6 py-2.5 rounded-lg transition-colors"
          >
            Read Guide
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedGuide;
