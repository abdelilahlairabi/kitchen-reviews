import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
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
const filterKeys = ['category', 'price', 'rating', 'brand', 'type'];

function getCategory(slug) {
  return categories.find((item) => item.slug === slug);
}

function FilterField({ label, children, className = '' }) {
  return (
    <div className={`min-w-0 ${className}`}>
      <span className="mb-1.5 block text-xs font-medium text-gray-500">{label}</span>
      {children}
    </div>
  );
}

function BrandFilterField({ value, onApply }) {
  const [brandInput, setBrandInput] = useState(value);

  const submit = (event) => {
    event.preventDefault();
    onApply(brandInput.trim());
  };

  return (
    <FilterField label="Brand" className="w-[190px]">
      <form onSubmit={submit} className="flex h-11 items-center overflow-hidden rounded-full border border-gray-300 bg-white focus-within:border-gray-700 focus-within:ring-2 focus-within:ring-gray-900/10">
        <input type="search" value={brandInput} onChange={(event) => setBrandInput(event.target.value)} placeholder="Search a brand" aria-label="Filter by brand" className="min-w-0 flex-1 bg-transparent px-4 text-sm text-gray-800 outline-none placeholder:text-gray-400" />
        <button type="submit" aria-label="Apply brand filter" className="inline-flex h-full w-10 items-center justify-center text-gray-500 transition hover:text-gray-950"><Search aria-hidden="true" className="h-4 w-4" /></button>
      </form>
    </FilterField>
  );
}

const ProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);
  const [draft, setDraft] = useState({ category: '', price: '', rating: '', brand: '', type: '' });
  const filterButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const mobilePanelRef = useRef(null);
  const category = searchParams.get('category') || '';
  const price = searchParams.get('price') || '';
  const rating = searchParams.get('rating') || '';
  const brand = searchParams.get('brand') || '';
  const type = searchParams.get('type') || '';
  const sort = searchParams.get('sort') || 'popularity';
  const activeCount = filterKeys.filter((key) => searchParams.get(key)).length;
  const hasFilters = activeCount > 0 || sort !== 'popularity';
  const selectedCategory = getCategory(category);
  const draftCategory = getCategory(draft.category);
  const selectedTypeOptions = selectedCategory?.subFilters || [];
  const draftTypeOptions = draftCategory?.subFilters || [];

  useEffect(() => {
    if (!isMobilePanelOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMobilePanel();
        return;
      }
      if (event.key === 'Tab') {
        const focusable = [...(mobilePanelRef.current?.querySelectorAll('button:not(:disabled), input:not(:disabled)') || [])];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isMobilePanelOpen]);

  const updateFilter = (name, value) => {
    const params = new URLSearchParams(searchParams);
    if (!value || (name === 'sort' && value === 'popularity')) params.delete(name);
    else params.set(name, value);
    if (name === 'category') params.delete('type');
    params.delete('page');
    setSearchParams(params);
  };

  const openMobilePanel = () => {
    setDraft({ category, price, rating, brand, type });
    setIsMobilePanelOpen(true);
  };

  function closeMobilePanel() {
    setIsMobilePanelOpen(false);
    window.requestAnimationFrame(() => filterButtonRef.current?.focus());
  }

  const applyMobileFilters = () => {
    const params = new URLSearchParams(searchParams);
    filterKeys.forEach((key) => {
      const value = draft[key];
      if (value) params.set(key, value);
      else params.delete(key);
    });
    if (draft.type && !draftTypeOptions.includes(draft.type)) params.delete('type');
    if (draft.brand.trim()) params.set('brand', draft.brand.trim());
    else params.delete('brand');
    params.delete('page');
    setSearchParams(params);
    closeMobilePanel();
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams);
    [...filterKeys, 'sort', 'page'].forEach((name) => params.delete(name));
    setSearchParams(params);
  };

  const updateDraft = (name, value) => setDraft((previous) => ({
    ...previous,
    [name]: value,
    ...(name === 'category' ? { type: '' } : {}),
  }));

  return (
    <div className="w-full border-b border-gray-200 bg-[#f8f9fa] py-5 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-3 text-xs text-gray-500 sm:mb-4" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-black">Home</Link><span className="mx-2">/</span><span className="text-gray-900">All Products</span>
        </nav>
        <div className="mb-4 sm:mb-5">
          <h1 className="mb-1 text-2xl font-extrabold tracking-tight text-black sm:text-3xl">All Kitchen Products</h1>
          <p className="text-sm text-gray-500">Browse our kitchen product reviews and recommendations.</p>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-2 md:hidden">
          <button ref={filterButtonRef} type="button" onClick={openMobilePanel} aria-haspopup="dialog" className="flex h-11 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-3 text-sm font-semibold text-gray-800 transition hover:border-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
            <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
            Filters{activeCount > 0 && <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-[#dcb589] px-1.5 py-0.5 text-[11px] font-bold text-black">{activeCount}</span>}
          </button>
          <FilterDropdown label="Sort products" options={sortOptions} value={sort} onChange={(value) => updateFilter('sort', value)} menuClassName="left-auto right-0" />
        </div>

        <div className="hidden flex-wrap items-end gap-3 md:flex">
          <FilterField label="Category" className="w-[190px]"><CategoryFilterSelect categories={categories} value={category} onChange={(value) => updateFilter('category', value)} /></FilterField>
          <FilterField label="Price"><FilterDropdown label="Filter by price range" options={priceOptions} value={price} onChange={(value) => updateFilter('price', value)} className="w-[150px]" /></FilterField>
          <FilterField label="Rating"><FilterDropdown label="Filter by rating" options={ratingOptions} value={rating} onChange={(value) => updateFilter('rating', value)} className="w-[160px]" /></FilterField>
          {selectedTypeOptions.length > 0 && <FilterField label="Product type"><FilterDropdown label="Filter by product type" options={[{ value: '', label: 'All types' }, ...selectedTypeOptions.map((item) => ({ value: item, label: item }))]} value={type} onChange={(value) => updateFilter('type', value)} className="w-[180px]" /></FilterField>}
          <BrandFilterField key={brand} value={brand} onApply={(value) => updateFilter('brand', value)} />
          <FilterField label="Sort by" className="ml-auto"><FilterDropdown label="Sort products" options={sortOptions} value={sort} onChange={(value) => updateFilter('sort', value)} className="w-[190px]" /></FilterField>
        </div>

        {hasFilters && (
          <div className="mt-3 flex flex-wrap items-center gap-2" aria-label="Active filters">
            {category && <button type="button" onClick={() => updateFilter('category', '')} className="rounded-full border border-[#e9d7bd] bg-white px-3 py-1.5 text-xs font-medium text-gray-700">{selectedCategory?.name || category} <span aria-hidden="true">×</span></button>}
            {type && <button type="button" onClick={() => updateFilter('type', '')} className="rounded-full border border-[#e9d7bd] bg-white px-3 py-1.5 text-xs font-medium text-gray-700">{type} <span aria-hidden="true">×</span></button>}
            {price && <button type="button" onClick={() => updateFilter('price', '')} className="rounded-full border border-[#e9d7bd] bg-white px-3 py-1.5 text-xs font-medium text-gray-700">{priceOptions.find((option) => option.value === price)?.label || price} <span aria-hidden="true">×</span></button>}
            {rating && <button type="button" onClick={() => updateFilter('rating', '')} className="rounded-full border border-[#e9d7bd] bg-white px-3 py-1.5 text-xs font-medium text-gray-700">{rating}+ stars <span aria-hidden="true">×</span></button>}
            {brand && <button type="button" onClick={() => updateFilter('brand', '')} className="rounded-full border border-[#e9d7bd] bg-white px-3 py-1.5 text-xs font-medium text-gray-700">Brand: {brand} <span aria-hidden="true">×</span></button>}
            {sort !== 'popularity' && <button type="button" onClick={() => updateFilter('sort', 'popularity')} className="rounded-full border border-[#e9d7bd] bg-white px-3 py-1.5 text-xs font-medium text-gray-700">{sortOptions.find((option) => option.value === sort)?.label} <span aria-hidden="true">×</span></button>}
            <button type="button" onClick={clearFilters} className="px-2 py-1.5 text-xs font-semibold text-gray-600 underline underline-offset-4 transition-colors hover:text-black">Clear all</button>
          </div>
        )}
      </div>

      {isMobilePanelOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/45 md:hidden" onMouseDown={(event) => { if (event.target === event.currentTarget) closeMobilePanel(); }}>
          <section ref={mobilePanelRef} role="dialog" aria-modal="true" aria-labelledby="mobile-filters-title" className="max-h-[90dvh] w-full overflow-y-auto rounded-t-3xl bg-white px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 shadow-2xl">
            <div className="mb-5 flex items-start justify-between border-b border-gray-100 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8c6744]">Find your fit</p>
                <h2 id="mobile-filters-title" className="mt-1 text-xl font-bold text-gray-950">Filter products</h2>
              </div>
              <button ref={closeButtonRef} type="button" onClick={closeMobilePanel} aria-label="Close filters" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"><X aria-hidden="true" className="h-5 w-5" /></button>
            </div>

            <div className="space-y-4">
              <FilterField label="Category"><CategoryFilterSelect categories={categories} value={draft.category} onChange={(value) => updateDraft('category', value)} /></FilterField>
              {draftTypeOptions.length > 0 && <FilterField label="Product type"><FilterDropdown label="Filter by product type" options={[{ value: '', label: 'All types' }, ...draftTypeOptions.map((item) => ({ value: item, label: item }))]} value={draft.type} onChange={(value) => updateDraft('type', value)} /></FilterField>}
              <FilterField label="Price range"><FilterDropdown label="Filter by price range" options={priceOptions} value={draft.price} onChange={(value) => updateDraft('price', value)} /></FilterField>
              <FilterField label="Minimum rating"><FilterDropdown label="Filter by rating" options={ratingOptions} value={draft.rating} onChange={(value) => updateDraft('rating', value)} /></FilterField>
              <FilterField label="Brand"><input type="search" value={draft.brand} onChange={(event) => updateDraft('brand', event.target.value)} placeholder="Type a brand name" className="h-11 w-full rounded-full border border-gray-300 bg-white px-4 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-gray-700 focus:ring-2 focus:ring-gray-900/10" /></FilterField>
            </div>

            <div className="mt-6 flex gap-3 border-t border-gray-100 pt-4">
              <button type="button" onClick={() => setDraft({ category: '', price: '', rating: '', brand: '', type: '' })} className="h-12 flex-1 rounded-full border border-gray-300 text-sm font-semibold text-gray-700 transition hover:border-gray-950">Reset</button>
              <button type="button" onClick={applyMobileFilters} className="h-12 flex-[2] rounded-full bg-[#dcb589] text-sm font-bold text-gray-950 transition hover:bg-[#cba478]">Show products</button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;
