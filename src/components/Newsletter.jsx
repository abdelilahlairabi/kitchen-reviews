import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Newsletter = () => {
  return (
    <section className="w-full bg-white py-16 sm:py-24 border-t border-gray-100">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-bold tracking-widest text-gray-800 uppercase mb-3 block">Plan with confidence</span>
        <h2 className="text-2xl sm:text-3xl font-bold text-black mb-3">Make your next kitchen upgrade a good one</h2>
        <p className="text-gray-600 text-sm mb-8">Compare the details that matter with practical guides for choosing kitchen products.</p>
        <Link to="/guides" className="inline-flex items-center gap-2 rounded-full bg-[#dcb589] px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-[#cba478]">
          Explore our buying guides <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
};

export default Newsletter;
