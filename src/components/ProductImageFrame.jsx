import { useState } from 'react';

/** A consistent, intentional frame for catalog imagery across product cards. */
export default function ProductImageFrame({
  src,
  alt,
  srcSet,
  webpSrcSet,
  avifSrcSet,
  sizes,
  className = '',
  aspectRatio = true,
  imageFit = 'cover',
  children,
  loading = 'lazy',
  fetchPriority,
}) {
  const [failedSource, setFailedSource] = useState(null);
  const imageFailed = failedSource === src;

  return (
    <div className={`relative ${aspectRatio ? 'aspect-square' : ''} w-full overflow-hidden rounded-xl border border-[#e9e3d9] bg-[#f4f1eb] ${className}`}>
      {imageFailed ? (
        <div role="img" aria-label={`Image unavailable: ${alt}`} className="flex h-full w-full flex-col items-center justify-center gap-2 px-4 text-center text-sm text-gray-500">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-gray-400" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <circle cx="8.5" cy="9" r="1.5" />
            <path d="m21 15-5-5L5 20M3 3l18 18" />
          </svg>
          <span>Image unavailable</span>
        </div>
      ) : (
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
            className={`h-full w-full ${imageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
            loading={loading}
            fetchPriority={fetchPriority}
            decoding="async"
            onError={() => setFailedSource(src)}
          />
        </picture>
      )}
      {children}
    </div>
  );
}
