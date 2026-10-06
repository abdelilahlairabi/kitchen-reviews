import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { categories } from '../src/data/categories.js';
import { collections } from '../src/data/collections.js';
import { guidesData } from '../src/data/guides.js';
import { stylesData } from '../src/data/inspirationStyles.js';

const siteUrl = (process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://kitchen-reviews-seven.vercel.app')
  .trim()
  .replace(/\/$/, '');
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to generate product sitemap URLs.');
}

const supabase = createClient(supabaseUrl, supabaseKey);
const productSlugs = [];
const pageSize = 500;

for (let offset = 0; ; offset += pageSize) {
  const { data, error } = await supabase
    .from('products')
    .select('slug')
    .order('id', { ascending: true })
    .range(offset, offset + pageSize - 1);

  if (error) throw new Error(`Could not load product slugs for sitemap: ${error.message}`);
  productSlugs.push(...(data || []).map(({ slug }) => slug).filter(Boolean));
  if (!data || data.length < pageSize) break;
}

const staticPaths = [
  '/',
  '/products',
  '/categories',
  '/collections',
  '/guides',
  '/inspiration',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/affiliate-disclosure',
  ...categories.map(({ slug }) => `/category/${slug}`),
  ...collections.map(({ slug }) => `/collections/${slug}`),
  ...guidesData.map(({ slug }) => `/guides/${slug}`),
  ...Object.keys(stylesData).map((slug) => `/inspiration/${slug}`),
  ...productSlugs.map((slug) => `/product/${encodeURIComponent(slug)}`),
];

const urls = [...new Set(staticPaths)].map((path) => {
  const loc = `${siteUrl}${path}`;
  return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n  </url>`;
});
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls,
  '</urlset>',
  '',
].join('\n');

const outputDir = resolve('dist');
await mkdir(outputDir, { recursive: true });
await Promise.all([
  writeFile(resolve(outputDir, 'sitemap.xml'), sitemap, 'utf8'),
  writeFile(resolve(outputDir, 'robots.txt'), [
    'User-agent: *',
    'Allow: /',
    `Sitemap: ${siteUrl}/sitemap.xml`,
    '',
  ].join('\n'), 'utf8'),
]);

console.log(`Generated sitemap with ${urls.length} URLs at ${siteUrl}`);

function escapeXml(value) {
  return value.replace(/[<>&"']/g, (character) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    "'": '&apos;',
  })[character]);
}
