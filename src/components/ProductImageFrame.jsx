/** A consistent, intentional frame for catalog imagery across product cards. */
export default function ProductImageFrame({
  src,
  alt,
  srcSet,
  webpSrcSet,
  avifSrcSet,
  sizes,
  className = '',
  children,
  loading = 'lazy',
  fetchPriority,
}) {
  return (
    <div className={`relative aspect-square w-full overflow-hidden rounded-xl border border-[#e9e3d9] bg-[#f4f1eb] ${className}`}>
      <picture className="block h-full w-full">
        {avifSrcSet && <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />}
        {webpSrcSet && <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />}
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          width="672"
          height="672"
          className="h-full w-full object-cover"
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
        />
      </picture>
      {children}
    </div>
  );
}
