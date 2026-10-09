import test from 'node:test';
import assert from 'node:assert/strict';
import { rankFeaturedProducts } from '../src/utils/featuredProductRanking.js';

const product = (overrides) => ({
  id: '1',
  slug: 'sample-product',
  categorySlug: 'appliances',
  brandName: 'Sample',
  rating: 4.5,
  reviewCount: 100,
  ratingDistribution: {},
  ...overrides,
});

test('uses review volume and rating distribution to temper tiny review samples', () => {
  const lowSample = product({
    id: 'low-sample',
    rating: 5,
    reviewCount: 3,
    ratingDistribution: { 5: 3 },
  });
  const established = product({
    id: 'established',
    rating: 4.7,
    reviewCount: 500,
    ratingDistribution: { 1: 10, 2: 10, 3: 20, 4: 60, 5: 400 },
  });

  assert.equal(rankFeaturedProducts([lowSample, established], 2)[0].id, 'established');
});

test('limits repeated categories when alternatives exist and diversifies repeated brands', () => {
  const products = Array.from({ length: 12 }, (_, index) => product({
    id: String(index + 1),
    slug: `product-${index + 1}`,
    categorySlug: `category-${Math.floor(index / 3)}`,
    brandName: index % 2 === 0 ? 'Same Brand' : `Brand ${index}`,
    rating: 4.8 - (index % 3) * 0.1,
    reviewCount: 200 - index,
  }));

  const ranked = rankFeaturedProducts(products, 8);
  const categoryCounts = ranked.reduce((counts, item) => {
    counts.set(item.categorySlug, (counts.get(item.categorySlug) || 0) + 1);
    return counts;
  }, new Map());

  assert.equal(ranked.length, 8);
  assert.ok([...categoryCounts.values()].every((count) => count <= 2));
  assert.notEqual(ranked[0].brandName, ranked[1].brandName);
});

test('handles missing ratings, review distributions, and invalid limits safely', () => {
  const unrated = product({ id: 'unrated', rating: null, reviewCount: null, ratingDistribution: null });

  assert.deepEqual(rankFeaturedProducts([unrated], 8).map((item) => item.id), ['unrated']);
  assert.deepEqual(rankFeaturedProducts([unrated], 0), []);
});
