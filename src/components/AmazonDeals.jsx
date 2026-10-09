import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import AffiliateLink from './AffiliateLink';
import ProductImageFrame from './ProductImageFrame';
import ProductGridSkeleton from './ProductGridSkeleton';
import ProductGridError from './ProductGridError';
import SaveProductButton from './SaveProductButton';

const AmazonDeals = () => {
  const { data, isPending, isError } = useProducts({ hasDiscount: true, page: 1, pageSize: 3, sort: 'discount' });
  const deals = data?.products || [];

  return (
    <section className="w-full bg-[#f4f6f8] py-16" aria-busy={isPending}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest text-gray-600 uppercase mb-2 block">DEALS / AMAZON PICKS</span>
          <h2 className="text-3xl font-bold text-black">Today&apos;s Amazon Deals</h2>
        </div>
        {isPending ? (
          <><span className="sr-only" role="status">Loading deals</span><ProductGridSkeleton variant="deals" /></>
        ) : isError ? (
          <ProductGridError variant="deals" message="Deals are unavailable right now." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deals.length === 0 ? <p className="col-span-full text-center text-gray-500">No deals available right now.</p> : deals.map((deal) => (
              <article key={deal.id} className="min-h-[500px] bg-white rounded-xl p-5 flex flex-col relative hover:shadow-lg transition-shadow duration-300">
                <ProductImageFrame src={deal.image} alt={deal.name} className="mb-5 mt-6">
                  <span className="absolute left-3 top-3 z-10 rounded-full bg-red-700 px-2.5 py-1 text-xs font-bold text-white">{deal.discountPercent}% OFF</span>
                  <SaveProductButton product={deal} className="absolute right-2 top-2 z-10" />
                </ProductImageFrame>
                <Link to={`/product/${deal.slug}`} className="text-sm font-bold text-black line-clamp-2 min-h-[40px] mb-3 hover:text-gray-600 transition-colors">{deal.name}</Link>
                <div className="mb-3"><span className="bg-[#232f3e] text-white text-[11px] font-bold px-2 py-1 inline-block">{deal.badge || "Amazon's Choice"}</span></div>
                <div className="mb-4 mt-auto">
                  {deal.originalPrice && <div className="text-gray-600 text-sm line-through font-medium">${deal.originalPrice.toFixed(2)}</div>}
                  <div className="text-[#7a4f26] text-2xl font-extrabold">${deal.price.toFixed(2)}</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link to={`/product/${deal.slug}`} aria-label={`Details for ${deal.name}`} className="block text-center border border-gray-300 hover:border-gray-500 py-2.5 rounded-md text-sm font-bold text-black transition-colors">Details</Link>
                  <AffiliateLink href={deal.affiliateUrl} className="block text-center bg-[#dcb589] hover:bg-[#cba478] py-2.5 rounded-md text-sm font-bold text-black transition-colors aria-disabled:opacity-50 aria-disabled:cursor-not-allowed" fallback="Link soon">Amazon</AffiliateLink>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AmazonDeals;
