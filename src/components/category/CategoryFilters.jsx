import { useSearchParams } from 'react-router-dom';

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
    <div className="relative mt-4 md:mt-0"><select value={activeSort} onChange={(event) => updateParams('sort', event.target.value)} aria-label="Sort category products" className="appearance-none bg-white border border-gray-300 rounded-full pl-4 pr-8 py-1.5 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"><option value="popularity">Sort by: Popularity</option><option value="price-asc">Price: Low to High</option><option value="price-desc">Price: High to Low</option><option value="rating">Highest Rated</option></select></div>
  </div></div>;
};

export default CategoryFilters;
