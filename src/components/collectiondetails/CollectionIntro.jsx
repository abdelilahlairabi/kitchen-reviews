export default function CollectionIntro({ collection }) {
  if (!collection) return null;

  return (
    <section aria-label="About this collection" className="max-w-5xl mx-auto my-10 md:my-14">
      <div className="max-w-3xl mx-auto border-l-2 border-[#b58a5a] pl-5 md:pl-7">
        <p className="text-xs uppercase tracking-[0.18em] font-semibold text-[#8c6744] mb-3">About this selection</p>
        <p className="text-lg md:text-xl text-gray-800 leading-relaxed">{collection.introText}</p>
      </div>

      {collection.contentSections?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
          {collection.contentSections.map((section) => (
            <article key={section.heading} className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
              <h2 className="text-xl font-bold tracking-tight text-gray-950 mb-3">{section.heading}</h2>
              <div className="space-y-3">
                {section.paragraphs?.map((paragraph) => <p key={paragraph} className="text-sm md:text-base text-gray-600 leading-relaxed">{paragraph}</p>)}
              </div>
              {section.bullets?.length > 0 && (
                <ul className="mt-4 space-y-2 border-t border-gray-100 pt-4">
                  {section.bullets.map((bullet) => <li key={bullet} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed"><span aria-hidden="true" className="mt-1.5 w-2 h-2 rounded-full bg-[#9b7049] shrink-0" /><span>{bullet}</span></li>)}
                </ul>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
