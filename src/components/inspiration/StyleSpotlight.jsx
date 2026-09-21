export default function StyleSpotlight({ spotlight }) {
  return (
    <section className="max-w-5xl mx-auto px-4 my-16">
      <div className="bg-[#EFECE6] rounded-3xl p-6 md:p-10">
        <div className="text-center mb-8">
          <span className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase">
            {spotlight.subtitle}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1">
            {spotlight.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-white">
          {/* Image */}
          <div className="md:col-span-5 h-64 md:h-72 rounded-2xl overflow-hidden bg-gray-200">
            <img
              src={spotlight.image}
              alt={spotlight.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text & Icon List */}
          <div className="md:col-span-7 space-y-6">
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
              {spotlight.description}
            </p>

            {/* Pastilles d'éléments circulaires */}
            {spotlight.featuredItems.length > 0 && <div className="flex flex-wrap items-center gap-6 pt-2">
              {spotlight.featuredItems.map((item) => (
                <div key={item.id} className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white shadow-sm bg-gray-100 group-hover:scale-105 transition-transform">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-gray-800">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>}
          </div>
        </div>
      </div>
    </section>
  );
}
