import { supabase } from '../utils/supabase';
import { isValidAmazonProductUrl } from '../utils/affiliate';

export const PRODUCT_PAGE_SIZE = 12;
const MAX_PAGE_SIZE = 24;

const sortColumns = {
  popularity: { column: 'review_count', ascending: false },
  'price-asc': { column: 'price', ascending: true },
  'price-desc': { column: 'price', ascending: false },
  rating: { column: 'rating', ascending: false },
  discount: { column: 'discount_percent', ascending: false },
};

export const productColumns = `
  id, slug, name, category_id, primary_image, price, original_price,
  discount_percent, rating, review_count, badge, affiliate_url,
  description, features, specs, brand_name, model_number, upc,
  availability_status, shipping_price, shipping_time, shipping_condition,
  sold_by, ships_from, is_coupon_available, source_category_path, aplus_present,
  rating_distribution, variants, last_scraped_at, source_marketplace
`;

// Filter at the database level so products without a valid Amazon destination
// never appear in cards, detail pages, or pagination counts.
const validAmazonAffiliateUrlFilter = [
  'affiliate_url.imatch."^https://amazon[.]com/([^?#]*/)?dp/[A-Za-z0-9]{10}([/?#].*)?$"',
  'affiliate_url.imatch."^https://amazon[.]com/([^?#]*/)?gp/product/[A-Za-z0-9]{10}([/?#].*)?$"',
  'affiliate_url.imatch."^https://www[.]amazon[.]com/([^?#]*/)?dp/[A-Za-z0-9]{10}([/?#].*)?$"',
  'affiliate_url.imatch."^https://www[.]amazon[.]com/([^?#]*/)?gp/product/[A-Za-z0-9]{10}([/?#].*)?$"',
  'affiliate_url.imatch."^https://amzn[.]to/[A-Za-z0-9]{4,}([?#].*)?$"',
].join(',');

const normalizePage = (value) => Math.max(1, Number.parseInt(value, 10) || 1);
const normalizePageSize = (value) => Math.min(MAX_PAGE_SIZE, Math.max(1, Number.parseInt(value, 10) || PRODUCT_PAGE_SIZE));
const normalizeSearch = (value) => String(value || '').trim().slice(0, 80);
const normalizeCategorySlug = (value) => String(value || '').trim().toLowerCase().slice(0, 160);

export const toProduct = (row) => ({
  id: row.id,
  slug: row.slug,
  name: row.name,
  categoryId: row.category_id,
  categorySlug: row.categories?.slug || null,
  image: row.primary_image,
  price: row.price,
  originalPrice: row.original_price,
  discountPercent: row.discount_percent,
  rating: row.rating,
  reviewCount: row.review_count,
  badge: row.badge,
  affiliateUrl: row.affiliate_url,
  description: row.description,
  features: row.features || [],
  specs: row.specs || {},
  brandName: row.brand_name || '',
  modelNumber: row.model_number || '',
  upc: row.upc || '',
  availabilityStatus: row.availability_status || '',
  shippingPrice: row.shipping_price || '',
  shippingTime: row.shipping_time || '',
  shippingCondition: row.shipping_condition || '',
  soldBy: row.sold_by || '',
  shipsFrom: row.ships_from || '',
  isCouponAvailable: row.is_coupon_available ?? false,
  sourceCategoryPath: row.source_category_path || '',
  aplusPresent: row.aplus_present ?? false,
  ratingDistribution: row.rating_distribution || {},
  variants: Array.isArray(row.variants) ? row.variants : [],
  lastScrapedAt: row.last_scraped_at || null,
  sourceMarketplace: row.source_marketplace || '',
});

const throwIfError = (error, message) => {
  if (error) throw new Error(message);
};

