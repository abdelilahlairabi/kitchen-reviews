import { Link } from 'react-router-dom';

export default function RelatedGuides({ currentSlug, guides }) {
  const relatedList = guides.filter((g) => g.slug !== currentSlug).slice(0, 6);

  return (
    <section className="my-16 max-w-4xl mx-auto px-4">
      <div className="bg-[#EFECE6] rounded-3xl p-6 md:p-10">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Related Guides
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relatedList.map((g) => (
            <Link
              key={g.id || g.slug}
              to={`/guides/${g.slug}`}
              className="bg-white rounded-2xl p-3 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                <img
                  src={g.image}
                  alt={g.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex-1 min-w-0">
                <span className="inline-block bg-[#D4A373] text-white text-[10px] font-bold px-2 py-0.5 rounded mb-1">
                  {g.badge}
                </span>
                <h3 className="font-bold text-gray-900 text-xs md:text-sm line-clamp-2 leading-snug group-hover:text-[#D4A373] transition-colors">
                  {g.title}
                </h3>
                <span className="text-[11px] text-gray-400 block mt-1">
                  ⏱ {g.time}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}