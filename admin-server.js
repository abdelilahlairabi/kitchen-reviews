import 'dotenv/config';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { createClient } from '@supabase/supabase-js';

const HOST = '127.0.0.1';
const PORT = Number.parseInt(process.env.ADMIN_PORT || '3001', 10);
const MAX_BODY_BYTES = 2 * 1024 * 1024;
const productColumns = 'id, slug, name, category_id, type, primary_image, price, original_price, discount_percent, rating, review_count, badge, affiliate_url, description, features, specs';

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SECRET_KEY) {
  throw new Error('SUPABASE_URL and SUPABASE_SECRET_KEY must be set in .env before running the local admin panel.');
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const sendJson = (response, status, body) => {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  response.end(JSON.stringify(body));
};

const sendError = (response, status, message) => sendJson(response, status, { error: message });

const parseBody = (request) => new Promise((resolve, reject) => {
  let body = '';
  request.on('data', (chunk) => {
    body += chunk;
    if (Buffer.byteLength(body) > MAX_BODY_BYTES) reject(new Error('Request body is too large.'));
  });
  request.on('end', () => {
    try { resolve(body ? JSON.parse(body) : {}); } catch { reject(new Error('Request body must be valid JSON.')); }
  });
  request.on('error', reject);
});

const text = (value, maxLength, field, { required = false } = {}) => {
  const result = String(value ?? '').trim();
  if (required && !result) throw new Error(`${field} is required.`);
  if (result.length > maxLength) throw new Error(`${field} is too long.`);
  return result || null;
};

const number = (value, field, { minimum = 0, maximum = Number.MAX_SAFE_INTEGER, integer = false } = {}) => {
  if (value === '' || value === null || value === undefined) return null;
  const result = Number(value);
  if (!Number.isFinite(result) || result < minimum || result > maximum || (integer && !Number.isInteger(result))) {
    throw new Error(`${field} is invalid.`);
  }
  return result;
};

const productPayload = (body) => {
  const slug = text(body.slug, 160, 'Slug', { required: true });
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Slug may only contain lowercase letters, numbers, and hyphens.');

  let specs = {};
  if (body.specs) {
    try { specs = typeof body.specs === 'string' ? JSON.parse(body.specs) : body.specs; } catch { throw new Error('Specs must be valid JSON.'); }
    if (!specs || Array.isArray(specs) || typeof specs !== 'object') throw new Error('Specs must be a JSON object.');
  }

  const types = String(body.types || '').split(',').map((item) => item.trim()).filter(Boolean).slice(0, 20);
  const features = String(body.features || '').split('\n').map((item) => item.trim()).filter(Boolean).slice(0, 30);

  return {
    slug,
    name: text(body.name, 240, 'Name', { required: true }),
    category_id: text(body.category_id, 100, 'Category ID'),
    type: types,
    primary_image: text(body.primary_image, 2_000, 'Primary image'),
    price: number(body.price, 'Price'),
    original_price: number(body.original_price, 'Original price'),
    discount_percent: number(body.discount_percent, 'Discount percent', { maximum: 100 }),
    rating: number(body.rating, 'Rating', { maximum: 5 }),
    review_count: number(body.review_count, 'Review count', { integer: true }),
    badge: text(body.badge, 80, 'Badge'),
    affiliate_url: text(body.affiliate_url, 2_000, 'Affiliate URL'),
    description: text(body.description, 5_000, 'Description'),
    features,
    specs,
  };
};

const categoryPayload = (body) => {
  const slug = text(body.slug, 160, 'Slug', { required: true });
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Slug may only contain lowercase letters, numbers, and hyphens.');
  return {
    slug,
    name: text(body.name, 160, 'Name', { required: true }),
    description: text(body.description, 2_000, 'Description'),
    hero_image: text(body.hero_image, 2_000, 'Hero image'),
    sub_filters: String(body.sub_filters || '').split(',').map((item) => item.trim()).filter(Boolean).slice(0, 30),
  };
};

const ids = (values, field) => {
  if (!Array.isArray(values)) return [];
  const uniqueIds = [...new Set(values.map((value) => String(value).trim()).filter(Boolean))];
  if (uniqueIds.some((value) => !/^[0-9a-f-]{36}$/i.test(value))) throw new Error(`${field} is invalid.`);
  return uniqueIds;
};

const collectionPayload = (body) => {
  const slug = text(body.slug, 160, 'Slug', { required: true });
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Slug may only contain lowercase letters, numbers, and hyphens.');
  return {
    slug,
    name: text(body.name, 240, 'Name', { required: true }),
    featured: Boolean(body.featured),
    badge: text(body.badge, 80, 'Badge'),
    image: text(body.image, 2_000, 'Image'),
    subtitle: text(body.subtitle, 500, 'Subtitle'),
    intro_text: text(body.intro_text, 5_000, 'Introduction'),
    curator_name: text(body.curator_name, 160, 'Curator name'),
  };
};

const collectionColumns = 'id, slug, name, featured, badge, image, subtitle, intro_text, curator_name';

const collectionProducts = async (collectionId, productIds) => {
  if (productIds.length > 0) {
    const { count, error: validationError } = await supabase
      .from('products')
      .select('id', { count: 'exact', head: true })
      .in('id', productIds);
    if (validationError) throw validationError;
    if (count !== productIds.length) throw new Error('One or more selected products no longer exist. Refresh and try again.');
  }
  const { error: deleteError } = await supabase.from('collection_products').delete().eq('collection_id', collectionId);
  if (deleteError) throw deleteError;
  if (productIds.length === 0) return;
  const rows = productIds.map((productId, sortOrder) => ({ collection_id: collectionId, product_id: productId, sort_order: sortOrder }));
  const { error: insertError } = await supabase.from('collection_products').insert(rows);
  if (insertError) throw insertError;
};

const collectionsWithProducts = async () => {
  const [{ data: collections, error: collectionsError }, { data: links, error: linksError }] = await Promise.all([
    supabase.from('collections').select(collectionColumns).order('name'),
    supabase.from('collection_products').select('collection_id, product_id, sort_order').order('sort_order'),
  ]);
  if (collectionsError) throw collectionsError;
  if (linksError) throw linksError;
  const productsByCollection = new Map();
  (links || []).forEach((link) => productsByCollection.set(link.collection_id, [...(productsByCollection.get(link.collection_id) || []), link.product_id]));
  return (collections || []).map((collection) => ({ ...collection, product_ids: productsByCollection.get(collection.id) || [] }));
};

const jsonArray = (value, field, maximum = 100) => {
  if (!value) return [];
  let result;
  try { result = typeof value === 'string' ? JSON.parse(value) : value; } catch { throw new Error(`${field} must be valid JSON.`); }
  if (!Array.isArray(result) || result.length > maximum) throw new Error(`${field} must be a JSON array.`);
  return result;
};

const guidePayload = (body) => {
  const slug = text(body.slug, 160, 'Slug', { required: true });
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Slug may only contain lowercase letters, numbers, and hyphens.');
  return {
    slug,
    title: text(body.title, 300, 'Title', { required: true }),
    badge: text(body.badge, 80, 'Badge'),
    read_time: text(body.read_time, 80, 'Read time'),
    description: text(body.description, 5_000, 'Description'),
    image: text(body.image, 2_000, 'Image'),
    author_name: text(body.author_name, 160, 'Author name'),
    author_role: text(body.author_role, 160, 'Author role'),
    author_avatar: text(body.author_avatar, 2_000, 'Author avatar'),
    quick_tip: text(body.quick_tip, 2_000, 'Quick tip'),
    comparison_types: jsonArray(body.comparison_types, 'Comparison types'),
    comparison_finishes: jsonArray(body.comparison_finishes, 'Comparison finishes'),
  };
};

const guideFaqs = (value) => jsonArray(value, 'FAQs', 50).map((faq, sortOrder) => ({
  question: text(faq?.question, 500, 'FAQ question', { required: true }),
  answer: text(faq?.answer, 10_000, 'FAQ answer', { required: true }),
  sort_order: sortOrder,
}));

const guideColumns = 'id, slug, title, badge, read_time, description, image, author_name, author_role, author_avatar, quick_tip, comparison_types, comparison_finishes';

const guideProducts = async (guideId, productIds) => {
  if (productIds.length > 0) {
    const { count, error: validationError } = await supabase.from('products').select('id', { count: 'exact', head: true }).in('id', productIds);
    if (validationError) throw validationError;
    if (count !== productIds.length) throw new Error('One or more selected products no longer exist. Refresh and try again.');
  }
  const { error: deleteError } = await supabase.from('guide_products').delete().eq('guide_id', guideId);
  if (deleteError) throw deleteError;
  if (productIds.length === 0) return;
  const { error } = await supabase.from('guide_products').insert(productIds.map((productId, sortOrder) => ({ guide_id: guideId, product_id: productId, sort_order: sortOrder })));
  if (error) throw error;
};

const saveGuideFaqs = async (guideId, faqs) => {
  const { error: deleteError } = await supabase.from('guide_faqs').delete().eq('guide_id', guideId);
  if (deleteError) throw deleteError;
  if (faqs.length === 0) return;
  const { error } = await supabase.from('guide_faqs').insert(faqs.map((faq) => ({ ...faq, guide_id: guideId })));
  if (error) throw error;
};

const guidesWithDetails = async () => {
  const [{ data: guides, error: guidesError }, { data: faqs, error: faqsError }, { data: links, error: linksError }] = await Promise.all([
    supabase.from('guides').select(guideColumns).order('title'),
    supabase.from('guide_faqs').select('guide_id, question, answer, sort_order').order('sort_order'),
    supabase.from('guide_products').select('guide_id, product_id, sort_order').order('sort_order'),
  ]);
  if (guidesError) throw guidesError;
  if (faqsError) throw faqsError;
  if (linksError) throw linksError;
  const faqsByGuide = new Map();
  const productsByGuide = new Map();
  (faqs || []).forEach((faq) => faqsByGuide.set(faq.guide_id, [...(faqsByGuide.get(faq.guide_id) || []), faq]));
  (links || []).forEach((link) => productsByGuide.set(link.guide_id, [...(productsByGuide.get(link.guide_id) || []), link.product_id]));
  return (guides || []).map((guide) => ({ ...guide, faqs: faqsByGuide.get(guide.id) || [], product_ids: productsByGuide.get(guide.id) || [] }));
};

const stylePayload = (body) => {
  const slug = text(body.slug, 160, 'Slug', { required: true });
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Slug may only contain lowercase letters, numbers, and hyphens.');
  return {
    slug,
    title: text(body.title, 240, 'Title', { required: true }),
    subtitle: text(body.subtitle, 500, 'Subtitle'),
    hero_image: text(body.hero_image, 2_000, 'Hero image'),
    description: text(body.description, 5_000, 'Description'),
    tags: String(body.tags || '').split(',').map((item) => item.trim()).filter(Boolean).slice(0, 30),
  };
};

const productDetailPayload = (body) => {
  const images = jsonArray(body.images, 'Images', 30).map((image) => text(image, 2_000, 'Image URL', { required: true }));
  const reviews = jsonArray(body.reviews, 'Reviews', 50).map((review) => ({
    author_name: text(review?.author_name, 160, 'Review author', { required: true }),
    avatar: text(review?.avatar, 2_000, 'Review avatar'),
    rating: number(review?.rating, 'Review rating', { minimum: 1, maximum: 5 }),
    text: text(review?.text, 10_000, 'Review text', { required: true }),
  }));
  if (reviews.some((review) => review.rating === null)) throw new Error('Review rating is required.');
  return { images: [...new Set(images)], reviews };
};

const parseCsv = (raw) => {
  if (typeof raw !== 'string' || !raw.trim()) throw new Error('CSV file is empty.');
  if (raw.length > 1_500_000) throw new Error('CSV file is too large. Split it into smaller files.');
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let index = 0; index < raw.length; index += 1) {
    const character = raw[index];
    if (quoted) {
      if (character === '"' && raw[index + 1] === '"') { field += '"'; index += 1; }
      else if (character === '"') quoted = false;
      else field += character;
    } else if (character === '"') quoted = true;
    else if (character === ',') { row.push(field); field = ''; }
    else if (character === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (character !== '\r') field += character;
  }
  if (quoted) throw new Error('CSV contains an unclosed quoted value.');
  if (field || row.length) { row.push(field); rows.push(row); }
  const [headerRow, ...dataRows] = rows.filter((item) => item.some((cell) => cell.trim()));
  if (!headerRow) throw new Error('CSV needs a header row.');
  const headers = headerRow.map((header) => header.trim().toLowerCase());
  if (new Set(headers).size !== headers.length) throw new Error('CSV contains duplicate column headers.');
  if (!headers.includes('slug') || !headers.includes('name')) throw new Error('CSV must contain slug and name columns.');
  if (dataRows.length > 1_000) throw new Error('CSV has too many rows. Split it into smaller files.');
  return dataRows.map((cells, index) => ({
    ...Object.fromEntries(headers.map((header, column) => [header, cells[column] || ''])),
    __row: index + 2,
  }));
};

const googleSheetCsv = async (sheetUrl) => {
  let source;
  try { source = new URL(String(sheetUrl || '').trim()); } catch { throw new Error('Google Sheet URL is invalid.'); }
  if (source.protocol !== 'https:' || source.hostname !== 'docs.google.com') throw new Error('Only a public docs.google.com Google Sheet URL is allowed.');
  const match = source.pathname.match(/^\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (!match) throw new Error('Google Sheet URL is invalid.');
  const gid = source.searchParams.get('gid') || new URLSearchParams(source.hash.replace(/^#/, '')).get('gid') || '0';
  const exportUrl = `https://docs.google.com/spreadsheets/d/${match[1]}/export?format=csv&gid=${encodeURIComponent(gid)}`;
  const response = await fetch(exportUrl, { redirect: 'error', signal: AbortSignal.timeout(15_000) });
  if (!response.ok) throw new Error('Unable to download this Google Sheet. Make sure it is public or exported as CSV.');
  const csv = await response.text();
  if (!csv.trim()) throw new Error('Google Sheet contains no CSV data.');
  return csv;
};

const productImportRows = async (csv) => {
  const sourceRows = parseCsv(csv);
  const { data: categories, error: categoriesError } = await supabase.from('categories').select('id, slug');
  if (categoriesError) throw categoriesError;
  const categoriesBySlug = new Map((categories || []).map((category) => [category.slug, category.id]));
  const rows = [];
  const errors = [];
  sourceRows.forEach((source) => {
    try {
      const categorySlug = text(source.category_slug, 160, 'Category slug');
      if (categorySlug && !categoriesBySlug.has(categorySlug)) throw new Error(`Unknown category slug: ${categorySlug}.`);
      let specs = {};
      if (source.specs) {
        try { specs = JSON.parse(source.specs); } catch { throw new Error('Specs must be valid JSON.'); }
        if (!specs || Array.isArray(specs) || typeof specs !== 'object') throw new Error('Specs must be a JSON object.');
      }
      const payload = productPayload({
        ...source,
        category_id: categorySlug ? categoriesBySlug.get(categorySlug) : '',
        types: source.types || source.type,
        features: String(source.features || '').split(';').map((item) => item.trim()).filter(Boolean).join('\n'),
        specs,
      });
      rows.push(payload);
    } catch (error) {
      errors.push({ row: source.__row, message: error.message });
    }
  });
  return { rows, errors };
};

const importProducts = async (csv) => {
  const { rows, errors } = await productImportRows(csv);
  if (errors.length > 0) throw new Error('Fix the CSV errors shown in the preview before importing.');
  for (let index = 0; index < rows.length; index += 100) {
    const { error } = await supabase.from('products').upsert(rows.slice(index, index + 100), { onConflict: 'slug' });
    if (error) throw error;
  }
  return rows.length;
};

const saveProductImages = async (productId, images, productName) => {
  const { error: deleteError } = await supabase.from('product_images').delete().eq('product_id', productId);
  if (deleteError) throw deleteError;
  if (images.length === 0) return;
  const { error } = await supabase.from('product_images').insert(images.map((imageUrl, sortOrder) => ({ product_id: productId, image_url: imageUrl, alt_text: productName, sort_order: sortOrder })));
  if (error) throw error;
};

const saveProductReviews = async (productId, reviews) => {
  const { error: deleteError } = await supabase.from('reviews').delete().eq('product_id', productId);
  if (deleteError) throw deleteError;
  if (reviews.length === 0) return;
  const { error } = await supabase.from('reviews').insert(reviews.map((review) => ({ ...review, product_id: productId })));
  if (error) throw error;
};

const galleryImages = (value) => {
  if (!Array.isArray(value) || value.length > 40) throw new Error('Gallery is invalid.');
  return [...new Set(value.map((image) => text(image, 2_000, 'Gallery image', { required: true })))];
};

const styleColumns = 'id, slug, title, subtitle, hero_image, description, tags';

const styleProducts = async (styleId, productIds) => {
  if (productIds.length > 0) {
    const { count, error: validationError } = await supabase.from('products').select('id', { count: 'exact', head: true }).in('id', productIds);
    if (validationError) throw validationError;
    if (count !== productIds.length) throw new Error('One or more selected products no longer exist. Refresh and try again.');
  }
  const { error: deleteError } = await supabase.from('inspiration_style_products').delete().eq('style_id', styleId);
  if (deleteError) throw deleteError;
  if (productIds.length === 0) return;
  const { error } = await supabase.from('inspiration_style_products').insert(productIds.map((productId, sortOrder) => ({ style_id: styleId, product_id: productId, sort_order: sortOrder })));
  if (error) throw error;
};

const saveGalleryImages = async (styleId, images) => {
  const { error: deleteError } = await supabase.from('inspiration_gallery_images').delete().eq('style_id', styleId);
  if (deleteError) throw deleteError;
  if (images.length === 0) return;
  const { error } = await supabase.from('inspiration_gallery_images').insert(images.map((image, sortOrder) => ({ style_id: styleId, image, sort_order })));
  if (error) throw error;
};

const stylesWithDetails = async () => {
  const [{ data: styles, error: stylesError }, { data: gallery, error: galleryError }, { data: links, error: linksError }] = await Promise.all([
    supabase.from('inspiration_styles').select(styleColumns).order('title'),
    supabase.from('inspiration_gallery_images').select('style_id, image, sort_order').order('sort_order'),
    supabase.from('inspiration_style_products').select('style_id, product_id, sort_order').order('sort_order'),
  ]);
  if (stylesError) throw stylesError;
  if (galleryError) throw galleryError;
  if (linksError) throw linksError;
  const galleryByStyle = new Map();
  const productsByStyle = new Map();
  (gallery || []).forEach((item) => galleryByStyle.set(item.style_id, [...(galleryByStyle.get(item.style_id) || []), item.image]));
  (links || []).forEach((link) => productsByStyle.set(link.style_id, [...(productsByStyle.get(link.style_id) || []), link.product_id]));
  return (styles || []).map((style) => ({ ...style, gallery: galleryByStyle.get(style.id) || [], product_ids: productsByStyle.get(style.id) || [] }));
};

const handleApi = async (request, response, pathname) => {
  if (request.method === 'GET' && pathname === '/api/categories') {
    const { data, error } = await supabase.from('categories').select('id, name, slug, description, hero_image, sub_filters').order('name');
    if (error) throw error;
    return sendJson(response, 200, { categories: data || [] });
  }

  if (request.method === 'POST' && pathname === '/api/import/products/source') {
    const body = await parseBody(request);
    const csv = body.google_sheet_url ? await googleSheetCsv(body.google_sheet_url) : String(body.csv || '');
    parseCsv(csv);
    return sendJson(response, 200, { csv });
  }

  if (request.method === 'POST' && pathname === '/api/import/products/preview') {
    const { rows, errors } = await productImportRows(String((await parseBody(request)).csv || ''));
    return sendJson(response, 200, {
      valid_count: rows.length,
      error_count: errors.length,
      errors: errors.slice(0, 30),
      sample: rows.slice(0, 10).map((row) => ({ slug: row.slug, name: row.name, price: row.price })),
    });
  }

  if (request.method === 'POST' && pathname === '/api/import/products') {
    const imported = await importProducts(String((await parseBody(request)).csv || ''));
    return sendJson(response, 200, { imported });
  }

  if (request.method === 'POST' && pathname === '/api/categories') {
    const payload = categoryPayload(await parseBody(request));
    const { data, error } = await supabase.from('categories').insert(payload).select('id, name, slug, description, hero_image, sub_filters').single();
    if (error) throw error;
    return sendJson(response, 201, { category: data });
  }

  if (request.method === 'GET' && pathname === '/api/products') {
    const { data, error } = await supabase.from('products').select(productColumns).order('name');
    if (error) throw error;
    return sendJson(response, 200, { products: data || [] });
  }

  if (request.method === 'GET' && pathname === '/api/collections') {
    return sendJson(response, 200, { collections: await collectionsWithProducts() });
  }

  if (request.method === 'GET' && pathname === '/api/guides') {
    return sendJson(response, 200, { guides: await guidesWithDetails() });
  }

  if (request.method === 'GET' && pathname === '/api/styles') {
    return sendJson(response, 200, { styles: await stylesWithDetails() });
  }

  if (request.method === 'POST' && pathname === '/api/styles') {
    const body = await parseBody(request);
    const payload = stylePayload(body);
    const gallery = galleryImages(body.gallery || []);
    const productIds = ids(body.product_ids, 'Product list');
    const { data, error } = await supabase.from('inspiration_styles').insert(payload).select(styleColumns).single();
    if (error) throw error;
    try { await saveGalleryImages(data.id, gallery); await styleProducts(data.id, productIds); } catch (saveError) {
      await supabase.from('inspiration_gallery_images').delete().eq('style_id', data.id);
      await supabase.from('inspiration_style_products').delete().eq('style_id', data.id);
      await supabase.from('inspiration_styles').delete().eq('id', data.id);
      throw saveError;
    }
    return sendJson(response, 201, { style: { ...data, gallery, product_ids: productIds } });
  }

  if (request.method === 'POST' && pathname === '/api/guides') {
    const body = await parseBody(request);
    const payload = guidePayload(body);
    const faqs = guideFaqs(body.faqs);
    const productIds = ids(body.product_ids, 'Product list');
    const { data, error } = await supabase.from('guides').insert(payload).select(guideColumns).single();
    if (error) throw error;
    try { await saveGuideFaqs(data.id, faqs); await guideProducts(data.id, productIds); } catch (saveError) {
      await supabase.from('guide_faqs').delete().eq('guide_id', data.id);
      await supabase.from('guide_products').delete().eq('guide_id', data.id);
      await supabase.from('guides').delete().eq('id', data.id);
      throw saveError;
    }
    return sendJson(response, 201, { guide: { ...data, faqs, product_ids: productIds } });
  }

  if (request.method === 'POST' && pathname === '/api/collections') {
    const body = await parseBody(request);
    const payload = collectionPayload(body);
    const productIds = ids(body.product_ids, 'Product list');
    const { data, error } = await supabase.from('collections').insert(payload).select(collectionColumns).single();
    if (error) throw error;
    try { await collectionProducts(data.id, productIds); } catch (linkError) {
      await supabase.from('collections').delete().eq('id', data.id);
      throw linkError;
    }
    return sendJson(response, 201, { collection: { ...data, product_ids: productIds } });
  }

  if (request.method === 'POST' && pathname === '/api/products') {
    const payload = productPayload(await parseBody(request));
    const { data, error } = await supabase.from('products').insert(payload).select(productColumns).single();
    if (error) throw error;
    return sendJson(response, 201, { product: data });
  }

  const productDetailsMatch = pathname.match(/^\/api\/products\/([0-9a-f-]{36})\/details$/i);
  if (productDetailsMatch && request.method === 'GET') {
    const [{ data: product, error: productError }, { data: images, error: imagesError }, { data: reviews, error: reviewsError }] = await Promise.all([
      supabase.from('products').select('id, name').eq('id', productDetailsMatch[1]).maybeSingle(),
      supabase.from('product_images').select('image_url, sort_order').eq('product_id', productDetailsMatch[1]).order('sort_order'),
      supabase.from('reviews').select('author_name, avatar, rating, text').eq('product_id', productDetailsMatch[1]).order('id'),
    ]);
    if (productError) throw productError;
    if (imagesError) throw imagesError;
    if (reviewsError) throw reviewsError;
    if (!product) return sendError(response, 404, 'Product not found.');
    return sendJson(response, 200, {
      product,
      images: (images || []).map((image) => image.image_url),
      reviews: (reviews || []).map((review) => ({ author_name: review.author_name, avatar: review.avatar, rating: review.rating, text: review.text })),
    });
  }

  if (productDetailsMatch && request.method === 'PATCH') {
    const body = await parseBody(request);
    const { images, reviews } = productDetailPayload(body);
    const { data: product, error: productError } = await supabase.from('products').select('id, name').eq('id', productDetailsMatch[1]).maybeSingle();
    if (productError) throw productError;
    if (!product) return sendError(response, 404, 'Product not found.');
    await saveProductImages(product.id, images, product.name);
    await saveProductReviews(product.id, reviews);
    return sendJson(response, 200, { product, images, reviews });
  }

  const idMatch = pathname.match(/^\/api\/products\/([0-9a-f-]{36})$/i);
  if (idMatch && request.method === 'PATCH') {
    const payload = productPayload(await parseBody(request));
    const { data, error } = await supabase.from('products').update(payload).eq('id', idMatch[1]).select(productColumns).single();
    if (error) throw error;
    return sendJson(response, 200, { product: data });
  }

  if (idMatch && request.method === 'DELETE') {
    const childTables = [
      ['product_images', 'product_id'], ['reviews', 'product_id'], ['collection_products', 'product_id'],
      ['guide_products', 'product_id'], ['inspiration_style_products', 'product_id'],
    ];
    for (const [table, column] of childTables) {
      const { error: childError } = await supabase.from(table).delete().eq(column, idMatch[1]);
      if (childError) throw childError;
    }
    const { error } = await supabase.from('products').delete().eq('id', idMatch[1]);
    if (error) throw error;
    return sendJson(response, 204, {});
  }

  const categoryIdMatch = pathname.match(/^\/api\/categories\/([0-9a-f-]{36})$/i);
  if (categoryIdMatch && request.method === 'PATCH') {
    const payload = categoryPayload(await parseBody(request));
    const { data, error } = await supabase.from('categories').update(payload).eq('id', categoryIdMatch[1]).select('id, name, slug, description, hero_image, sub_filters').single();
    if (error) throw error;
    return sendJson(response, 200, { category: data });
  }

  if (categoryIdMatch && request.method === 'DELETE') {
    const { error } = await supabase.from('categories').delete().eq('id', categoryIdMatch[1]);
    if (error) throw error;
    return sendJson(response, 204, {});
  }

  const collectionIdMatch = pathname.match(/^\/api\/collections\/([0-9a-f-]{36})$/i);
  if (collectionIdMatch && request.method === 'PATCH') {
    const body = await parseBody(request);
    const payload = collectionPayload(body);
    const productIds = ids(body.product_ids, 'Product list');
    const { data, error } = await supabase.from('collections').update(payload).eq('id', collectionIdMatch[1]).select(collectionColumns).single();
    if (error) throw error;
    await collectionProducts(data.id, productIds);
    return sendJson(response, 200, { collection: { ...data, product_ids: productIds } });
  }

  if (collectionIdMatch && request.method === 'DELETE') {
    const { error: linksError } = await supabase.from('collection_products').delete().eq('collection_id', collectionIdMatch[1]);
    if (linksError) throw linksError;
    const { error } = await supabase.from('collections').delete().eq('id', collectionIdMatch[1]);
    if (error) throw error;
    return sendJson(response, 204, {});
  }

  const guideIdMatch = pathname.match(/^\/api\/guides\/([0-9a-f-]{36})$/i);
  if (guideIdMatch && request.method === 'PATCH') {
    const body = await parseBody(request);
    const payload = guidePayload(body);
    const faqs = guideFaqs(body.faqs);
    const productIds = ids(body.product_ids, 'Product list');
    const { data, error } = await supabase.from('guides').update(payload).eq('id', guideIdMatch[1]).select(guideColumns).single();
    if (error) throw error;
    await saveGuideFaqs(data.id, faqs);
    await guideProducts(data.id, productIds);
    return sendJson(response, 200, { guide: { ...data, faqs, product_ids: productIds } });
  }

  if (guideIdMatch && request.method === 'DELETE') {
    const { error: faqsError } = await supabase.from('guide_faqs').delete().eq('guide_id', guideIdMatch[1]);
    if (faqsError) throw faqsError;
    const { error: linksError } = await supabase.from('guide_products').delete().eq('guide_id', guideIdMatch[1]);
    if (linksError) throw linksError;
    const { error } = await supabase.from('guides').delete().eq('id', guideIdMatch[1]);
    if (error) throw error;
    return sendJson(response, 204, {});
  }

  const styleIdMatch = pathname.match(/^\/api\/styles\/([0-9a-f-]{36})$/i);
  if (styleIdMatch && request.method === 'PATCH') {
    const body = await parseBody(request);
    const payload = stylePayload(body);
    const gallery = galleryImages(body.gallery || []);
    const productIds = ids(body.product_ids, 'Product list');
    const { data, error } = await supabase.from('inspiration_styles').update(payload).eq('id', styleIdMatch[1]).select(styleColumns).single();
    if (error) throw error;
    await saveGalleryImages(data.id, gallery);
    await styleProducts(data.id, productIds);
    return sendJson(response, 200, { style: { ...data, gallery, product_ids: productIds } });
  }

  if (styleIdMatch && request.method === 'DELETE') {
    const { error: galleryError } = await supabase.from('inspiration_gallery_images').delete().eq('style_id', styleIdMatch[1]);
    if (galleryError) throw galleryError;
    const { error: linksError } = await supabase.from('inspiration_style_products').delete().eq('style_id', styleIdMatch[1]);
    if (linksError) throw linksError;
    const { error } = await supabase.from('inspiration_styles').delete().eq('id', styleIdMatch[1]);
    if (error) throw error;
    return sendJson(response, 204, {});
  }

  return sendError(response, 404, 'Not found.');
};

const sendStatic = async (response, fileName, contentType) => {
  const content = await readFile(new URL(`./admin/${fileName}`, import.meta.url));
  response.writeHead(200, {
    'Content-Type': contentType,
    'Cache-Control': 'no-store',
    'Content-Security-Policy': "default-src 'self'; style-src 'self' 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'",
    'X-Content-Type-Options': 'nosniff',
  });
  response.end(content);
};

const server = createServer(async (request, response) => {
  const pathname = new URL(request.url, `http://${HOST}`).pathname;
  try {
    if (pathname.startsWith('/api/')) return await handleApi(request, response, pathname);
    if (request.method === 'GET' && pathname === '/') return await sendStatic(response, 'index.html', 'text/html; charset=utf-8');
    if (request.method === 'GET' && pathname === '/admin.js') return await sendStatic(response, 'admin.js', 'text/javascript; charset=utf-8');
    return sendError(response, 404, 'Not found.');
  } catch (error) {
    const message = error?.message || 'Unexpected server error.';
    const status = /required|invalid|too long|JSON|lowercase|no longer exist/.test(message) ? 400 : 500;
    console.error(`[admin] ${message}`);
    return sendError(response, status, status === 500 ? 'Unable to complete this operation.' : message);
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Local admin panel: http://${HOST}:${PORT}`);
});