export async function fetchProducts({
  page = 1,
  pageSize = PRODUCT_PAGE_SIZE,
  categoryId,
  categorySlug,
  productType,
  badge,
  hasDiscount = false,
  minimumRating,
  minimumPrice,
  maximumPrice,
  search,
  sort = 'popularity',
  signal,
} = {}) {
  const safePage = normalizePage(page);
  const safePageSize = normalizePageSize(pageSize);
  const safeSearch = normalizeSearch(search);
  const safeCategorySlug = normalizeCategorySlug(categorySlug);
  const sortRule = sortColumns[sort] || sortColumns.popularity;
  const from = (safePage - 1) * safePageSize;
  const to = from + safePageSize - 1;

  let query = supabase
    .from('products')
    .select(`${productColumns}, categories!inner(slug)`, { count: 'exact' })
    .or(validAmazonAffiliateUrlFilter)
    .order(sortRule.column, { ascending: sortRule.ascending })
    .order('id', { ascending: true })
    .range(from, to);

  if (categoryId) query = query.eq('category_id', categoryId);
  if (safeCategorySlug) query = query.eq('categories.slug', safeCategorySlug);
  if (productType) query = query.contains('type', [productType]);
  if (badge) query = query.eq('badge', badge);
  if (hasDiscount) query = query.not('discount_percent', 'is', null).gt('discount_percent', 0);
  if (Number.isFinite(minimumRating)) query = query.gte('rating', minimumRating);
  if (Number.isFinite(minimumPrice)) query = query.gte('price', minimumPrice);
  if (Number.isFinite(maximumPrice)) query = query.lte('price', maximumPrice);
  if (safeSearch) query = query.ilike('name', `%${safeSearch}%`);
  if (signal) query = query.abortSignal(signal);

  const { data, error, count } = await query;
  throwIfError(error, 'Unable to load products. Please try again.');

  return {
    products: (data || []).map(toProduct),
    page: safePage,
    pageSize: safePageSize,
    total: count || 0,
  };
}

export async function fetchProductBySlug(slug) {
  const safeSlug = String(slug || '').trim();
  if (!safeSlug) return null;

  const { data: product, error: productError } = await supabase
    .from('products')
    .select(`${productColumns}, categories(slug)`)
    .or(validAmazonAffiliateUrlFilter)
    .eq('slug', safeSlug)
    .maybeSingle();

  throwIfError(productError, 'Unable to load this product. Please try again.');
  if (!product) return null;

  const [imagesResult, reviewsResult] = await Promise.all([
    supabase
      .from('product_images')
      .select('image_url, standard_image_url, alt_text, sort_order')
      .eq('product_id', product.id)
      .order('sort_order', { ascending: true }),
    supabase
      .from('reviews')
      .select('author_name, avatar, rating, text, source, source_review_key, reviewer_url, review_title, reviewed_at, verified_purchase, manufacturer_replied, helpful_count, review_images, variation')
      .eq('product_id', product.id),
  ]);

  throwIfError(imagesResult.error, 'Unable to load product images. Please try again.');
  throwIfError(reviewsResult.error, 'Unable to load product reviews. Please try again.');

  return {
    ...toProduct(product),
    images: (imagesResult.data || []).map((image) => ({
      url: image.image_url,
      standardUrl: image.standard_image_url || image.image_url,
      alt: image.alt_text || product.name,
    })),
    reviews: (reviewsResult.data || []).map((review) => ({
      name: review.author_name,
      avatar: review.avatar,
      rating: review.rating,
      text: review.text,
      source: review.source || '',
      sourceKey: review.source_review_key || '',
      reviewerUrl: review.reviewer_url || '',
      title: review.review_title || '',
      date: review.reviewed_at || '',
      verifiedPurchase: review.verified_purchase ?? false,
      manufacturerReplied: review.manufacturer_replied ?? false,
      helpfulCount: review.helpful_count ?? 0,
      images: Array.isArray(review.review_images) ? review.review_images : [],
      variation: review.variation || {},
    })),
  };
}

export async function fetchProductsBySlugs(slugs) {
  const safeSlugs = [...new Set(
    (Array.isArray(slugs) ? slugs : [])
      .map((slug) => String(slug || '').trim())
      .filter(Boolean),
  )].slice(0, MAX_PAGE_SIZE);

  if (safeSlugs.length === 0) return [];

  const { data, error } = await supabase
    .from('products')
    .select(productColumns)
    .or(validAmazonAffiliateUrlFilter)
    .in('slug', safeSlugs);

  throwIfError(error, 'Unable to load products. Please try again.');
  return (data || []).map(toProduct).filter((product) => isValidAmazonProductUrl(product.affiliateUrl));
}
