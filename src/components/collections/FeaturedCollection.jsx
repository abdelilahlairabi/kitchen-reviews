import { Link } from 'react-router-dom';

const FeaturedCollection = ({ collection }) => {
  if (!collection) return null;
  return <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10"><div className="relative w-full h-[400px] rounded-3xl overflow-hidden bg-cover bg-center flex items-center" style={{ backgroundImage: `url('${collection.image}')` }}><div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" /><div className="relative z-10 p-10 md:p-16 max-w-lg"><span className="bg-[#ebd5b3] text-black text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">Featured</span><h2 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">{collection.name}</h2><p className="text-gray-200 text-sm mb-6">{collection.subtitle}</p><Link to={`/collections/${collection.slug}`} className="inline-block bg-[#ebd5b3] hover:bg-[#dcb589] text-black font-bold px-6 py-2.5 rounded-lg transition-colors">Explore Collection</Link></div></div></div>;
};

export default FeaturedCollection;
