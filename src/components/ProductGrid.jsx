import { Link, useSearchParams } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories';
import { useProducts } from '../hooks/useProducts';
import { PRODUCT_PAGE_SIZE } from '../services/products';

const priceRanges = {
  'under-100': { maximumPrice: 99.99 },
  '100-200': { minimumPrice: 100, maximumPrice: 200 },
  '200-500': { minimumPrice: 200.01, maximumPrice: 500 },
  'over-500': { minimumPrice: 500.01 },
};

const StarIcon = ({ filled }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? '#dcb589' : '#e5e7eb'} stroke={filled ? '#dcb589' : '#e5e7eb'} strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ProductGrid = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: categories = [], isPending: isLoadingCategories } = useCategories();
  const search = searchParams.get('search') || '';
  const categorySlug = searchParams.get('category') || '';
  const price = searchParams.get('price') || '';
  const rating = Number(searchParams.get('rating')) || undefined;
  const sort = searchParams.get('sort') || 'popularity';
  const requestedPage = Math.max(1, Number(searchParams.get('page')) || 1);
  const selectedCategory = categories.find((category) => category.slug === categorySlug);
  const categoryIsResolved = !categorySlug || Boolean(selectedCategory);

  const { data, isPending, isFetching, isError } = useProducts({
    page: requestedPage,
    pageSize: PRODUCT_PAGE_SIZE,
    categoryId: selectedCategory?.id,
    minimumRating: rating,
    ...priceRanges[price],
    search,
    sort,
  }, { enabled: !isLoadingCategories && categoryIsResolved });

  const products = data?.products || [];
  const total = data?.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / PRODUCT_PAGE_SIZE));
  const currentPage = Math.min(requestedPage, totalPages);
  const changePage = (page) => {
    const params = new URLSearchParams(searchParams);
    if (page <= 1) params.delete('page'); else params.set('page', String(page));
    setSearchParams(params);
  };

  if (isPending || isLoadingCategories) return <p className="py-16 text-center text-gray-500">Loading products...</p>;
  if (isError) return <p className="py-16 text-center text-gray-500">We could not load products right now. Please refresh and try again.</p>;

  return (
    <div className="w-full bg-white py-12" aria-busy={isFetching}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-gray-500 mb-6">{total} {total === 1 ? 'product' : 'products'} found</p>
        {products.length === 0 ? <p className="py-12 text-center text-gray-500">No products match your search and filters.</p> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {products.map((product) => (
              <article key={product.id} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col hover:shadow-lg transition-shadow duration-300">
                <div className="w-full h-56 bg-[#f8f9fa] rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
                  {product.badge && <span className="absolute top-2 left-2 bg-[#dcb589] text-black text-xs font-bold px-2 py-1 rounded">{product.badge}</span>}
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply" loading="lazy" />
                </div>
                <Link to={`/product/${product.slug}`} className="mb-1 line-clamp-2 min-h-[40px] hover:text-gray-600 transition-colors"><h2 className="text-sm font-bold text-black">{product.name}</h2></Link>
                <div className="flex items-center gap-1 mb-2"><div className="flex gap-0.5" aria-label={`${product.rating} out of 5 stars`}>{[...Array(5)].map((_, index) => <StarIcon key={index} filled={index < Math.round(product.rating)} />)}</div><span className="text-xs text-gray-500 font-medium ml-1">{product.rating} ({product.reviewCount.toLocaleString()})</span></div>
                <div className="flex items-center gap-2 mb-4 mt-auto"><p className="text-base font-extrabold text-black">${product.price.toFixed(2)}</p>{product.originalPrice && <span className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>}{product.discountPercent && <span className="text-xs font-bold text-red-500">-{product.discountPercent}%</span>}</div>
                <div className="grid grid-cols-2 gap-2"><Link to={`/product/${product.slug}`} className="block text-center border border-gray-300 hover:border-gray-500 py-2.5 rounded-md text-sm font-bold text-black transition-colors">View Details</Link><a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow sponsored" className="block text-center bg-[#dcb589] hover:bg-[#cba478] py-2.5 rounded-md text-sm font-bold text-black transition-colors">Amazon</a></div>
              </article>
            ))}
          </div>
        )}
        {totalPages > 1 && <nav className="flex justify-center items-center gap-2" aria-label="Product pages">
          <button type="button" onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1} aria-label="Previous page" className="w-8 h-8 flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent">&lt;</button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => <button key={page} type="button" onClick={() => changePage(page)} aria-current={page === currentPage ? 'page' : undefined} className={`w-8 h-8 flex items-center justify-center rounded-md text-sm ${page === currentPage ? 'bg-[#dcb589] font-bold text-black' : 'text-gray-600 hover:bg-gray-100'}`}>{page}</button>)}
          <button type="button" onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Next page" className="w-8 h-8 flex items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent">&gt;</button>
        </nav>}
      </div>
    </div>
  );
};

export default ProductGrid;
