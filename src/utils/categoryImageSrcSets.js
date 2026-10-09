export const getCategoryHeroSrcSet = (category) => {
  const imageBase = category.heroImage.replace(/\.webp$/i, '');
  return `${imageBase}-hero-480.webp 480w, ${imageBase}-hero-768.webp 768w, ${category.heroImage} ${category.heroImageWidth}w`;
};
