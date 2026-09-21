import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { categories } from '../src/data/categories.js';
import { products } from '../src/data/products.js';
import { collections } from '../src/data/collections.js';
import { guidesData } from '../src/data/guides.js';
import { stylesData } from '../src/data/inspirationStyles.js';


const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);
async function migrateCategories() {
  console.log('📦 Categories...');
  const { data, error } = await supabase
    .from('categories')
    .upsert(categories.map((c) => ({
      slug: c.slug,
      name: c.name,
      description: c.description,
      hero_image: c.heroImage,
      sub_filters: c.subFilters || [],
    })), { onConflict: 'slug' })
    .select();
  if (error) throw new Error(`Categories: ${error.message}`);
  console.log(`✅ ${data.length} categories.`);
  return data;
}

async function migrateProducts(categoryMap) {
  console.log('📦 Products...');
  const { data, error } = await supabase
    .from('products')
    .upsert(products.map((p) => ({
      category_id: categoryMap[p.category] || null,
      slug: p.slug,
      name: p.name,
      type: p.types || [],
      primary_image: p.image,
      price: p.price,
      original_price: p.originalPrice,
      discount_percent: p.discountPercent,
      rating: p.rating,
      review_count: p.reviewCount,
      badge: p.badge,
      affiliate_url: p.affiliateUrl,
      description: p.description,
      features: p.features || [],
      specs: p.specs || {},
    })), { onConflict: 'slug' })
    .select();
  if (error) throw new Error(`Products: ${error.message}`);
  console.log(`✅ ${data.length} products.`);
  return data;
}

async function migrateProductImages(productMap) {
  const rows = [];
  products.forEach((p) => {
    const productId = productMap[p.slug];
    if (!productId) return;
    (p.images || []).forEach((img, i) => {
      rows.push({ product_id: productId, image_url: img, alt_text: p.name, sort_order: i });
    });
  });
  if (rows.length === 0) return;
  const { error } = await supabase
    .from('product_images')
    .upsert(rows, { onConflict: 'product_id,sort_order' });
  if (error) throw new Error(`Product images: ${error.message}`);
  console.log(`✅ ${rows.length} product images.`);
}

async function migrateReviews(productMap) {
  const rows = [];
  products.forEach((p) => {
    const productId = productMap[p.slug];
    if (!productId) return;
    (p.reviews || []).forEach((r) => {
      rows.push({ product_id: productId, author_name: r.name, avatar: r.avatar, rating: r.rating, text: r.text });
    });
  });
  if (rows.length === 0) return;
  const { error } = await supabase
    .from('reviews')
    .upsert(rows, { onConflict: 'product_id,author_name' });
  if (error) throw new Error(`Reviews: ${error.message}`);
  console.log(`✅ ${rows.length} reviews.`);
}

async function migrateCollections(productMap) {
  console.log('📦 Collections...');
  const { data, error } = await supabase
    .from('collections')
    .upsert(collections.map((c) => ({
      slug: c.slug,
      name: c.name,
      featured: c.featured,
      badge: c.badge,
      image: c.image,
      subtitle: c.subtitle,
      intro_text: c.introText,
      curator_name: c.curator?.name || null,
    })), { onConflict: 'slug' })
    .select();
  if (error) throw new Error(`Collections: ${error.message}`);
  console.log(`✅ ${data.length} collections.`);

  const collectionMap = {};
  data.forEach((c) => (collectionMap[c.slug] = c.id));

  const junctionRows = [];
  collections.forEach((c) => {
    const collectionId = collectionMap[c.slug];
    (c.productSlugs || []).forEach((slug, i) => {
      const productId = productMap[slug];
      if (productId) junctionRows.push({ collection_id: collectionId, product_id: productId, sort_order: i });
    });
  });

  if (junctionRows.length > 0) {
    const { error: jError } = await supabase
      .from('collection_products')
      .upsert(junctionRows, { onConflict: 'collection_id,product_id' });
    if (jError) throw new Error(`Collection products: ${jError.message}`);
    console.log(`✅ ${junctionRows.length} collection-product links.`);
  }
}

