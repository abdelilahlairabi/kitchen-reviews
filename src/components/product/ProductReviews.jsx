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

const ProductReviews = ({ reviews = [], rating, reviewCount, ratingDistribution, sourceMarketplace }) => {
  const averageRating = Number(rating);
  const hasRating = rating !== null && rating !== undefined && rating !== '' && Number.isFinite(averageRating);
  const hasSummary = hasRating || Number(reviewCount) > 0;
  if (!hasSummary && reviews.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8" aria-labelledby="product-reviews-title">
      <div className="mb-7 border-b border-gray-200 pb-5">
        <h2 id="product-reviews-title" className="text-xl font-bold text-gray-950">{sourceMarketplace?.startsWith('amazon.') ? 'Amazon customer rating and reviews' : 'Customer rating and reviews'}</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-[12rem_1fr]">
          <div>
            {hasRating && <div className="flex items-baseline gap-2"><span className="text-4xl font-bold text-gray-950">{averageRating.toFixed(1)}</span><span className="text-amber-500" aria-label={`${averageRating.toFixed(1)} out of 5 stars`}>★★★★★</span></div>}
            {Number(reviewCount) > 0 && <p className="mt-1 text-sm text-gray-500">{sourceMarketplace?.startsWith('amazon.') ? 'Amazon rating · ' : 'Based on '}{Number(reviewCount).toLocaleString()} ratings</p>}
            <StarBreakdown ratingDistribution={ratingDistribution} />
          </div>
          {reviews.length > 0 && <p className="self-center text-sm leading-6 text-gray-600">The reviews below are customer-submitted opinions from the linked retailer. They may reflect a different product variant; check the retailer page for the latest information.</p>}
        </div>
      </div>

      {reviews.length > 0 && <div className="grid gap-4 md:grid-cols-2">
        {reviews.map((review, index) => <article key={review.sourceKey || `${review.name}-${review.date}-${index}`} className="rounded-xl border border-gray-200 bg-white p-5">
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
          <p className="whitespace-pre-line text-sm leading-6 text-gray-700">{review.text}</p>
          {review.images?.length > 0 && <div className="mt-4 flex gap-2 overflow-x-auto">
            {review.images.map((image, imageIndex) => {
              const src = typeof image === 'string' ? image : image?.url || image?.image_url;
              return src ? <img key={`${src}-${imageIndex}`} src={src} alt={`Customer review photo ${imageIndex + 1}`} className="h-20 w-20 shrink-0 rounded-lg border border-gray-100 object-cover" loading="lazy" /> : null;
            })}
          </div>}
          {review.helpfulCount > 0 && <p className="mt-4 text-xs text-gray-500">{Number(review.helpfulCount).toLocaleString()} people found this helpful</p>}
          {review.source && <p className="mt-3 text-[11px] text-gray-400">Source: {review.source}</p>}
        </article>)}
      </div>}
    </section>
  );
};

export default ProductReviews;
