import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories } from '../data/categories';

const popularSlugs = ['cookware', 'small-appliances', 'sinks', 'faucets', 'storage-organization'];
const popularCategories = popularSlugs
  .map((slug) => categories.find((category) => category.slug === slug))
  .filter(Boolean);

const sourceDimensions = {
  cookware: [672, 502],
  'small-appliances': [672, 502],
  sinks: [1024, 1024],
  faucets: [1024, 1024],
  'storage-organization': [672, 502],
};

const needs = [
  {
    id: 'small-kitchens',
    title: 'Small Kitchens',
    description: 'Browse compact appliances under $100.',
    image: '/homepage/need-small-kitchens.webp',
    link: '/products?category=small-appliances&price=under-100',
  },
  {
    id: 'storage-solutions',
    title: 'Storage Solutions',
    description: 'Find products for a more organized kitchen.',
    image: '/homepage/need-storage-solutions.webp',
    link: '/category/storage-organization',
  },
  {
    id: 'top-rated',
    title: 'Top Rated Picks',
    description: 'Browse products rated 4.5 stars and above.',
    image: '/homepage/need-modern-upgrades.webp',
    link: '/products?rating=4.5&sort=rating',
  },
  {
    id: 'under-100',
    title: 'Under $100',
    description: 'Explore products within a clear budget.',
    image: '/homepage/need-budget-friendly.webp',
    link: '/products?price=under-100',
  },
];

const ShopByNeed = () => {
  const [browseMode, setBrowseMode] = useState('category');

  return (
    <section className="w-full bg-[#f4f7f9] py-12 sm:py-16" aria-labelledby="shop-by-need-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-col gap-5 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 id="shop-by-need-heading" className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
              Shop by Kitchen Need
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">
              Start with a product category or browse by what you need.
            </p>
          </div>

          <div role="group" aria-label="Choose how to browse" className="inline-flex w-fit rounded-full border border-gray-200 bg-white p-1 shadow-sm">
            <button
              type="button"
              aria-pressed={browseMode === 'category'}
              onClick={() => setBrowseMode('category')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c6744] focus-visible:ring-offset-2 ${browseMode === 'category' ? 'bg-[#dcb589] text-gray-950' : 'text-gray-600 hover:text-gray-950'}`}
            >
              Browse by category
            </button>
            <button
              type="button"
              aria-pressed={browseMode === 'need'}
              onClick={() => setBrowseMode('need')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c6744] focus-visible:ring-offset-2 ${browseMode === 'need' ? 'bg-[#dcb589] text-gray-950' : 'text-gray-600 hover:text-gray-950'}`}
            >
              Shop by need
            </button>
          </div>
        </div>

        {browseMode === 'category' ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-5" aria-label="Kitchen product categories">
            {popularCategories.map((category) => {
              const [width, height] = sourceDimensions[category.slug];
              return (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="group flex min-w-0 flex-col items-center rounded-2xl px-2 py-3 text-center transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c6744] focus-visible:ring-offset-2"
                >
                  <span className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-white transition-all duration-200 group-hover:border-[#dcb589] group-hover:shadow-md sm:h-24 sm:w-24 lg:h-28 lg:w-28">
                    <img
                      src={category.heroImage}
                      srcSet={`/categories/category-${category.slug}-card-192.webp 192w, /categories/category-${category.slug}-card-256.webp 256w, /categories/category-${category.slug}-card-320.webp 320w, /categories/category-${category.slug}-card.webp 440w, ${category.heroImage} ${width}w`}
                      sizes="(min-width: 1024px) 112px, (min-width: 640px) 96px, 80px"
                      alt=""
                      aria-hidden="true"
                      width={width}
                      height={height}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                  <span className="mt-3 text-sm font-semibold leading-snug text-gray-900 transition-colors group-hover:text-gray-600 sm:text-base">
                    {category.name}
                  </span>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4" aria-label="Shop by kitchen need">
            {needs.map((need) => (
              <Link
                key={need.id}
                to={need.link}
                className="group min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c6744] focus-visible:ring-offset-2"
              >
                <div className="aspect-[5/3] overflow-hidden bg-gray-100">
                  <img
                    src={need.image}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="text-sm font-bold text-gray-950 group-hover:underline sm:text-base">{need.title}</h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-600 sm:text-sm">{need.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-gray-700 sm:mt-4">
                    Browse picks <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopByNeed;
