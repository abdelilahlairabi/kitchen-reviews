import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';

const AmazonDeals = () => {
  const { data, isPending, isError } = useProducts({ hasDiscount: true, page: 1, pageSize: 3, sort: 'discount' });
  const deals = data?.products || [];

  return <section className="w-full bg-[#f4f6f8] py-16"><div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><div className="text-center mb-12"><span className="text-xs font-bold tracking-widest text-gray-600 uppercase mb-2 block">DEALS / AMAZON PICKS</span><h2 className="text-3xl font-bold text-black">Today's Amazon Deals</h2></div>
    {isPending ? <p className="py-8 text-center text-gray-500">Loading deals...</p> : isError ? <p className="py-8 text-center text-gray-500">Deals are unavailable right now.</p> : <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{deals.length === 0 ? <p className="col-span-full text-center text-gray-500">No deals available right now.</p> : deals.map((deal) => <article key={deal.id} className="bg-white rounded-xl p-5 flex flex-col relative hover:shadow-lg transition-shadow duration-300"><div className="absolute top-4 left-4 bg-[#c53030] text-white text-xs font-bold px-2.5 py-1 rounded-sm z-10">{deal.discountPercent}% OFF</div><div className="w-full h-56 mb-6 mt-6 flex items-center justify-center p-2"><img src={deal.image} alt={deal.name} className="max-w-full max-h-full object-contain" loading="lazy" /></div><Link to={`/product/${deal.slug}`} className="text-sm font-bold text-black line-clamp-2 min-h-[40px] mb-3 hover:text-gray-600 transition-colors">{deal.name}</Link><div className="mb-3"><span className="bg-[#232f3e] text-white text-[11px] font-bold px-2 py-1 inline-block">{deal.badge || "Amazon's Choice"}</span></div><div className="mb-4 mt-auto">{deal.originalPrice && <div className="text-gray-400 text-sm line-through font-medium">${deal.originalPrice.toFixed(2)}</div>}<div className="text-[#dcb589] text-2xl font-extrabold">${deal.price.toFixed(2)}</div></div><div className="grid grid-cols-2 gap-2"><Link to={`/product/${deal.slug}`} className="block text-center border border-gray-300 hover:border-gray-500 py-2.5 rounded-md text-sm font-bold text-black transition-colors">Details</Link><a href={deal.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow sponsored" className="block text-center bg-[#dcb589] hover:bg-[#cba478] py-2.5 rounded-md text-sm font-bold text-black transition-colors">Amazon</a></div></article>)}</div>}
  </div></section>;
};

export default AmazonDeals;
