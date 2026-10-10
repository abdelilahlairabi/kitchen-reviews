import { Link, useSearchParams } from 'react-router-dom';
import AffiliateLink from './AffiliateLink';
import ProductImageFrame from './ProductImageFrame';
import { useProducts } from '../hooks/useProducts';
import { PRODUCT_PAGE_SIZE } from '../services/products';
import SaveProductButton from './SaveProductButton';
import { getAmazonImageSrcSets } from '../utils/amazonImageSrcSets';

const priceRanges = {
  'under-100': { maximumPrice: 99.99 },
  '100-200': { minimumPrice: 100, maximumPrice: 200 },
  '200-500': { minimumPrice: 200.01, maximumPrice: 500 },
  'over-500': { minimumPrice: 500.01 },
};

const StarIcon = ({ filled }) => (
  <svg className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill={filled ? '#dcb589' : '#e5e7eb'} stroke={filled ? '#dcb589' : '#e5e7eb'} strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ProductGrid = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const categorySlug = searchParams.get('category') || '';
  const productType = searchParams.get('type') || '';
  const brandName = searchParams.get('brand') || '';
  const price = searchParams.get('price') || '';
  const rating = Number(searchParams.get('rating')) || undefined;
  const sort = searchParams.get('sort') || 'popularity';
  const requestedPage = Math.max(1, Number(searchParams.get('page')) || 1);
  const { data, isPending, isFetching, isError } = useProducts({
    page: requestedPage,
    pageSize: PRODUCT_PAGE_SIZE,
    categorySlug: categorySlug || undefined,
    productType: productType || undefined,
    brandName: brandName || undefined,
    minimumRating: rating,
    ...priceRanges[price],
    search,
    sort,
  });

  const products = data?.products || [];
  const total = data?.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / PRODUCT_PAGE_SIZE));
  const currentPage = Math.min(requestedPage, totalPages);
  const pageButtons = Array.from({ length: totalPages }, (_, index) => index + 1)
    .filter((page) => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1);
  const changePage = (page) => {
    const params = new URLSearchParams(searchParams);
    if (page <= 1) params.delete('page'); else params.set('page', String(page));
    setSearchParams(params);
  };

  if (isPending) return <p className="py-16 text-center text-gray-500">Loading products...</p>;
  if (isError) return <p className="py-16 text-center text-gray-500">We could not load products right now. Please refresh and try again.</p>;

  return (
    <div className="w-full bg-white py-12" aria-busy={isFetching}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-gray-500 mb-6">{total} {total === 1 ? 'product' : 'products'} found</p>
        {products.length === 0 ? <p className="py-12 text-center text-gray-500">No products match your search and filters.</p> : (
          <div className="mb-12 grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, index) => {
              const { srcSet, webpSrcSet, avifSrcSet } = getAmazonImageSrcSets(product.image);
              return (
                <article key={product.id} className="flex flex-col rounded-xl border border-gray-200 bg-white p-3 transition-shadow duration-300 hover:shadow-lg sm:p-4">
                  <ProductImageFrame
                    src={product.image}
                    srcSet={srcSet}
                    webpSrcSet={webpSrcSet}
                    avifSrcSet={avifSrcSet}
                    sizes="(max-width: 359px) calc(100vw - 56px), (max-width: 639px) calc((100vw - 92px) / 2), (max-width: 1023px) calc(50vw - 64px), (max-width: 1279px) calc((100vw - 144px) / 3), 246px"
                    alt={product.name}
                    className="mb-3 sm:mb-4"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchPriority={index === 0 ? 'high' : undefined}
                  >
                    <SaveProductButton product={product} className="absolute right-2 top-2 z-10" />
                    {product.badge && <span className="absolute top-2 left-2 bg-[#dcb589] text-black text-xs font-bold px-2 py-1 rounded">{product.badge}</span>}
                  </ProductImageFrame>
                  <Link to={`/product/${product.slug}`} className="mb-1 line-clamp-3 min-h-[60px] transition-colors hover:text-gray-600 sm:line-clamp-2 sm:min-h-[40px]"><h2 className="text-xs font-bold leading-5 text-black sm:text-sm">{product.name}</h2></Link>
                  <div className="mb-2 flex min-w-0 items-center gap-1"><div className="flex shrink-0 gap-0.5" role="img" aria-label={`${product.rating} out of 5 stars`}>{[...Array(5)].map((_, index) => <StarIcon key={index} filled={index < Math.round(product.rating)} />)}</div><span className="ml-0.5 truncate text-[10px] font-medium text-gray-500 sm:ml-1 sm:text-xs">{product.rating} ({product.reviewCount.toLocaleString()})</span></div>
                  <div className="mb-3 mt-auto flex flex-wrap items-baseline gap-x-2 gap-y-1 sm:mb-4"><p className="text-sm font-extrabold text-black sm:text-base">${product.price.toFixed(2)}</p>{product.originalPrice && <span className="text-xs text-gray-600 line-through sm:text-sm">${product.originalPrice.toFixed(2)}</span>}{product.discountPercent && <span className="text-[10px] font-bold text-red-700 sm:text-xs">-{product.discountPercent}%</span>}</div>
                  <div className="grid grid-cols-2 gap-2"><Link to={`/product/${product.slug}`} aria-label={`View details for ${product.name}`} className="block min-h-10 rounded-md border border-gray-300 px-1 py-2.5 text-center text-[11px] font-bold text-black transition-colors hover:border-gray-500 sm:text-sm"><span className="sm:hidden">Details</span><span className="hidden sm:inline">View Details</span></Link><AffiliateLink href={product.affiliateUrl} className="block min-h-10 rounded-md bg-[#dcb589] px-1 py-2.5 text-center text-[11px] font-bold text-black transition-colors hover:bg-[#cba478] aria-disabled:cursor-not-allowed aria-disabled:opacity-50 sm:text-sm" fallback="Link soon">Amazon</AffiliateLink></div>
                </article>
              );
            })}
          </div>
        )}
        {totalPages > 1 && <nav className="flex flex-wrap justify-center items-center gap-2" aria-label="Product pages">
          <button type="button" onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1} aria-label="Previous page" className="w-8 h-8 flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent">&lt;</button>
          {pageButtons.map((page, index) => {
            const previousPage = pageButtons[index - 1];
            return <span key={page} className="contents">
              {previousPage && page - previousPage > 1 && <span aria-hidden="true" className="px-1 text-gray-400">…</span>}
              <button type="button" onClick={() => changePage(page)} aria-current={page === currentPage ? 'page' : undefined} aria-label={`Page ${page}`} className={`w-8 h-8 flex items-center justify-center rounded-md text-sm ${page === currentPage ? 'bg-[#dcb589] font-bold text-black' : 'text-gray-600 hover:bg-gray-100'}`}>{page}</button>
            </span>;
          })}
          <button type="button" onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Next page" className="w-8 h-8 flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent">&gt;</button>
        </nav>}
      </div>
    </div>
  );
};

export default ProductGrid;
