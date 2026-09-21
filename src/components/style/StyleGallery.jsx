export default function StyleGallery({ gallery }) {
  const cleanedGallery = (gallery || []).filter(Boolean);
  const topImages = cleanedGallery.slice(0, 2);
  const bottomImages = cleanedGallery.slice(2, 6);

  return (
    <section className="bg-gray-50/80 py-12 my-8 border-y border-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        {/* Titres */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Photo Gallery
          </h2>
          <span className="text-xs md:text-sm font-medium text-gray-500 block mt-1">
            The Look
          </span>
        </div>

        {/* Structure exacte de la galerie */}
        <div className="space-y-4 md:space-y-6">
          {/* Ligne du haut : 2 Grandes Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {topImages.map((img, idx) => (
              <div
                key={idx}
                className="rounded-2xl md:rounded-3xl overflow-hidden h-[260px] md:h-[340px] bg-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={img}
                  alt={`Gallery top ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Ligne du bas : 4 Images */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {bottomImages.map((img, idx) => (
              <div
                key={idx}
                className="rounded-2xl overflow-hidden h-[180px] md:h-[220px] bg-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={img}
                  alt={`Gallery bottom ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
