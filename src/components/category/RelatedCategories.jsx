import { Link } from 'react-router-dom';
import { getCategoryCardSrcSet } from '../../utils/categoryImageSrcSets';

const RelatedCategories = ({ categories, currentSlug }) => {
  const relatedCategories = categories.filter((category) => category.slug !== currentSlug).slice(0, 4);
  if (!relatedCategories.length) return null;

  return (
    <section className="mx-auto mb-16 max-w-6xl px-4 sm:px-6 lg:px-8" aria-labelledby="related-categories-title">
      <h2 id="related-categories-title" className="mb-4 text-lg font-bold text-black sm:mb-6 sm:text-2xl">Explore More Categories</h2>
      <div className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:gap-4 md:grid-cols-4">
        {relatedCategories.map((category) => (
          <Link key={category.slug} to={`/category/${category.slug}`} className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow hover:shadow-md">
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <img src={category.heroImage} srcSet={getCategoryCardSrcSet(category)} sizes="(max-width: 359px) calc(100vw - 32px), (max-width: 639px) calc((100vw - 44px) / 2), (max-width: 767px) calc((100vw - 64px) / 2), (max-width: 1023px) calc((100vw - 96px) / 4), 240px" width="320" height="240" alt={category.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" decoding="async" />
            </div>
            <div className="flex min-h-14 items-center justify-between gap-2 p-3 sm:min-h-16 sm:p-4">
              <span className="line-clamp-2 text-xs font-semibold leading-5 text-gray-900 sm:text-sm">{category.name}</span>
              <svg className="h-4 w-4 shrink-0 text-gray-600 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedCategories;
