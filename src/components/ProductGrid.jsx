import { useSearchParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import { useProducts } from '../hooks/useProducts';
import { PRODUCT_PAGE_SIZE } from '../services/products';

const priceRanges = {
  'under-100': { maximumPrice: 99.99 },
  '100-200': { minimumPrice: 100, maximumPrice: 200 },
  '200-500': { minimumPrice: 200.01, maximumPrice: 500 },
  'over-500': { minimumPrice: 500.01 },
};

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
            {products.map((product, index) => <ProductCard key={product.id} product={product} loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : undefined} />)}
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
