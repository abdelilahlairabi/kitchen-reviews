import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Newsletter = () => {
  return (
    <section className="w-full px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="relative isolate mx-auto grid max-w-7xl overflow-hidden rounded-3xl bg-[#202521] px-6 py-10 text-white shadow-sm sm:px-10 sm:py-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-12 lg:px-16">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-32 -z-10 h-80 w-80 rounded-full bg-[#dcb589]/20 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-36 left-1/3 -z-10 h-72 w-72 rounded-full bg-[#8f9a78]/15 blur-3xl" />

        <div className="max-w-2xl">
          <span className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#e8c99f]">
            Kitchen buying guides
          </span>
          <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Choose what fits your kitchen—not just the trend.
          </h2>
          <p className="mb-7 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
            Compare dimensions, materials, installation, and care before you decide.
          </p>
          <Link to="/guides" className="inline-flex items-center gap-2 rounded-full bg-[#e5c39a] px-6 py-3 text-sm font-bold text-[#202521] transition-colors hover:bg-[#f0d5b2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            Explore buying guides <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-9 rounded-2xl border border-white/15 bg-white/[0.06] p-5 sm:p-6 lg:mt-0" aria-label="What the guides help you compare">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-white/55">Before you choose</p>
          <ul className="space-y-3">
            {['Fit and dimensions', 'Materials and features', 'Care and warranty'].map((item, index) => (
              <li key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-sm font-medium text-white/90">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e5c39a]/15 text-xs font-bold text-[#e5c39a]">0{index + 1}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
