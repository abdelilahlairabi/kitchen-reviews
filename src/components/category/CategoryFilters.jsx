import { useSearchParams } from 'react-router-dom';
import FilterDropdown from '../FilterDropdown';

const sortOptions = [
  { value: 'popularity', label: 'Sort by: Popularity' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

const CategoryFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSort = searchParams.get('sort') || 'popularity';
  const updateParams = (name, value) => {
    const params = new URLSearchParams(searchParams);
    if (!value || (name === 'sort' && value === 'popularity')) params.delete(name);
    else params.set(name, value);
    params.delete('page');
    setSearchParams(params);
  };

  return <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8"><div className="flex justify-end">
    <div className="w-full md:w-[210px]"><FilterDropdown label="Sort category products" options={sortOptions} value={activeSort} onChange={(value) => updateParams('sort', value)} menuAlign="right" /></div>
  </div></div>;
};

export default CategoryFilters;
