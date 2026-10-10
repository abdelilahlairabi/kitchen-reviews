import { Link, useSearchParams } from 'react-router-dom';
import AffiliateLink from '../AffiliateLink';
import ProductImageFrame from '../ProductImageFrame';
import SaveProductButton from '../SaveProductButton';
import { getAmazonImageSrcSets } from '../../utils/amazonImageSrcSets';

const CategoryProductGrid = ({ products, total, pageSize, page }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const changePage = (nextPage) => {
    const params = new URLSearchParams(searchParams);
    if (nextPage <= 1) params.delete('page'); else params.set('page', String(nextPage));
    setSearchParams(params);
  };

  return <div className="mx-auto mb-16 max-w-6xl px-4 sm:px-6 lg:px-8"><div className="mb-10 grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
    {products.length === 0 ? <p className="col-span-full text-center text-gray-500 py-12">No products found in this category yet.</p> : products.map((product) => {
      const imageSrcSets = getAmazonImageSrcSets(product.image);
      return <article key={product.id} className="relative flex flex-col rounded-xl border border-gray-200 bg-white p-3 transition-shadow hover:shadow-md sm:p-4">
      <ProductImageFrame src={product.image} {...imageSrcSets} sizes="(max-width: 359px) calc(100vw - 58px), (max-width: 639px) calc((100vw - 96px) / 2), (max-width: 1023px) calc(50vw - 64px), (max-width: 1279px) calc((100vw - 144px) / 3), 246px" alt={product.name} className="mb-3 sm:mb-4">
        {product.badge && <span className="absolute left-2 top-2 z-10 rounded-full bg-white/95 px-2 py-1 text-[9px] font-semibold uppercase text-gray-900 sm:left-3 sm:top-3 sm:px-2.5 sm:text-[10px]">{product.badge}</span>}
        <SaveProductButton product={product} className="absolute right-2 top-2 z-10" />
      </ProductImageFrame>
      <Link to={`/product/${product.slug}`} className="mb-1 line-clamp-3 min-h-[60px] transition-colors hover:text-gray-600 sm:line-clamp-2 sm:min-h-[40px]"><h2 className="text-xs font-bold leading-5 text-black sm:text-sm">{product.name}</h2></Link>
      <div className="mb-2 flex min-w-0 items-center gap-1"><div className="flex shrink-0 gap-0.5 text-xs sm:text-sm" role="img" aria-label={`${product.rating} out of 5 stars`}>{[...Array(5)].map((_, index) => <span key={index} className={index < Math.round(product.rating) ? 'text-[#a0aec0]' : 'text-gray-200'}>★</span>)}</div><span className="ml-0.5 truncate text-[10px] text-gray-500 sm:ml-1 sm:text-xs">{product.rating} ({product.reviewCount.toLocaleString()})</span></div>
      <div className="mb-3 mt-auto flex flex-wrap items-baseline gap-x-2 gap-y-1 sm:mb-4"><p className="text-sm font-extrabold text-black sm:text-base">${product.price.toFixed(2)}</p>{product.originalPrice && <span className="text-xs text-gray-600 line-through sm:text-sm">${product.originalPrice.toFixed(2)}</span>}{product.discountPercent && <span className="text-[10px] font-bold text-red-700 sm:text-xs">-{product.discountPercent}%</span>}</div>
      <div className="grid grid-cols-2 gap-2"><Link to={`/product/${product.slug}`} aria-label={`View details for ${product.name}`} className="block min-h-10 rounded-md border border-gray-300 px-1 py-2.5 text-center text-[11px] font-bold text-black transition-colors hover:border-gray-500 sm:text-sm"><span className="sm:hidden">Details</span><span className="hidden sm:inline">View Details</span></Link><AffiliateLink href={product.affiliateUrl} className="block min-h-10 rounded-md bg-[#dcb589] px-1 py-2.5 text-center text-[11px] font-bold text-black transition-colors hover:bg-[#cba478] aria-disabled:opacity-50 aria-disabled:cursor-not-allowed sm:text-sm" fallback="Link soon">Amazon</AffiliateLink></div>
    </article>;
    })}</div>
    {totalPages > 1 && <nav className="flex justify-center items-center gap-2" aria-label="Category product pages"><button type="button" onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1} aria-label="Previous page" className="w-8 h-8 rounded text-gray-600 hover:bg-gray-100 disabled:text-gray-300">&lt;</button>{Array.from({ length: totalPages }, (_, index) => index + 1).map((item) => <button key={item} type="button" onClick={() => changePage(item)} aria-current={item === currentPage ? 'page' : undefined} className={`w-8 h-8 rounded text-sm ${item === currentPage ? 'bg-[#dcb589] font-bold text-black' : 'text-gray-600 hover:bg-gray-100'}`}>{item}</button>)}<button type="button" onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Next page" className="w-8 h-8 rounded text-gray-600 hover:bg-gray-100 disabled:text-gray-300">&gt;</button></nav>}
  </div>;
};

export default CategoryProductGrid;
