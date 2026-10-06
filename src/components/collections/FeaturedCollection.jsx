import { Link } from 'react-router-dom';

const FeaturedCollection = ({ collection }) => {
  if (!collection) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <article className="relative min-h-[390px] md:min-h-[470px] rounded-3xl overflow-hidden bg-gray-900 flex items-end">
        <img src={collection.image} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/85 via-black/55 to-black/10" aria-hidden="true" />
        <div className="relative z-10 p-7 md:p-12 max-w-2xl">
          <span className="bg-white/95 text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 inline-block">Featured collection</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">{collection.name}</h2>
          <p className="text-gray-100 text-base md:text-lg leading-relaxed mb-7 max-w-xl">{collection.subtitle}</p>
          <Link to={`/collections/${collection.slug}`} className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-950 font-semibold px-6 py-3 rounded-full transition-colors">
            Explore collection <span aria-hidden="true">→</span>
          </Link>
        </div>
      </article>
    </section>
  );
};

export default FeaturedCollection;
