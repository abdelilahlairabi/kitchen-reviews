const PRIOR_STRENGTH = 20;
const WILSON_Z = 1.96;
const MAX_PRODUCTS_PER_CATEGORY = 2;

const finiteRating = (value) => {
  const rating = Number(value);
  return Number.isFinite(rating) && rating >= 1 && rating <= 5 ? rating : null;
};

const finiteCount = (value) => {
  const count = Number(value);
  return Number.isFinite(count) && count > 0 ? count : 0;
};

const distributionCounts = (distribution, reviewCount) => {
  if (!distribution || typeof distribution !== 'object') return null;

  const values = [1, 2, 3, 4, 5].map((stars) => finiteCount(
    distribution[String(stars)] ?? distribution[`${stars}_star_percentage`],
  ));
  const sum = values.reduce((total, count) => total + count, 0);
  if (!sum) return null;

  // Amazon-style distributions may be percentages (sum ~100), proportions (sum ~1),
  // or counts. Normalize all supported shapes to the supplied review total.
  if (sum <= 1.01 || sum <= 100.5) {
    const totalReviews = finiteCount(reviewCount);
    if (!totalReviews) return null;
    return values.map((value) => (value / sum) * totalReviews);
  }

  return values;
};

const wilsonLowerBound = (positiveCount, totalCount) => {
  if (!totalCount) return null;
  const proportion = positiveCount / totalCount;
  const zSquared = WILSON_Z ** 2;
  const denominator = 1 + zSquared / totalCount;
  const center = proportion + zSquared / (2 * totalCount);
  const margin = WILSON_Z * Math.sqrt(
    (proportion * (1 - proportion) / totalCount)
      + (zSquared / (4 * totalCount ** 2)),
  );

  return Math.max(0, (center - margin) / denominator);
};

const completenessScore = (product) => {
  let score = 0;
  if (product.image) score += 0.3;
  if (product.description?.trim()) score += 0.2;
  if (Array.isArray(product.features) && product.features.length) score += 0.2;
  if (product.specs && Object.keys(product.specs).length) score += 0.2;
  if (product.affiliateUrl) score += 0.1;
  return score;
};

const freshnessScore = (lastScrapedAt, now) => {
  const timestamp = Date.parse(lastScrapedAt || '');
  if (!Number.isFinite(timestamp)) return 0;
  const ageInDays = Math.max(0, (now - timestamp) / 86_400_000);
  return Math.max(0, 1 - ageInDays / 180);
};

const getQualityScore = (product, priorMean, now) => {
  const rating = finiteRating(product.rating);
  const reviewCount = finiteCount(product.reviewCount);
  const bayesianRating = rating === null
    ? priorMean
    : ((rating * reviewCount) + (priorMean * PRIOR_STRENGTH))
      / (reviewCount + PRIOR_STRENGTH);
  const counts = distributionCounts(product.ratingDistribution, reviewCount);
  const totalCount = counts?.reduce((total, count) => total + count, 0) || 0;
  const positiveCount = counts ? counts[3] + counts[4] : 0;
  const wilsonScore = wilsonLowerBound(positiveCount, totalCount);

  // Wilson's conservative lower bound rewards stable positive feedback. When a
  // rating breakdown is unavailable, use the confidence-adjusted average rating.
  const ratingScore = wilsonScore === null
    ? bayesianRating / 5
    : (0.55 * (bayesianRating / 5)) + (0.45 * wilsonScore);

  // Data freshness/completeness are deliberately small tie-break signals, not
  // substitutes for customer feedback or product quality.
  const dataMultiplier = 0.98
    + (0.01 * completenessScore(product))
    + (0.01 * freshnessScore(product.lastScrapedAt, now));

  return ratingScore * dataMultiplier;
};

const categoryKey = (product) => product.categorySlug || `uncategorized-${product.id}`;
const brandKey = (product) => String(product.brandName || '').trim().toLowerCase();

export function rankFeaturedProducts(products, limit = 8, now = Date.now()) {
  if (!Array.isArray(products) || limit <= 0) return [];

  const ratings = products.map((product) => finiteRating(product.rating)).filter((rating) => rating !== null);
  const priorMean = ratings.length
    ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
    : 4;
  const candidates = products.map((product) => ({
    product,
    quality: getQualityScore(product, priorMean, now),
  }));
  const selected = [];
  const categoryCounts = new Map();
  const brandCounts = new Map();
  const remaining = [...candidates];
  const resultLimit = Math.min(Math.floor(limit), candidates.length);

  while (selected.length < resultLimit) {
    const categoryEligible = remaining.filter(({ product }) =>
      (categoryCounts.get(categoryKey(product)) || 0) < MAX_PRODUCTS_PER_CATEGORY);
    const eligible = categoryEligible.length ? categoryEligible : remaining;

    eligible.sort((left, right) => {
      const leftBrand = brandKey(left.product);
      const rightBrand = brandKey(right.product);
      const leftScore = left.quality
        - (0.12 * (categoryCounts.get(categoryKey(left.product)) || 0))
        - (0.035 * (brandCounts.get(leftBrand) || 0));
      const rightScore = right.quality
        - (0.12 * (categoryCounts.get(categoryKey(right.product)) || 0))
        - (0.035 * (brandCounts.get(rightBrand) || 0));

      return rightScore - leftScore
        || finiteCount(right.product.reviewCount) - finiteCount(left.product.reviewCount)
        || (finiteRating(right.product.rating) || 0) - (finiteRating(left.product.rating) || 0)
        || String(left.product.id).localeCompare(String(right.product.id));
    });

    const [next] = eligible;
    remaining.splice(remaining.indexOf(next), 1);
    selected.push(next.product);
    categoryCounts.set(categoryKey(next.product), (categoryCounts.get(categoryKey(next.product)) || 0) + 1);
    const brand = brandKey(next.product);
    if (brand) brandCounts.set(brand, (brandCounts.get(brand) || 0) + 1);
  }

  return selected;
}
