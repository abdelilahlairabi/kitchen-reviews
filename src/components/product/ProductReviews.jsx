import { useMemo, useState } from 'react';

const REVIEWS_PER_PAGE = 3;
const EMPTY_REVIEWS = [];

const StarBreakdown = ({ ratingDistribution = {} }) => {
  const rows = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    percentage: Math.max(0, Math.min(100, Number(ratingDistribution[String(stars)] ?? ratingDistribution[`${stars}_star_percentage`] ?? 0) || 0)),
  }));

  if (!rows.some((row) => row.percentage > 0)) return null;

  return <div className="mt-5 space-y-2" aria-label="Rating distribution">
    {rows.map(({ stars, percentage }) => <div key={stars} className="grid grid-cols-[2rem_1fr_2.5rem] items-center gap-3 text-xs text-gray-600">
      <span>{stars} star</span>
      <span className="h-2 overflow-hidden rounded-full bg-gray-100"><span className="block h-full rounded-full bg-amber-400" style={{ width: `${percentage}%` }} /></span>
      <span className="text-right">{percentage}%</span>
    </div>)}
  </div>;
};

const ProductReviews = ({ reviews = EMPTY_REVIEWS, rating, reviewCount, ratingDistribution, sourceMarketplace }) => {
  const [page, setPage] = useState(1);
  const [expandedReviews, setExpandedReviews] = useState(() => new Set());
  const averageRating = Number(rating);
  const hasRating = rating !== null && rating !== undefined && rating !== '' && Number.isFinite(averageRating);
  const hasSummary = hasRating || Number(reviewCount) > 0;
  const pageCount = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const currentPage = Math.min(page, Math.max(1, pageCount));
  const visibleReviews = useMemo(
    () => reviews.slice((currentPage - 1) * REVIEWS_PER_PAGE, currentPage * REVIEWS_PER_PAGE),
    [reviews, currentPage],
  );
  const firstReview = reviews.length ? (currentPage - 1) * REVIEWS_PER_PAGE + 1 : 0;
  const lastReview = Math.min(currentPage * REVIEWS_PER_PAGE, reviews.length);

  if (!hasSummary && reviews.length === 0) return null;

  const changePage = (nextPage) => {
    setPage(Math.max(1, Math.min(pageCount, nextPage)));
    setExpandedReviews(new Set());
  };

  const pageButtons = Array.from({ length: pageCount }, (_, index) => index + 1)
    .filter((pageNumber) => pageNumber === 1 || pageNumber === pageCount || Math.abs(pageNumber - currentPage) <= 1);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="product-reviews-title">
      <div className="mb-7 rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">Real buyer feedback</p>
            <h2 id="product-reviews-title" className="text-xl font-bold text-gray-950">{sourceMarketplace?.startsWith('amazon.') ? 'Customer rating and reviews' : 'Customer rating and reviews'}</h2>
          </div>
          {reviews.length > 0 && <span className="rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600">{reviews.length.toLocaleString()} review{reviews.length === 1 ? '' : 's'} shown</span>}
        </div>
        <div className="mt-5 grid gap-6 border-t border-gray-100 pt-5 sm:grid-cols-[minmax(12rem,0.7fr)_1.3fr]">
          <div>
            {hasRating && <div className="flex items-baseline gap-2"><span className="text-4xl font-bold tracking-tight text-gray-950">{averageRating.toFixed(1)}</span><span className="text-lg tracking-wide text-amber-500" aria-label={`${averageRating.toFixed(1)} out of 5 stars`}>★★★★★</span></div>}
            {Number(reviewCount) > 0 && <p className="mt-1 text-sm text-gray-500">{sourceMarketplace?.startsWith('amazon.') ? 'Amazon rating · ' : 'Based on '}{Number(reviewCount).toLocaleString()} ratings</p>}
            <StarBreakdown ratingDistribution={ratingDistribution} />
          </div>
          {reviews.length > 0 && <p className="self-center text-sm leading-6 text-gray-600">These are customer-submitted opinions from the linked retailer. They may reflect a different product variant; check the retailer page for the latest details.</p>}
        </div>
      </div>

      {reviews.length > 0 && <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-gray-600" aria-live="polite">Showing <span className="font-semibold text-gray-900">{firstReview}–{lastReview}</span> of <span className="font-semibold text-gray-900">{reviews.length.toLocaleString()}</span> reviews</p>
        {pageCount > 1 && <p className="text-xs text-gray-500">Page {currentPage} of {pageCount}</p>}
      </div>
      <div className="grid items-start gap-4 md:grid-cols-2">
        {visibleReviews.map((review, index) => {
          const reviewKey = review.sourceKey || `${review.name}-${review.date}-${(currentPage - 1) * REVIEWS_PER_PAGE + index}`;
          const isExpanded = expandedReviews.has(reviewKey);
          const hasLongText = String(review.text || '').length > 360;
          return <article key={reviewKey} className="min-w-0 rounded-xl border border-gray-200 bg-white p-5 shadow-sm shadow-gray-950/[0.02]">
          <div className="mb-3 flex items-start justify-between gap-4">
            <div>
              {review.title && <h3 className="mb-1 text-sm font-semibold text-gray-900">{review.title}</h3>}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500">
                {review.reviewerUrl ? <a href={review.reviewerUrl} target="_blank" rel="noopener noreferrer nofollow" className="font-medium text-gray-700 underline decoration-gray-300 underline-offset-2">{review.name}</a> : <span className="font-medium text-gray-700">{review.name}</span>}
                {review.verifiedPurchase && <span className="rounded-full bg-green-50 px-2 py-0.5 text-green-800">Verified purchase</span>}
              </div>
            </div>
            <span className="shrink-0 text-sm text-amber-500" aria-label={`${review.rating} out of 5 stars`}>{'★'.repeat(Math.max(0, Math.min(5, Number(review.rating) || 0)))}{'☆'.repeat(5 - Math.max(0, Math.min(5, Number(review.rating) || 0)))}</span>
          </div>
          {review.date && <p className="mb-3 text-xs text-gray-400">{review.date}</p>}
          {review.variation && Object.keys(review.variation).length > 0 && <p className="mb-3 text-xs text-gray-500">Variant: {Object.values(review.variation).filter((value) => typeof value === 'string' && !value.startsWith('/')).join(' · ')}</p>}
          <p className={`whitespace-pre-line text-sm leading-6 text-gray-700 ${hasLongText && !isExpanded ? 'line-clamp-6' : ''}`}>{review.text}</p>
          {hasLongText && <button type="button" onClick={() => setExpandedReviews((current) => {
            const next = new Set(current);
            if (next.has(reviewKey)) next.delete(reviewKey); else next.add(reviewKey);
            return next;
          })} className="mt-2 text-sm font-semibold text-amber-800 underline decoration-amber-300 underline-offset-2 hover:text-amber-950">
            {isExpanded ? 'Show less' : 'Read full review'}
          </button>}
          {review.images?.length > 0 && <div className="mt-4 flex gap-2 overflow-x-auto">
            {review.images.map((image, imageIndex) => {
              const src = typeof image === 'string' ? image : image?.url || image?.image_url;
              return src ? <img key={`${src}-${imageIndex}`} src={src} alt={`Customer review photo ${imageIndex + 1}`} className="h-20 w-20 shrink-0 rounded-lg border border-gray-100 object-cover" loading="lazy" /> : null;
            })}
          </div>}
          {review.helpfulCount > 0 && <p className="mt-4 text-xs text-gray-500">{Number(review.helpfulCount).toLocaleString()} people found this helpful</p>}
          {review.source && <p className="mt-3 text-[11px] text-gray-400">Source: {review.source}</p>}
        </article>;
        })}
      </div>
      {pageCount > 1 && <nav className="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label="Review pages">
        <button type="button" onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1} className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
        {pageButtons.map((pageNumber, index) => {
          const previousPage = pageButtons[index - 1];
          return <span key={pageNumber} className="contents">
            {previousPage && pageNumber - previousPage > 1 && <span aria-hidden="true" className="px-1 text-gray-400">…</span>}
            <button type="button" onClick={() => changePage(pageNumber)} aria-current={currentPage === pageNumber ? 'page' : undefined} aria-label={`Page ${pageNumber}`} className={`min-w-10 rounded-lg border px-3 py-2 text-sm font-semibold transition ${currentPage === pageNumber ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'}`}>{pageNumber}</button>
          </span>;
        })}
        <button type="button" onClick={() => changePage(currentPage + 1)} disabled={currentPage === pageCount} className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40">Next</button>
      </nav>}
      </>}
    </section>
  );
};

export default ProductReviews;
