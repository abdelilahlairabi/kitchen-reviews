import { Link } from 'react-router-dom';

export default function InspirationGrid({ items }) {
  const featuredItem = items.find((item) => item.featured) || items[0];
  const regularItems = items.filter((item) => item.slug !== featuredItem?.slug);

  return (
    <section aria-label="Kitchen design styles" className="max-w-6xl mx-auto px-4 space-y-6">
      {featuredItem && (
        <article className="relative group rounded-3xl overflow-hidden bg-gray-900 shadow-md min-h-[400px] md:min-h-[520px]">
          <img
            src={featuredItem.image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 max-w-3xl">
            <span className="inline-block rounded-full bg-white/95 text-gray-900 px-3 py-1.5 text-xs font-semibold mb-4">Featured style</span>
            <h2 className="text-white text-3xl md:text-5xl font-bold tracking-tight mb-3">{featuredItem.title}</h2>
            <p className="max-w-2xl text-sm md:text-base leading-relaxed text-white/90 mb-6">{featuredItem.description}</p>
            <Link to={`/inspiration/${featuredItem.slug}`} className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-gray-100 text-gray-950 font-semibold px-5 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black">
              Open the style guide <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
      )}

      {regularItems.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {regularItems.map((item) => (
            <article key={item.slug} className="group rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-shadow">
              <Link to={`/inspiration/${item.slug}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-950">
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <img src={item.image} alt="" aria-hidden="true" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-900">{item.category}</span>
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-gray-950 mb-2 group-hover:underline underline-offset-4">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600 mb-5">{item.description}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-950">Open the style guide <span aria-hidden="true">→</span></span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
