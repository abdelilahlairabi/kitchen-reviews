import { Link } from 'react-router-dom';

export default function RelatedCollections({ currentSlug, collections }) {
  const current = collections?.find((item) => item.slug === currentSlug);
  const related = current?.relatedSlugs?.map((slug) => collections.find((item) => item.slug === slug)).filter(Boolean)
    || collections?.filter((item) => item.slug !== currentSlug).slice(0, 3)
    || [];

  return (
    <section className="my-16">
      <div className="text-center mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8c6744] mb-2">Keep exploring</p>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-950">
          Collections you may also like
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {related.slice(0, 3).map((col) => (
          <Link
            key={col.id}
            to={`/collections/${col.slug}`}
            className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="aspect-[16/10] overflow-hidden bg-gray-100">
              <img
                src={col.image}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-950 group-hover:underline underline-offset-4 transition-colors">
                {col.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1">{col.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
