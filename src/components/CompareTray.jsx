import { ArrowLeftRight, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import useProductSlugs from '../hooks/useProductSlugs';
import { COMPARE_PRODUCTS_KEY, MAX_COMPARE_PRODUCTS } from '../utils/productPreferences';

export default function CompareTray() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { slugs, clear, isReady } = useProductSlugs(COMPARE_PRODUCTS_KEY, MAX_COMPARE_PRODUCTS);

  if (!isReady || slugs.length === 0 || pathname === '/compare') return null;

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3">
        <section aria-label="Product comparison" className="pointer-events-auto mx-auto max-w-5xl rounded-2xl border border-gray-200 bg-white p-3 shadow-[0_-6px_24px_rgba(15,23,42,0.12)] sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <ArrowLeftRight aria-hidden="true" className="h-4 w-4 shrink-0 text-gray-700" />
                <h2 className="text-sm font-bold text-gray-950">Compare products</h2>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-700">{slugs.length} of {MAX_COMPARE_PRODUCTS}</span>
              </div>
              <p className="mt-1 text-xs text-gray-500" aria-live="polite">
                {slugs.length < 2 ? 'Add one more product to compare them.' : 'Your comparison is ready.'}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:shrink-0">
              <button type="button" onClick={clear} className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-gray-300 px-3 text-xs font-semibold text-gray-700 transition-colors hover:border-gray-500 hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2">
                <X aria-hidden="true" className="h-3.5 w-3.5" />Clear
              </button>
              <button type="button" onClick={() => navigate('/compare')} disabled={slugs.length < 2} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-gray-950 px-4 text-xs font-semibold text-white transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300">
                Compare now<ArrowLeftRight aria-hidden="true" className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </section>
      </div>
      <div aria-hidden="true" className="h-28 sm:h-24" />
    </>
  );
}
