import { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown, Search, X } from 'lucide-react';

export default function CategoryFilterSelect({ categories, value, onChange }) {
  const id = useId();
  const labelId = `${id}-category-label`;
  const valueId = `${id}-category-value`;
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef(null);
  const inputRef = useRef(null);
  const triggerRef = useRef(null);
  const selectedCategory = categories.find((category) => category.slug === value);
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setIsOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    inputRef.current?.focus();
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const chooseCategory = (slug) => {
    onChange(slug);
    setQuery('');
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div ref={rootRef} className="relative w-full sm:w-[190px]">
      <span id={labelId} className="sr-only">Filter by category</span>
      <button
        ref={triggerRef}
        type="button"
        aria-labelledby={`${labelId} ${valueId}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-11 w-full items-center justify-between gap-3 rounded-full border border-gray-300 bg-white px-4 text-left text-sm font-medium text-gray-800 outline-none transition-colors hover:border-gray-500 focus:border-gray-700 focus:ring-2 focus:ring-gray-900/10"
      >
        <span id={valueId} className="truncate">{selectedCategory?.name || 'All categories'}</span>
        <ChevronDown aria-hidden="true" className={`h-4 w-4 shrink-0 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-[min(19rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
          <div className="flex items-center gap-2 border-b border-gray-100 p-3">
            <Search aria-hidden="true" className="h-4 w-4 shrink-0 text-gray-400" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Find a category..."
              aria-label="Search categories"
              className="min-w-0 flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
            />
            {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear category search" className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"><X className="h-4 w-4" /></button>}
          </div>
          <div role="group" aria-label="Product categories" className="max-h-60 overflow-y-auto overscroll-contain p-1.5">
            <button type="button" aria-pressed={!value} onClick={() => chooseCategory('')} className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm text-gray-800 hover:bg-gray-50 ${!value ? 'bg-[#f7f3ed] font-semibold' : ''}`}>
              <span>All categories</span>
              {!value && <Check aria-hidden="true" className="h-4 w-4 text-[#8c6744]" />}
            </button>
            {filteredCategories.map((category) => (
              <button key={category.slug} type="button" aria-pressed={value === category.slug} onClick={() => chooseCategory(category.slug)} className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm text-gray-800 hover:bg-gray-50 ${value === category.slug ? 'bg-[#f7f3ed] font-semibold' : ''}`}>
                <span>{category.name}</span>
                {value === category.slug && <Check aria-hidden="true" className="h-4 w-4 text-[#8c6744]" />}
              </button>
            ))}
            {filteredCategories.length === 0 && <p className="px-3 py-5 text-center text-sm text-gray-500">No categories found.</p>}
          </div>
        </div>
      )}
    </div>
  );
}
