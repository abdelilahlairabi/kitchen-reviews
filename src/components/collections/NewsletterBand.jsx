import { Link } from 'react-router-dom';

const NewsletterBand = () => (
  <section className="max-w-6xl mx-auto px-4 mb-16" aria-labelledby="collection-next-step">
    <div className="rounded-3xl bg-[#f5f1e9] border border-[#ebe4d8] p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#86623d] mb-3">Choose with a plan</p>
        <h2 id="collection-next-step" className="text-2xl md:text-3xl font-bold tracking-tight text-gray-950 mb-3">Compare the details that matter to your kitchen.</h2>
        <p className="text-gray-600 leading-relaxed">Use the buying guides to check dimensions, materials, installation, and care before you buy.</p>
      </div>
      <Link to="/guides" className="inline-flex justify-center items-center gap-2 rounded-full bg-gray-950 hover:bg-gray-800 text-white font-semibold px-6 py-3 transition-colors shrink-0">Read buying guides <span aria-hidden="true">→</span></Link>
    </div>
  </section>
);

export default NewsletterBand;
