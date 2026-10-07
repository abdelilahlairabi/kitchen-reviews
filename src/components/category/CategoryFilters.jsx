import { useSearchParams } from 'react-router-dom';
import FilterDropdown from '../FilterDropdown';

const sortOptions = [
  { value: 'popularity', label: 'Sort by: Popularity' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

const CategoryFilters = ({ category }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeType = searchParams.get('type') || '';
  const activeSort = searchParams.get('sort') || 'popularity';
  const updateParams = (name, value) => {
    const params = new URLSearchParams(searchParams);
    if (!value || (name === 'sort' && value === 'popularity')) params.delete(name);
    else params.set(name, value);
    params.delete('page');
    setSearchParams(params);
  };

  return <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8"><div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
    {category.subFilters.length > 0 && <div><span className="text-xs text-gray-500 mb-2 block">Filter by type</span><div className="flex flex-wrap gap-2">{category.subFilters.map((type) => <button key={type} type="button" onClick={() => updateParams('type', activeType === type ? '' : type)} aria-pressed={activeType === type} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeType === type ? 'bg-[#dcb589] text-black' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}>{type}</button>)}</div></div>}
    <div className="mt-4 w-full md:mt-0 md:w-[210px]"><FilterDropdown label="Sort category products" options={sortOptions} value={activeSort} onChange={(value) => updateParams('sort', value)} /></div>
  </div></div>;
};

export default CategoryFilters;
