export const getStyleHeroImageSrcSet = (image) => {
  const imageBase = image.replace(/\.webp$/i, '');
  return `${imageBase}-card-480.webp 480w, ${imageBase}-card-854.webp 854w, ${image} 1376w`;
};

export const getStyleGalleryImageSrcSet = (image) => {
  const imageBase = image.replace(/\.webp$/i, '');
  return `${imageBase}-480.webp 480w, ${imageBase}-854.webp 854w`;
};
