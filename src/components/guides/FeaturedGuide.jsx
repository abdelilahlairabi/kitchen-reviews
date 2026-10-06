import { Link } from 'react-router-dom';

const FeaturedGuide = ({ guide, isLoading }) => {
  if (isLoading) return <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"><div className="h-[350px] md:h-[450px] rounded-3xl bg-gray-100 animate-pulse" /></div>;
  if (!guide) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <article className="relative min-h-[420px] md:min-h-[480px] rounded-3xl overflow-hidden bg-gray-900 flex items-end md:items-center shadow-xl">
        <img src={guide.image} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/90 via-black/65 to-black/10"></div>
        
        <div className="relative z-10 p-7 md:p-12 max-w-2xl">
          <span className="bg-white/95 text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full mb-5 inline-block">
            Editor&apos;s starting point
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
            {guide.title}
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-5 max-w-xl">
            {guide.desc}
          </p>
          <p className="text-gray-200 text-sm mb-7">{guide.time} <span aria-hidden="true">·</span> {guide.badge}</p>
          <Link 
            to={`/guides/${guide.slug}`} 
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-950 font-semibold px-6 py-3 rounded-full transition-colors"
          >
            Read the guide <span aria-hidden="true">→</span>
          </Link>
        </div>
      </article>
    </div>
  );
};

export default FeaturedGuide;
