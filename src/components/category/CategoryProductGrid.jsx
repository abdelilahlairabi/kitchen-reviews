import { Link, useSearchParams } from 'react-router-dom';
import AffiliateLink from '../AffiliateLink';
import ProductImageFrame from '../ProductImageFrame';
import SaveProductButton from '../SaveProductButton';

const CategoryProductGrid = ({ products, total, pageSize, page }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const changePage = (nextPage) => {
    const params = new URLSearchParams(searchParams);
    if (nextPage <= 1) params.delete('page'); else params.set('page', String(nextPage));
    setSearchParams(params);
  };

  return <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
    {products.length === 0 ? <p className="col-span-full text-center text-gray-500 py-12">No products found in this category yet.</p> : products.map((product) => <article key={product.id} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col relative hover:shadow-md transition-shadow">
      <ProductImageFrame src={product.image} alt={product.name} className="mb-4">
        {product.badge && <span className="absolute left-3 top-3 z-10 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase text-gray-900">{product.badge}</span>}
        <SaveProductButton product={product} className="absolute right-2 top-2 z-10" />
      </ProductImageFrame>
      <Link to={`/product/${product.slug}`} className="mb-1 line-clamp-2 min-h-[40px] hover:text-gray-600 transition-colors"><h2 className="text-sm font-bold text-black">{product.name}</h2></Link>
      <div className="flex items-center gap-1 mb-4"><div className="flex gap-0.5" aria-label={`${product.rating} out of 5 stars`}>{[...Array(5)].map((_, index) => <span key={index} className={index < Math.round(product.rating) ? 'text-[#a0aec0]' : 'text-gray-200'}>★</span>)}</div><span className="text-xs text-gray-400 ml-1">({product.reviewCount.toLocaleString()})</span></div>
      <div className="flex justify-between items-center gap-2 mt-auto"><p className="text-lg font-extrabold text-black">${product.price.toFixed(2)}</p><div className="flex gap-2"><Link to={`/product/${product.slug}`} className="border border-gray-300 hover:border-gray-500 px-3 py-2 rounded text-xs font-bold text-black transition-colors">Details</Link><AffiliateLink href={product.affiliateUrl} className="bg-[#dcb589] hover:bg-[#cba478] px-3 py-2 rounded text-xs font-bold text-black transition-colors aria-disabled:opacity-50 aria-disabled:cursor-not-allowed" fallback="Link soon">Amazon</AffiliateLink></div></div>
    </article>)}</div>
    {totalPages > 1 && <nav className="flex justify-center items-center gap-2" aria-label="Category product pages"><button type="button" onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1} aria-label="Previous page" className="w-8 h-8 rounded text-gray-600 hover:bg-gray-100 disabled:text-gray-300">&lt;</button>{Array.from({ length: totalPages }, (_, index) => index + 1).map((item) => <button key={item} type="button" onClick={() => changePage(item)} aria-current={item === currentPage ? 'page' : undefined} className={`w-8 h-8 rounded text-sm ${item === currentPage ? 'bg-[#dcb589] font-bold text-black' : 'text-gray-600 hover:bg-gray-100'}`}>{item}</button>)}<button type="button" onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Next page" className="w-8 h-8 rounded text-gray-600 hover:bg-gray-100 disabled:text-gray-300">&gt;</button></nav>}
  </div>;
};

export default CategoryProductGrid;
