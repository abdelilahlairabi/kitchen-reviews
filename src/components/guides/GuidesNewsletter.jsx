import { Link } from 'react-router-dom';

const GuidesNewsletter = () => (
  <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20" aria-labelledby="guides-next-step">
    <div className="rounded-3xl bg-[#f5f1e9] border border-[#ebe4d8] p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#86623d] mb-3">Make your next choice with confidence</p>
        <h2 id="guides-next-step" className="text-2xl md:text-3xl font-bold tracking-tight text-gray-950 mb-3">Turn what you learned into a practical shortlist.</h2>
        <p className="text-gray-600 leading-relaxed">Browse the kitchen catalog and compare products against the measurements, materials, and features that matter to your home.</p>
      </div>
      <Link to="/products" className="inline-flex justify-center items-center gap-2 bg-gray-950 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-full transition-colors shrink-0">
        Explore kitchen products <span aria-hidden="true">→</span>
      </Link>
    </div>
  </section>
);

export default GuidesNewsletter;
