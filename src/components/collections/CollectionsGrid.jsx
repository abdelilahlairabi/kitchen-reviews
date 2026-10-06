import { Link } from 'react-router-dom';

const CollectionsGrid = ({ collections }) => {
  if (collections.length === 0) {
    return <div className="max-w-6xl mx-auto px-4 mb-16 rounded-2xl border border-dashed border-gray-300 bg-white py-14 text-center"><h2 className="font-semibold text-gray-950">No matching collections</h2><p className="text-sm text-gray-600 mt-1">Try a different search term.</p></div>;
  }

  return (
    <section aria-label="Kitchen product collections" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
        {collections.map((collection) => (
          <article key={collection.id} className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition duration-200">
            <Link to={`/collections/${collection.slug}`} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-950">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                <img src={collection.image} alt="" aria-hidden="true" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                {collection.badge && <span className="absolute left-4 top-4 rounded-full bg-white/95 text-gray-900 text-xs font-semibold px-3 py-1.5 shadow-sm">{collection.badge}</span>}
              </div>
              <div className="p-5 md:p-6">
                <h2 className="text-xl font-bold text-gray-950 mb-2 leading-snug group-hover:underline underline-offset-4">{collection.name}</h2>
                <p className="text-sm font-medium text-gray-700 mb-3">{collection.subtitle}</p>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{collection.introText}</p>
                <span className="inline-flex items-center gap-2 text-sm text-gray-950 font-semibold mt-5">Explore collection <span aria-hidden="true">→</span></span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CollectionsGrid;
