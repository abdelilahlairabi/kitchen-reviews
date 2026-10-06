const layouts = {
  bestSellers: {
    count: 4,
    grid: 'w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6',
    card: 'min-h-[420px] p-5',
    image: 'h-48 mt-4 mb-6',
    promo: true,
    details: 'rating',
  },
  featured: {
    count: 12,
    grid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6',
    card: 'min-h-[400px] p-4',
    image: 'h-48 mb-4 p-4',
    details: 'stars',
  },
  deals: {
    count: 3,
    grid: 'grid grid-cols-1 md:grid-cols-3 gap-6',
    card: 'min-h-[500px] p-5',
    image: 'h-56 mt-6 mb-6 p-2',
    promo: true,
    details: 'deal',
  },
};

const bar = 'rounded bg-gray-200';

export default function ProductGridSkeleton({ variant }) {
  const layout = layouts[variant];

  if (!layout) return null;

  return (
    <div className={layout.grid} aria-hidden="true">
      {Array.from({ length: layout.count }, (_, index) => (
        <article
          key={index}
          className={`relative flex flex-col rounded-xl border border-gray-200 bg-white ${layout.card}`}
        >
          {layout.promo && <div className={`absolute left-4 top-4 h-5 w-20 ${bar}`} />}
          <div className={`w-full rounded-lg bg-gray-100 ${layout.image}`} />
          <div className="mb-3 min-h-10 space-y-2">
            <div className={`h-3.5 w-4/5 ${bar}`} />
            <div className={`h-3.5 w-3/5 ${bar}`} />
          </div>
          {layout.details === 'deal' && <div className={`mb-3 h-5 w-24 ${bar}`} />}
          <div className="mb-4 mt-auto flex items-center justify-between">
            <div className={`h-5 w-16 ${bar}`} />
            {layout.details === 'rating' && <div className={`h-4 w-12 ${bar}`} />}
            {layout.details === 'stars' && <div className={`h-4 w-24 ${bar}`} />}
            {layout.details === 'deal' && <div className={`h-7 w-20 ${bar}`} />}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className={`h-10 rounded-md border border-gray-200 ${bar}`} />
            <div className={`h-10 rounded-md ${bar}`} />
          </div>
        </article>
      ))}
    </div>
  );
}
