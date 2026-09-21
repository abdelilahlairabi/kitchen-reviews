import { useState } from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';

const filters = ['All', 'Top Rated'];

const FeaturedProductsGrid = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const { data, isPending, isError } = useProducts({ page: 1, pageSize: 12, sort: 'popularity' });
  const products = (data?.products || []).filter((product) => activeFilter !== 'Top Rated' || product.rating >= 4.8);

  return <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"><div className="flex flex-col items-center mb-12"><span className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">FEATURED PRODUCTS</span><h2 className="text-3xl font-bold text-black mb-6">Featured Products</h2><div className="flex gap-3">{filters.map((filter) => <button key={filter} type="button" onClick={() => setActiveFilter(filter)} className={`px-5 py-1.5 rounded-full text-sm font-semibold border border-black transition-colors ${activeFilter === filter ? 'bg-[#dcb589] text-black' : 'bg-white text-black hover:bg-gray-50'}`}>{filter}</button>)}</div></div>
    {isPending ? <p className="py-8 text-center text-gray-500">Loading featured products...</p> : isError ? <p className="py-8 text-center text-gray-500">Featured products are unavailable right now.</p> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{products.length === 0 ? <p className="col-span-full text-center text-gray-500">No products found for this filter.</p> : products.map((product) => <article key={product.id} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col hover:shadow-lg transition-shadow duration-300"><div className="w-full h-48 bg-[#f8f9fa] rounded-lg mb-4 flex items-center justify-center p-4"><img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain mix-blend-multiply" loading="lazy" /></div><Link to={`/product/${product.slug}`} className="text-sm font-extrabold text-black mb-1 truncate hover:text-gray-600 transition-colors">{product.name}</Link><p className="text-sm font-extrabold text-black mb-2">${product.price.toFixed(2)}</p><div className="flex items-center gap-1 mb-4 mt-auto" aria-label={`${product.rating} out of 5 stars`}>{[...Array(5)].map((_, index) => <Star key={index} className={`w-3.5 h-3.5 ${index < Math.round(product.rating) ? 'fill-[#dcb589] text-[#dcb589]' : 'fill-gray-200 text-gray-200'}`} />)}</div><div className="grid grid-cols-2 gap-2"><Link to={`/product/${product.slug}`} className="block text-center border border-gray-300 hover:border-gray-500 py-2.5 rounded-md text-sm font-bold text-black transition-colors">Details</Link><a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow sponsored" className="block text-center bg-[#dcb589] hover:bg-[#cba478] py-2.5 rounded-md text-sm font-bold text-black transition-colors">Amazon</a></div></article>)}</div>}
  </section>;
};

export default FeaturedProductsGrid;
