export default function InspirationGrid({ items, onProductClick }) {
  const featuredItem = items.find((i) => i.featured) || items[0];
  const regularItems = items.filter((i) => i.id !== featuredItem?.id);

  return (
    <div className="max-w-5xl mx-auto px-4 space-y-6">
      {/* Carte Principale En Vedette */}
      {featuredItem && (
        <div className="relative group rounded-3xl overflow-hidden bg-gray-100 shadow-sm h-[380px] md:h-[480px]">
          <img
            src={featuredItem.image}
            alt={featuredItem.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-10">
            <h2 className="text-white text-2xl md:text-4xl font-bold mb-3">
              {featuredItem.title}
            </h2>
            <div>
              <button 
                onClick={() => onProductClick(featuredItem)}
                className="bg-[#E5C9A5] hover:bg-[#D4A373] text-gray-900 font-semibold px-5 py-2.5 rounded-xl text-xs md:text-sm transition-colors shadow-md"
              >
                View Products
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grille 2 Colonnes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {regularItems.map((item) => (
          <div
            key={item.id}
            className="relative group rounded-3xl overflow-hidden bg-gray-100 shadow-sm h-[320px] md:h-[380px]"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-white text-xl md:text-2xl font-bold mb-3">
                {item.title}
              </h3>
              <div>
                <button
                  onClick={() => onProductClick(item)}
                  className="bg-[#E5C9A5] hover:bg-[#D4A373] text-gray-900 font-semibold px-4 py-2 rounded-xl text-xs transition-colors shadow-md"
                >
                  View Products
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
