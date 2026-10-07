/** A consistent, intentional frame for catalog imagery across product cards. */
export default function ProductImageFrame({
  src,
  alt,
  srcSet,
  sizes,
  className = '',
  children,
  loading = 'lazy',
}) {
  return (
    <div className={`relative aspect-square w-full overflow-hidden rounded-xl border border-[#e9e3d9] bg-[#f4f1eb] ${className}`}>
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width="672"
        height="672"
        className="h-full w-full object-cover"
        loading={loading}
        decoding="async"
      />
      {children}
    </div>
  );
}
