import { Link, useSearchParams } from 'react-router-dom';
import { categories } from '../data/categories';
import CategoryFilterSelect from './CategoryFilterSelect';
import FilterDropdown from './FilterDropdown';

const priceOptions = [
  { value: '', label: 'Any price' },
  { value: 'under-100', label: 'Under $100' },
  { value: '100-200', label: '$100–$200' },
  { value: '200-500', label: '$200–$500' },
  { value: 'over-500', label: 'Over $500' },
];
const ratingOptions = [
  { value: '', label: 'Any rating' },
  { value: '4.5', label: '4.5 stars & up' },
  { value: '4.7', label: '4.7 stars & up' },
];
const sortOptions = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

const ProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
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
    <div className="w-full border-b border-gray-200 bg-[#f8f9fa] py-5 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-3 text-xs text-gray-500 sm:mb-4" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-black">Home</Link><span className="mx-2">/</span><span className="text-gray-900">All Products</span>
        </nav>
        <div className="mb-4 sm:mb-5">
          <div>
            <h1 className="mb-1 text-2xl font-extrabold tracking-tight text-black sm:text-3xl">All Kitchen Products</h1>
            <p className="text-sm text-gray-500">Browse our kitchen product reviews and recommendations.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-2 gap-y-3 md:flex md:flex-wrap md:items-end md:gap-3">
          <div className="min-w-0">
            <span className="mb-1.5 block text-xs font-medium text-gray-500 md:hidden">Category</span>
            <CategoryFilterSelect categories={categories} value={category} onChange={(value) => updateFilter('category', value)} />
          </div>
          <div className="min-w-0 md:w-[145px]">
            <span className="mb-1.5 block text-xs font-medium text-gray-500 md:hidden">Price</span>
            <FilterDropdown label="Filter by price range" options={priceOptions} value={price} onChange={(value) => updateFilter('price', value)} />
          </div>
          <div className="min-w-0 md:w-[155px]">
            <span className="mb-1.5 block text-xs font-medium text-gray-500 md:hidden">Rating</span>
            <FilterDropdown label="Filter by rating" options={ratingOptions} value={rating} onChange={(value) => updateFilter('rating', value)} />
          </div>
          <div className="min-w-0 md:ml-auto md:flex md:w-auto md:items-end md:gap-2">
            <span className="mb-1.5 block text-xs font-medium text-gray-500 md:mb-2 md:text-sm md:font-semibold md:text-gray-700">Sort by</span>
            <FilterDropdown label="Sort products" options={sortOptions} value={sort} onChange={(value) => updateFilter('sort', value)} className="md:w-[190px]" />
          </div>
        </div>
        {hasFilters && <button type="button" onClick={clearFilters} className="mt-3 px-1 py-1 text-sm font-semibold text-gray-600 underline underline-offset-4 transition-colors hover:text-black">Clear all filters</button>}
      </div>
    </div>
  );
};

export default ProductFilters;
