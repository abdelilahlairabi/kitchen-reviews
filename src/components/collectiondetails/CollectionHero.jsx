import { Link } from 'react-router-dom';

export default function CollectionHero({ collection }) {
  return (
    <div>
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 mb-4 flex items-center gap-2">
        <Link to="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link to="/collections" className="hover:underline">Collections</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">{collection?.title}</span>
      </nav>

      {/* Main Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gray-900 text-white min-h-[320px] md:min-h-[380px] flex items-center">
        <img
          src={collection?.heroImage}
          alt={collection?.title}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

        <div className="relative z-10 p-6 md:p-12 max-w-2xl">
          {collection?.badge && (
            <span className="inline-block bg-[#C59B67] text-white text-[11px] font-bold px-3 py-1 rounded-md mb-4 uppercase tracking-wider">
              {collection.badge}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">
            {collection?.title}
          </h1>
          <p className="text-gray-200 text-sm md:text-base mb-6">
            {collection?.subtitle}
          </p>

          {collection?.curator && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-white/50 bg-white/10 flex items-center justify-center text-xs font-bold">
                {collection.curator.name.charAt(0)}
              </div>
              <span className="text-xs md:text-sm text-gray-300">
                Curated by <strong className="text-white">{collection.curator.name}</strong>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
