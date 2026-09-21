import { supabase } from '../utils/supabase';

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
  description, features, specs
`;

const normalizePage = (value) => Math.max(1, Number.parseInt(value, 10) || 1);
const normalizePageSize = (value) => Math.min(MAX_PAGE_SIZE, Math.max(1, Number.parseInt(value, 10) || PRODUCT_PAGE_SIZE));
const normalizeSearch = (value) => String(value || '').trim().slice(0, 80);

export const toProduct = (row) => ({
  id: row.id,
  slug: row.slug,
  name: row.name,
  categoryId: row.category_id,
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
});

const throwIfError = (error, message) => {
  if (error) throw new Error(message);
};

export async function fetchProducts({
  page = 1,
  pageSize = PRODUCT_PAGE_SIZE,
  categoryId,
  productType,
  badge,
  hasDiscount = false,
  minimumRating,
  minimumPrice,
  maximumPrice,
  search,
  sort = 'popularity',
} = {}) {
  const safePage = normalizePage(page);
  const safePageSize = normalizePageSize(pageSize);
  const safeSearch = normalizeSearch(search);
  const sortRule = sortColumns[sort] || sortColumns.popularity;
  const from = (safePage - 1) * safePageSize;
  const to = from + safePageSize - 1;

  let query = supabase
    .from('products')
    .select(productColumns, { count: 'exact' })
    .order(sortRule.column, { ascending: sortRule.ascending })
    .order('id', { ascending: true })
    .range(from, to);

  if (categoryId) query = query.eq('category_id', categoryId);
  if (productType) query = query.contains('type', [productType]);
  if (badge) query = query.eq('badge', badge);
  if (hasDiscount) query = query.not('discount_percent', 'is', null).gt('discount_percent', 0);
  if (Number.isFinite(minimumRating)) query = query.gte('rating', minimumRating);
  if (Number.isFinite(minimumPrice)) query = query.gte('price', minimumPrice);
  if (Number.isFinite(maximumPrice)) query = query.lte('price', maximumPrice);
  if (safeSearch) query = query.ilike('name', `%${safeSearch}%`);

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
  const safeSlug = String(slug || '').trim().slice(0, 160);
  if (!safeSlug) return null;

  const { data: product, error: productError } = await supabase
    .from('products')
    .select(productColumns)
    .eq('slug', safeSlug)
    .maybeSingle();

  throwIfError(productError, 'Unable to load this product. Please try again.');
  if (!product) return null;

  const [imagesResult, reviewsResult] = await Promise.all([
    supabase
      .from('product_images')
      .select('image_url, alt_text, sort_order')
      .eq('product_id', product.id)
      .order('sort_order', { ascending: true }),
    supabase
      .from('reviews')
      .select('author_name, avatar, rating, text')
      .eq('product_id', product.id),
  ]);

  throwIfError(imagesResult.error, 'Unable to load product images. Please try again.');
  throwIfError(reviewsResult.error, 'Unable to load product reviews. Please try again.');

  return {
    ...toProduct(product),
    images: (imagesResult.data || []).map((image) => ({
      url: image.image_url,
      alt: image.alt_text || product.name,
    })),
    reviews: (reviewsResult.data || []).map((review) => ({
      name: review.author_name,
      avatar: review.avatar,
      rating: review.rating,
      text: review.text,
    })),
  };
}
