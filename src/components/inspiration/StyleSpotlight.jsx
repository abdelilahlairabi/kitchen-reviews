import { Link } from 'react-router-dom';
import { getStyleHeroImageSrcSet } from '../../utils/styleImageSrcSets';

export default function StyleSpotlight({ spotlight }) {
  return (
    <section className="max-w-6xl mx-auto px-4 my-16" aria-labelledby="style-spotlight-title">
      <div className="rounded-3xl bg-[#f5f1e9] p-5 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center bg-white rounded-2xl border border-white p-4 md:p-6">
          <div className="md:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
          <img src={spotlight.image} srcSet={getStyleHeroImageSrcSet(spotlight.image)} sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1279px) 40vw, 440px" alt="" aria-hidden="true" width="1376" height="768" className="w-full h-full object-cover" loading="lazy" decoding="async" />
          </div>
          <div className="md:col-span-7 py-2 md:py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8c6744] mb-3">{spotlight.subtitle}</p>
            <h2 id="style-spotlight-title" className="text-2xl md:text-3xl font-bold tracking-tight text-gray-950 mb-4">{spotlight.title}</h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-5">{spotlight.description}</p>
            <ul className="flex flex-wrap gap-2 mb-6" aria-label="Style characteristics">
              {spotlight.tags?.map((tag) => <li key={tag} className="rounded-full bg-[#f5f1e9] text-gray-700 text-xs font-medium px-3 py-1.5">{tag}</li>)}
            </ul>
            <Link to={`/inspiration/${spotlight.slug}`} className="inline-flex items-center gap-2 rounded-full bg-gray-950 hover:bg-gray-800 text-white text-sm font-semibold px-5 py-3 transition-colors">Explore this style <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
