const AMAZON_SIZE_PATTERN = /\._(?:AC(?:_[A-Z0-9_]*)?|SL[0-9]+_)(?=\.(?:jpe?g|png|webp)(?:\?|$))/i;
const RESPONSIVE_WIDTHS = [320, 480, 640];
const COMPRESSED_IMAGE_ID = '/81IC5+bWDgL.';

export function getAmazonImageSrcSets(src, widths = RESPONSIVE_WIDTHS) {
  if (!src?.startsWith('https://m.media-amazon.com/images/I/') || !AMAZON_SIZE_PATTERN.test(src)) {
    return {};
  }

  const avifQuality = src.includes(COMPRESSED_IMAGE_ID) ? 40 : 65;
  const createSrcSet = (format) => widths
    .map((width) => {
      const suffix = format === 'avif'
        ? `._AC_SX${width}_FMavif_QL${avifQuality}_`
        : format === 'webp'
          ? `._AC_SX${width}_FMwebp_QL65_`
          : `._AC_SX${width}_`;
      return `${src.replace(AMAZON_SIZE_PATTERN, suffix)} ${width}w`;
    })
    .join(', ');

  return {
    srcSet: createSrcSet('jpeg'),
    webpSrcSet: createSrcSet('webp'),
    avifSrcSet: createSrcSet('avif'),
  };
}
