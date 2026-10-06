import { Link } from 'react-router-dom';

export default function StyleHero({ styleData }) {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-6">
      {/* Fil d'ariane */}
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2">
        <Link to="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link to="/inspiration" className="hover:underline">Inspiration</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">{styleData.title}</span>
      </nav>

      {/* Hero Card */}
      <div className="relative rounded-3xl overflow-hidden shadow-sm h-[380px] md:h-[460px] bg-gray-900">
        <img
          src={styleData.heroImage}
          alt={styleData.title}
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 flex flex-col justify-center p-8 md:p-14">
          <span className="inline-block bg-[#D4A373] text-white text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4">
            Style Guide
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">
            {styleData.title}
          </h1>
          <p className="text-gray-200 text-sm md:text-base max-w-xl leading-relaxed">
            {styleData.subtitle}
          </p>
        </div>
      </div>

      {/* Style Description Section */}
      <div className="text-center my-14 max-w-3xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">
          About this style
        </h2>
        <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-6">
          {styleData.description}
        </p>

        {/* Badges / Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {styleData.tags?.map((tag, i) => (
            <span
              key={i}
              className="bg-[#E5C9A5] text-gray-900 text-xs font-semibold px-4 py-2 rounded-full shadow-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {styleData.contentSections?.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 mb-14 space-y-10">
          {styleData.contentSections.map((section) => (
            <div key={section.heading} className="space-y-3">
              <h2 className="text-2xl font-extrabold text-gray-900">{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="text-sm md:text-base leading-relaxed text-gray-600">{paragraph}</p>
              ))}
              {section.bullets?.length > 0 && (
                <ul className="space-y-2 pt-1">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm md:text-base text-gray-600">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4A373]" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
