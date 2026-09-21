import { Link } from 'react-router-dom';

const GuidesGrid = ({ guides, isLoading, isError }) => {
  if (isLoading) return <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center text-gray-600">Loading guides…</div>;
  if (isError) return <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center text-gray-600">Unable to load guides. Please try again.</div>;
  if (guides.length === 0) return <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center text-gray-600">No guides are available yet.</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {guides.map((guide) => (
          <Link key={guide.id} to={`/guides/${guide.slug}`} className="group block border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow bg-white">
            <div className="relative h-56 w-full overflow-hidden">
              <span className="absolute top-4 left-4 z-10 bg-[#ebd5b3] text-black text-xs font-bold px-3 py-1 rounded">
                {guide.badge}
              </span>
              <img 
                src={guide.image} 
                alt={guide.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700">{guide.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{guide.desc}</p>
              <div className="text-xs text-gray-500 font-medium">
                {guide.time}
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
};

export default GuidesGrid;
