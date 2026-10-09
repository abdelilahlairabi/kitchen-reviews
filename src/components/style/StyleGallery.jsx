import { getStyleGalleryImageSrcSet } from '../../utils/styleImageSrcSets';

export default function StyleGallery({ gallery }) {
  const cleanedGallery = (gallery || []).filter(Boolean).map((image) => (
    typeof image === 'string'
      ? { src: image, alt: 'Kitchen design inspiration' }
      : image
  ));
  const topImages = cleanedGallery.slice(0, 2);
  const bottomImages = cleanedGallery.slice(2, 6);

  return (
    <section id="style-gallery" aria-labelledby="style-gallery-heading" className="scroll-mt-20 bg-gray-50 py-12 md:py-16 my-8 border-y border-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        {/* Titres */}
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.18em] font-semibold text-[#8c6744] mb-2">Visual references</p>
          <h2 id="style-gallery-heading" className="text-2xl md:text-3xl font-bold tracking-tight text-gray-950">Explore the details</h2>
          <p className="text-sm text-gray-600 mt-2">Illustrative kitchen concepts for this design direction.</p>
        </div>

        {/* Structure exacte de la galerie */}
        <div className="space-y-4 md:space-y-6">
          {/* Ligne du haut : 2 Grandes Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {topImages.map((img, idx) => (
              <div
                key={idx}
                className="rounded-2xl md:rounded-3xl overflow-hidden aspect-[4/3] bg-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={img.src}
                  srcSet={getStyleGalleryImageSrcSet(img.src)}
                  sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1023px) calc((100vw - 56px) / 2), 484px"
                  alt={img.alt || `Gallery image ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>

          {/* Ligne du bas : 4 Images */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {bottomImages.map((img, idx) => (
              <div
                key={idx}
                className="rounded-2xl overflow-hidden aspect-[4/3] bg-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={img.src}
                  srcSet={getStyleGalleryImageSrcSet(img.src)}
                  sizes="(max-width: 767px) calc((100vw - 48px) / 2), 230px"
                  alt={img.alt || `Gallery image ${idx + 3}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