async function migrateGuides(productMap) {
  console.log('📦 Guides...');
  const { data, error } = await supabase
    .from('guides')
    .upsert(guidesData.map((g) => ({
      slug: g.slug,
      title: g.title,
      badge: g.badge,
      read_time: g.time,
      description: g.desc,
      image: g.image,
      author_name: g.author?.name || null,
      author_role: g.author?.role || null,
      author_avatar: g.author?.avatar || null,
      quick_tip: g.quickTip || null,
      comparison_types: g.types || [],
      comparison_finishes: g.finishes || [],
    })), { onConflict: 'slug' })
    .select();
  if (error) throw new Error(`Guides: ${error.message}`);
  console.log(`✅ ${data.length} guides.`);

  const guideMap = {};
  data.forEach((g) => (guideMap[g.slug] = g.id));

  const faqRows = [];
  guidesData.forEach((g) => {
    const guideId = guideMap[g.slug];
    (g.faqs || []).forEach((faq, i) => {
      faqRows.push({ guide_id: guideId, question: faq.q, answer: faq.a, sort_order: i });
    });
  });
  if (faqRows.length > 0) {
    const { error: fError } = await supabase
      .from('guide_faqs')
      .upsert(faqRows, { onConflict: 'guide_id,sort_order' });
    if (fError) throw new Error(`Guide FAQs: ${fError.message}`);
    console.log(`✅ ${faqRows.length} guide FAQs.`);
  }

  const junctionRows = [];
  guidesData.forEach((g) => {
    const guideId = guideMap[g.slug];
    (g.recommendedProductSlugs || []).forEach((slug, i) => {
      const productId = productMap[slug];
      if (productId) junctionRows.push({ guide_id: guideId, product_id: productId, sort_order: i });
    });
  });
  if (junctionRows.length > 0) {
    const { error: jError } = await supabase
      .from('guide_products')
      .upsert(junctionRows, { onConflict: 'guide_id,product_id' });
    if (jError) throw new Error(`Guide products: ${jError.message}`);
    console.log(`✅ ${junctionRows.length} guide-product links.`);
  }
}

async function migrateInspiration(productMap) {
  console.log('📦 Inspiration styles...');
  const allStyles = Object.values(stylesData);

  const { data, error } = await supabase
    .from('inspiration_styles')
    .upsert(allStyles.map((s) => ({
      slug: s.slug,
      title: s.title,
      subtitle: s.subtitle,
      hero_image: s.heroImage,
      description: s.description,
      tags: s.tags || [],
    })), { onConflict: 'slug' })
    .select();
  if (error) throw new Error(`Inspiration styles: ${error.message}`);
  console.log(`✅ ${data.length} inspiration styles.`);

  const styleMap = {};
  data.forEach((s) => (styleMap[s.slug] = s.id));

  const galleryRows = [];
  allStyles.forEach((s) => {
    const styleId = styleMap[s.slug];
    (s.gallery || []).forEach((img, i) => {
      galleryRows.push({ style_id: styleId, image: img, sort_order: i });
    });
  });
  if (galleryRows.length > 0) {
    const { error: gError } = await supabase
      .from('inspiration_gallery_images')
      .upsert(galleryRows, { onConflict: 'style_id,sort_order' });
    if (gError) throw new Error(`Gallery images: ${gError.message}`);
    console.log(`✅ ${galleryRows.length} gallery images.`);
  }

  // ⚠️ منتجات inspiration مازالين مزيفين فـ inspirationStyles.js (products: [{...fake}])
  // خاصك تبدلهم لـ productSlugs قبل ما تفعل هاد الجزء
  const junctionRows = [];
  allStyles.forEach((s) => {
    const styleId = styleMap[s.slug];
    (s.productSlugs || []).forEach((slug, i) => {
      const productId = productMap[slug];
      if (productId) junctionRows.push({ style_id: styleId, product_id: productId, sort_order: i });
    });
  });
  if (junctionRows.length > 0) {
    const { error: jError } = await supabase
      .from('inspiration_style_products')
      .upsert(junctionRows, { onConflict: 'style_id,product_id' });
    if (jError) throw new Error(`Style products: ${jError.message}`);
    console.log(`✅ ${junctionRows.length} style-product links.`);
  }
}

async function run() {
  try {
    const cats = await migrateCategories();
    const categoryMap = {};
    cats.forEach((c) => (categoryMap[c.slug] = c.id));

    const prods = await migrateProducts(categoryMap);
    const productMap = {};
    prods.forEach((p) => (productMap[p.slug] = p.id));

    await migrateProductImages(productMap);
    await migrateReviews(productMap);
    await migrateCollections(productMap);
    await migrateGuides(productMap);
    await migrateInspiration(productMap);

    console.log('\n🎉 Migration complete!');
  } catch (err) {
    console.error('\n❌ Migration failed:', err.message);
    process.exit(1);
  }
}

run();
