import { Link } from 'react-router-dom';

export default function GuideNewsletter() {
  return (
    <section className="max-w-5xl mx-auto px-4 mt-16 mb-16" aria-labelledby="guide-next-step">
      <div className="rounded-3xl bg-gray-950 text-white p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.18em] text-[#dfc39f] font-semibold mb-3">Keep exploring</p>
          <h2 id="guide-next-step" className="text-2xl md:text-3xl font-bold tracking-tight mb-3">Put the guide to work in your kitchen.</h2>
          <p className="text-gray-300 leading-relaxed">Compare the available catalog with the measurements and requirements you just reviewed.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link to="/products" className="inline-flex justify-center items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-gray-950 hover:bg-gray-100 transition-colors">Explore products <span aria-hidden="true">→</span></Link>
          <Link to="/guides" className="inline-flex justify-center items-center rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors">More guides</Link>
        </div>
      </div>
    </section>
  );
}
