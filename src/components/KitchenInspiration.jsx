import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { guidesData } from '../data/guides';
import { stylesData } from '../data/inspirationStyles';

const featuredGuideSlugs = ['choosing-a-kitchen-faucet', 'toaster-ovens-vs-air-fryers'];
const featuredStyleSlugs = ['modern-farmhouse', 'minimalist-white'];

const featuredLinks = [
  ...featuredStyleSlugs.map((slug) => {
    const style = stylesData[slug];
    return {
      key: `style-${slug}`,
      href: `/inspiration/${slug}`,
      eyebrow: 'Kitchen inspiration',
      title: style.title,
      description: style.subtitle,
      image: style.heroImage,
    };
  }),
  ...featuredGuideSlugs.map((slug) => {
    const guide = guidesData.find((item) => item.slug === slug);
    return {
      key: `guide-${slug}`,
      href: `/guides/${slug}`,
      eyebrow: guide.badge,
      title: guide.title,
      description: guide.desc,
      image: guide.image,
    };
  }),
];

const KitchenInspiration = () => (
  <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8" aria-labelledby="home-ideas-heading">
    <div className="mb-6 flex flex-col gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-[#8c6744]">Ideas &amp; guides</p>
        <h2 id="home-ideas-heading" className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">Make your next kitchen decision easier</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600">Explore practical buying advice and kitchen styles, then browse the full guides and inspiration collections.</p>
      </div>
      <div className="flex shrink-0 items-center gap-4 text-sm font-semibold">
        <Link to="/guides" className="inline-flex items-center gap-1 text-gray-700 transition-colors hover:text-gray-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-900">
          All guides <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
        <Link to="/inspiration" className="inline-flex items-center gap-1 text-gray-700 transition-colors hover:text-gray-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gray-900">
          All inspiration <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
      {featuredLinks.map((item) => (
        <Link
          key={item.key}
          to={item.href}
          className="group min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
            <img
              src={item.image}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            <span className="absolute left-2 top-2 rounded-full bg-white/95 px-2 py-1 text-[10px] font-semibold text-gray-800 shadow-sm sm:left-3 sm:top-3 sm:px-3 sm:text-xs">
              {item.eyebrow}
            </span>
          </div>
          <div className="p-3 sm:p-4">
            <h3 className="line-clamp-2 min-h-10 text-sm font-bold leading-snug text-gray-950 group-hover:underline sm:text-base">{item.title}</h3>
            <p className="mt-2 hidden line-clamp-2 text-xs leading-relaxed text-gray-600 sm:block">{item.description}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-gray-700 sm:mt-4">
              {item.eyebrow === 'Kitchen inspiration' ? 'Explore style' : 'Read guide'}
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default KitchenInspiration;
