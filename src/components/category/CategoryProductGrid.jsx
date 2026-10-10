import { useSearchParams } from 'react-router-dom';
import ProductCard from '../ProductCard';

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
    {products.length === 0 ? <p className="col-span-full text-center text-gray-500 py-12">No products found in this category yet.</p> : products.map((product) => <ProductCard key={product.id} product={product} imageSizes="(max-width: 359px) calc(100vw - 58px), (max-width: 639px) calc((100vw - 96px) / 2), (max-width: 1023px) calc(50vw - 64px), (max-width: 1279px) calc((100vw - 144px) / 3), 246px" />)}</div>
    {totalPages > 1 && <nav className="flex justify-center items-center gap-2" aria-label="Category product pages"><button type="button" onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1} aria-label="Previous page" className="w-8 h-8 rounded text-gray-600 hover:bg-gray-100 disabled:text-gray-300">&lt;</button>{Array.from({ length: totalPages }, (_, index) => index + 1).map((item) => <button key={item} type="button" onClick={() => changePage(item)} aria-current={item === currentPage ? 'page' : undefined} className={`w-8 h-8 rounded text-sm ${item === currentPage ? 'bg-[#dcb589] font-bold text-black' : 'text-gray-600 hover:bg-gray-100'}`}>{item}</button>)}<button type="button" onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Next page" className="w-8 h-8 rounded text-gray-600 hover:bg-gray-100 disabled:text-gray-300">&gt;</button></nav>}
  </div>;
};

export default CategoryProductGrid;
