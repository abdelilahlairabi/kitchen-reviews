import { Link } from 'react-router-dom';

const KitchenInspiration = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="text-sm font-bold tracking-widest text-black text-center uppercase mb-10">
        Kitchen Inspiration
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:h-[600px]">
        <Link to="/inspiration/modern-farmhouse" className="relative block h-[400px] md:h-full rounded-2xl overflow-hidden group">
          <img src="/styles/modern-farmhouse-hero.webp" alt="Modern farmhouse kitchen with oak island and white cabinetry" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
          <div className="absolute bottom-8 inset-x-0 text-center">
            <span className="text-white text-xl sm:text-2xl font-medium tracking-wide">Modern Farmhouse</span>
          </div>
        </Link>
        <div className="flex flex-col gap-4 h-[500px] md:h-full">
          <Link to="/inspiration/minimalist-white" className="relative flex-1 block rounded-2xl overflow-hidden group">
            <img src="/styles/minimalist-white-hero.webp" alt="Minimalist white kitchen with seamless cabinetry" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
            <div className="absolute bottom-6 inset-x-0 text-center"><span className="text-white text-lg sm:text-xl font-medium tracking-wide">Minimalist White</span></div>
          </Link>
          <Link to="/inspiration/warm-scandinavian" className="relative flex-1 block rounded-2xl overflow-hidden group">
            <img src="/styles/warm-scandinavian-hero.webp" alt="Warm Scandinavian kitchen with light wood and soft neutrals" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
            <div className="absolute bottom-6 inset-x-0 text-center"><span className="text-white text-lg sm:text-xl font-medium tracking-wide">Warm Scandinavian</span></div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default KitchenInspiration;
