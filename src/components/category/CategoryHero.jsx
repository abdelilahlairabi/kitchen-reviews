import { Link } from 'react-router-dom';

const CategoryHero = ({ category, productCount }) => (
  <div className="w-full">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4"><nav className="text-xs text-gray-500" aria-label="Breadcrumb"><Link to="/" className="hover:text-black">Home</Link><span className="mx-2">/</span><Link to="/categories" className="hover:text-black">Categories</Link><span className="mx-2">/</span><span className="text-gray-900 font-medium">{category.name}</span></nav></div>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8"><div className="relative w-full h-[280px] rounded-2xl overflow-hidden bg-gray-200 flex items-center" style={{ backgroundImage: `url('${category.heroImage}')`, backgroundSize: 'cover', backgroundPosition: 'center right' }}><div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" /><div className="relative z-10 px-8 md:px-12 max-w-lg"><h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 leading-tight">{category.name}</h1><p className="text-white/90 text-sm mb-6">{category.description}</p><span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-medium px-4 py-1.5 rounded-full">{productCount} {productCount === 1 ? 'product' : 'products'}</span></div></div></div>
  </div>
);

export default CategoryHero;
