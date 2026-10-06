import ProductGridSkeleton from './ProductGridSkeleton';

export default function ProductGridError({ variant, message }) {
  return (
    <div className="relative">
      <div className="opacity-0" aria-hidden="true">
        <ProductGridSkeleton variant={variant} />
      </div>
      <p
        className="absolute inset-x-0 top-0 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm text-amber-900"
        role="alert"
      >
        {message}
      </p>
    </div>
  );
}
