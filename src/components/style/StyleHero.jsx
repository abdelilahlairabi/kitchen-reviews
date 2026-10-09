import { Link } from 'react-router-dom';
import { getStyleHeroImageSrcSet } from '../../utils/styleImageSrcSets';

export default function StyleHero({ styleData }) {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-7">
      {/* Fil d'ariane */}
      <nav aria-label="Breadcrumb" className="text-xs text-gray-500 mb-8 flex items-center gap-2">
        <Link to="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link to="/inspiration" className="hover:underline">Inspiration</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">{styleData.title}</span>
      </nav>

      {/* Hero Card */}
      <div className="relative rounded-3xl overflow-hidden shadow-sm min-h-[430px] md:min-h-[540px] bg-gray-900 flex items-end">
        <img
          src={styleData.heroImage}
          srcSet={getStyleHeroImageSrcSet(styleData.heroImage)}
          sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1279px) calc(100vw - 32px), 1120px"
          alt=""
          aria-hidden="true"
          width="1376"
          height="768"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5" aria-hidden="true" />
        <div className="relative z-10 p-7 md:p-12 max-w-3xl">
          <span className="inline-block bg-white/95 text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-full w-fit mb-5">
            Style Guide
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
            {styleData.title}
          </h1>
          <p className="text-gray-100 text-base md:text-lg max-w-2xl leading-relaxed">
            {styleData.subtitle}
          </p>
          <div className="flex flex-wrap gap-3 mt-7">
            <a href="#style-details" className="rounded-full bg-white text-gray-950 hover:bg-gray-100 px-5 py-3 text-sm font-semibold transition-colors">Read the design guide <span aria-hidden="true">↓</span></a>
            <a href="#style-gallery" className="rounded-full border border-white/70 text-white hover:bg-white/10 px-5 py-3 text-sm font-semibold transition-colors">Browse the gallery</a>
          </div>
        </div>
      </div>

      {/* Style Description Section */}
      <section id="style-details" className="scroll-mt-24 text-center my-12 md:my-16 max-w-3xl mx-auto px-4">
        <p className="text-xs uppercase tracking-[0.18em] font-semibold text-[#8c6744] mb-3">Design approach</p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">
          About this style
        </h2>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-7">
          {styleData.description}
        </p>

        {/* Badges / Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {styleData.tags?.map((tag, i) => (
            <span
              key={i}
              className="bg-[#f5f1e9] text-gray-800 text-xs font-semibold px-4 py-2 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {styleData.contentSections?.length > 0 && (
        <article className="max-w-3xl mx-auto px-4 mb-16 space-y-10 md:space-y-12">
          {styleData.contentSections.map((section) => (
            <section key={section.heading} className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-950">{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="text-base md:text-[17px] leading-8 text-gray-700">{paragraph}</p>
              ))}
              {section.bullets?.length > 0 && (
                <ul className="space-y-3 pt-2 rounded-2xl bg-gray-50 p-5 md:p-6">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-base text-gray-700 leading-relaxed">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#9b7049]" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>
      )}
    </div>
  );
}
