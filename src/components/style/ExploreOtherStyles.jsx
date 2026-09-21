import { Link } from 'react-router-dom';

export default function ExploreOtherStyles({ otherStyles }) {
  return (
    <section className="max-w-5xl mx-auto px-4 my-16">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 text-center mb-8">
        Explore Other Styles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {otherStyles.map((item) => (
          <Link
            key={item.slug}
            to={`/inspiration/${item.slug}`}
            className="relative rounded-2xl overflow-hidden h-40 group shadow-xs hover:shadow-md transition-shadow"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
              <span className="text-white font-bold text-base md:text-lg text-center drop-shadow-md">
                {item.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}