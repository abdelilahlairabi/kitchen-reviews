import { Link } from 'react-router-dom';

export default function RelatedCollections({ currentSlug, collections }) {
  const related = collections?.filter((item) => item.slug !== currentSlug) || [];

  return (
    <section className="my-16">
      <div className="text-center mb-8">
        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
          Related Collections Section
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
          Explore More Collections
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.slice(0, 3).map((col) => (
          <Link
            key={col.id}
            to={`/collections/${col.slug}`}
            className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="h-44 overflow-hidden bg-gray-100">
              <img
                src={col.heroImage}
                alt={col.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 group-hover:text-[#C59B67] transition-colors">
                {col.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1">{col.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
