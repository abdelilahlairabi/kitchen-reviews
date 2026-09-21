const ProductReviews = ({ reviews }) => {
  if (!reviews?.length) return null;
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6"><h2 className="text-lg font-medium mb-2">Customer Reviews</h2><div className="flex items-center gap-2"><span className="text-3xl font-bold">{averageRating.toFixed(1)}</span><div className="flex text-[#a0aec0] text-xl" aria-label={`${averageRating.toFixed(1)} out of 5 stars`}>{'★'.repeat(Math.round(averageRating))}{'☆'.repeat(5 - Math.round(averageRating))}</div></div></div>
      <div className="space-y-4">{reviews.map((review) => <article key={`${review.name}-${review.text}`} className="border border-gray-200 p-4 rounded-lg bg-white"><div className="flex items-center gap-3 mb-2">{review.avatar ? <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover bg-gray-100" loading="lazy" /> : <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold">{review.name.charAt(0)}</div>}<div><p className="font-semibold text-sm">{review.name}</p><div className="text-[#a0aec0] text-xs" aria-label={`${review.rating} out of 5 stars`}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div></div></div><p className="text-sm text-gray-700">{review.text}</p></article>)}</div>
    </div>
  );
};

export default ProductReviews;
