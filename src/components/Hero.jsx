import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { categories } from '../data/categories';

const Hero = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const normalizedQuery = query.trim();
  const shouldSearch = isSearchFocused && normalizedQuery.length >= 2;
  const { data, isFetching } = useProducts({
    page: 1,
    pageSize: 5,
    search: debouncedQuery,
    sort: 'popularity',
  }, { enabled: shouldSearch && debouncedQuery.length >= 2 });
  const products = data?.products || [];
  const queryIsDebouncing = normalizedQuery.toLowerCase() !== debouncedQuery.toLowerCase();

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedQuery(normalizedQuery), 300);
    return () => window.clearTimeout(timeout);
  }, [normalizedQuery]);

  const submitSearch = (event) => {
    event.preventDefault();
    const search = query.trim();
    if (!search) return;
    setIsSearchFocused(false);
    navigate(`/products?search=${encodeURIComponent(search)}`);
  };

  const chooseProduct = (slug) => {
    setIsSearchFocused(false);
    navigate(`/product/${slug}`);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsSearchFocused(false);
      setActiveSuggestion(-1);
    } else if (event.key === 'ArrowDown' && products.length) {
      event.preventDefault();
      setActiveSuggestion((index) => (index + 1) % products.length);
    } else if (event.key === 'ArrowUp' && products.length) {
      event.preventDefault();
      setActiveSuggestion((index) => (index <= 0 ? products.length - 1 : index - 1));
    } else if (event.key === 'Enter' && activeSuggestion >= 0 && products[activeSuggestion]) {
      event.preventDefault();
      chooseProduct(products[activeSuggestion].slug);
    }
  };

  return (
    <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="relative rounded-2xl min-h-[400px] md:min-h-[500px] lg:min-h-[550px] flex items-center">
        
        {/* Background Image */}
        {/* Assure-toi que le nom du fichier correspond à ton image dans le dossier public */}
        <img 
          src="/homepage/hero-modern-kitchen.webp"
          srcSet="/homepage/hero-modern-kitchen-480.webp 480w, /homepage/hero-modern-kitchen-768.webp 768w, /homepage/hero-modern-kitchen.webp 1200w"
          sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1343px) calc(100vw - 64px), 1216px"
          alt="Modern Kitchen" 
          width="1200"
          height="896"
          className="absolute inset-0 w-full h-full rounded-2xl object-cover object-center"
          fetchPriority="high"
        />

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/95 via-white/80 to-transparent sm:w-3/4 md:w-2/3 lg:w-1/2"></div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-xl p-8 sm:p-12 lg:p-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black leading-tight tracking-tight mb-4">
            Find the right products for your kitchen.
          </h1>
          
          <p className="text-base sm:text-lg text-gray-700 mb-5 max-w-md">
            Explore practical kitchen product reviews, thoughtful buying guides, and ideas for creating a space that works for you.
          </p>

          <div ref={searchRef} className="relative z-50 mb-4 max-w-lg">
            <form onSubmit={submitSearch} role="search" className="flex rounded-lg border border-gray-300 bg-white p-1 shadow-sm focus-within:border-gray-500 focus-within:ring-2 focus-within:ring-gray-900/10">
              <label className="sr-only" htmlFor="homepage-product-search">Search kitchen products</label>
              <input
                id="homepage-product-search"
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveSuggestion(-1);
                }}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={(event) => {
                  if (!searchRef.current?.contains(event.relatedTarget)) setIsSearchFocused(false);
                }}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search products or brands"
                autoComplete="off"
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={shouldSearch}
                aria-controls={shouldSearch ? 'homepage-product-suggestions' : undefined}
                aria-activedescendant={activeSuggestion >= 0 ? `homepage-product-suggestion-${activeSuggestion}` : undefined}
                className="min-w-0 flex-1 rounded-md border-0 bg-transparent px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400"
              />
              <button type="submit" aria-label="Search products" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-[#dcb589] px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-[#cba478] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700">
                <Search aria-hidden="true" className="h-4 w-4" /><span className="hidden sm:inline">Search</span>
              </button>
            </form>

            {shouldSearch && (
              <div id="homepage-product-suggestions" role="listbox" aria-label="Product suggestions" className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
                {queryIsDebouncing || isFetching ? (
                  <p role="status" className="px-3 py-4 text-sm text-gray-500">Searching products…</p>
                ) : products.length ? (
                  <>
                    {products.map((product, index) => {
                      const category = categories.find((item) => item.slug === product.categorySlug);
                      return (
                        <button
                          id={`homepage-product-suggestion-${index}`}
                          key={product.id}
                          type="button"
                          role="option"
                          aria-selected={activeSuggestion === index}
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => chooseProduct(product.slug)}
                          className={`flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors ${activeSuggestion === index ? 'bg-[#f7f3ed]' : 'hover:bg-gray-50'}`}
                        >
                          <img src={product.image} alt="" className="h-12 w-12 shrink-0 rounded-md border border-gray-100 bg-gray-50 object-contain" loading="lazy" />
                          <span className="min-w-0 flex-1">
                            <span className="block line-clamp-2 text-sm font-semibold text-gray-900">{product.name}</span>
                            <span className="mt-0.5 block text-xs text-gray-500">{category?.name || 'Kitchen product'} · ${Number(product.price).toFixed(2)}</span>
                          </span>
                        </button>
                      );
                    })}
                    <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={submitSearch} className="mt-1 flex w-full items-center justify-between rounded-lg border-t border-gray-100 px-3 py-3 text-left text-sm font-semibold text-gray-800 hover:bg-gray-50">
                      <span>See all results for “{normalizedQuery}”</span><ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <div className="px-3 py-4">
                    <p className="text-sm font-semibold text-gray-900">No matching products yet</p>
                    <p className="mt-1 text-xs text-gray-500">Try a product name, brand, or a broader search.</p>
                    <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={submitSearch} className="mt-3 text-sm font-semibold text-[#8c6744] underline underline-offset-2">Search all products for “{normalizedQuery}”</button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mb-5 flex flex-wrap items-center gap-2 text-xs text-gray-600">
            <span className="font-medium">Quick browse:</span>
            <Link to="/products?price=under-100" className="rounded-full border border-gray-300 bg-white/80 px-3 py-1.5 transition-colors hover:border-gray-600 hover:bg-white">Under $100</Link>
            <Link to="/products?category=small-appliances" className="rounded-full border border-gray-300 bg-white/80 px-3 py-1.5 transition-colors hover:border-gray-600 hover:bg-white">Small appliances</Link>
            <Link to="/products?category=storage-organization" className="rounded-full border border-gray-300 bg-white/80 px-3 py-1.5 transition-colors hover:border-gray-600 hover:bg-white">Storage</Link>
          </div>

          <Link 
            to="/collections" 
            className="inline-block bg-[#dcb589] hover:bg-[#cba478] text-black font-semibold py-3 px-6 rounded-md transition-colors"
          >
            Explore Top Picks
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
