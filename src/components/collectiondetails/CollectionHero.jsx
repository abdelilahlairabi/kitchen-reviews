import { Link } from 'react-router-dom';

const getCollectionHeroSrcSet = (collection) => {
  const imageBase = collection.image.replace(/\.webp$/i, '');
  return `${imageBase}-hero-480.webp 480w, ${imageBase}-hero-854.webp 854w, ${collection.image} ${collection.imageWidth}w`;
};

export default function CollectionHero({ collection }) {
  return (
    <header>
      <nav aria-label="Breadcrumb" className="text-xs text-gray-500 mb-7 flex items-center gap-2">
        <Link to="/" className="hover:text-gray-950 hover:underline">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/collections" className="hover:text-gray-950 hover:underline">Collections</Link>
        <span aria-hidden="true">/</span>
        <span className="text-gray-800 font-medium">{collection.name}</span>
      </nav>

      <div className="relative rounded-3xl overflow-hidden bg-gray-900 text-white min-h-[390px] md:min-h-[500px] flex items-end">
        <img
          src={collection.image}
          srcSet={getCollectionHeroSrcSet(collection)}
          sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) calc(100vw - 48px), (max-width: 1343px) calc(100vw - 64px), 1216px"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/85 via-black/55 to-black/10" aria-hidden="true" />

        <div className="relative z-10 p-7 md:p-12 max-w-3xl">
          {collection.badge && (
            <span className="inline-block bg-white/95 text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              {collection.badge}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            {collection.name}
          </h1>
          <p className="text-gray-100 text-base md:text-lg leading-relaxed mb-7 max-w-2xl">
            {collection.subtitle}
          </p>
          <a href="#collection-products" className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-gray-100 text-gray-950 font-semibold px-5 py-3 text-sm transition-colors">Browse the picks <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </header>
  );
}
