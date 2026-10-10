import { Link } from 'react-router-dom';
import { getGuideImageSrcSet } from '../../utils/guideImageSrcSets';

const GuidesGrid = ({ guides, isLoading, isError }) => {
  if (isLoading) return <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center text-gray-600">Loading guides…</div>;
  if (isError) return <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center text-gray-600">Unable to load guides. Please try again.</div>;
  if (guides.length === 0) return <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 rounded-2xl border border-dashed border-gray-300 bg-white py-14 text-center text-gray-600"><p className="font-semibold text-gray-900">No matching guides</p><p className="text-sm mt-1">Try another topic or clear your search.</p></div>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
        {guides.map((guide) => (
          <Link key={guide.id} to={`/guides/${guide.slug}`} className="group block border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition duration-200 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
              <span className="absolute top-4 left-4 z-10 bg-white/95 text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                {guide.badge}
              </span>
              <img 
                src={guide.image}
                srcSet={getGuideImageSrcSet(guide.image)}
                sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1279px) calc((100vw - 72px) / 2), 368px"
                alt={guide.imageAlt || guide.title}
                width="1376"
                height="768"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="p-5 md:p-6">
              <h3 className="text-xl font-bold text-gray-950 mb-3 leading-snug group-hover:underline underline-offset-4">{guide.title}</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed line-clamp-3">{guide.desc}</p>
              <div className="flex items-center justify-between gap-3 text-xs text-gray-500 font-medium border-t border-gray-100 pt-4">
                <span>{guide.time}</span>
                <span className="text-gray-900">Read guide <span aria-hidden="true">→</span></span>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
};

export default GuidesGrid;
