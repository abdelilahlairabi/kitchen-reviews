import { Link, useSearchParams } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories';

const ProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: categories = [], isPending: isLoadingCategories } = useCategories();
  const category = searchParams.get('category') || '';
  const price = searchParams.get('price') || '';
  const rating = searchParams.get('rating') || '';
  const sort = searchParams.get('sort') || 'popularity';
  const hasFilters = category || price || rating || sort !== 'popularity';

  const updateFilter = (name, value) => {
    const params = new URLSearchParams(searchParams);
    if (!value || (name === 'sort' && value === 'popularity')) params.delete(name);
    else params.set(name, value);
    params.delete('page');
    setSearchParams(params);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams);
    ['category', 'price', 'rating', 'sort', 'page'].forEach((name) => params.delete(name));
    setSearchParams(params);
  };

  return (
    <div className="w-full bg-[#f8f9fa] pt-8 pb-6 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-xs text-gray-500 mb-4" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-black">Home</Link><span className="mx-2">/</span><span className="text-gray-900">All Products</span>
        </nav>
        <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-black mb-1">All Kitchen Products</h1>
            <p className="text-sm text-gray-500">Browse our kitchen product reviews and recommendations.</p>
          </div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            Sort by
            <select value={sort} onChange={(event) => updateFilter('sort', event.target.value)} className="bg-white border border-gray-300 rounded-full px-4 py-2 text-sm font-medium focus:outline-none focus:border-gray-500">
              <option value="popularity">Popularity</option><option value="price-asc">Price: Low to High</option><option value="price-desc">Price: High to Low</option><option value="rating">Highest Rated</option>
            </select>
          </label>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select value={category} onChange={(event) => updateFilter('category', event.target.value)} aria-label="Filter by category" disabled={isLoadingCategories} className="bg-white border border-gray-300 rounded-full px-4 py-2 text-sm font-medium focus:outline-none focus:border-gray-500 disabled:text-gray-400">
            <option value="">{isLoadingCategories ? 'Loading categories...' : 'All categories'}</option>
            {categories.map((item) => <option key={item.id} value={item.slug}>{item.name}</option>)}
          </select>
          <select value={price} onChange={(event) => updateFilter('price', event.target.value)} aria-label="Filter by price range" className="bg-white border border-gray-300 rounded-full px-4 py-2 text-sm font-medium focus:outline-none focus:border-gray-500">
            <option value="">Any price</option><option value="under-100">Under $100</option><option value="100-200">$100–$200</option><option value="200-500">$200–$500</option><option value="over-500">Over $500</option>
          </select>
          <select value={rating} onChange={(event) => updateFilter('rating', event.target.value)} aria-label="Filter by rating" className="bg-white border border-gray-300 rounded-full px-4 py-2 text-sm font-medium focus:outline-none focus:border-gray-500">
            <option value="">Any rating</option><option value="4.5">4.5 stars & up</option><option value="4.7">4.7 stars & up</option>
          </select>
          {hasFilters && <button type="button" onClick={clearFilters} className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-black underline">Clear filters</button>}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
