import { supabase } from '../utils/supabase';
import { productColumns, toProduct } from './products';

const styleColumns = 'id, slug, title, subtitle, hero_image, description, tags';

const toStyle = (row) => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  subtitle: row.subtitle,
  heroImage: row.hero_image,
  description: row.description,
  tags: row.tags || [],
});

export async function fetchStyles() {
  const { data, error } = await supabase
    .from('inspiration_styles')
    .select(styleColumns)
    .order('title', { ascending: true });
  if (error) throw new Error('Unable to load inspiration styles. Please try again.');
  return (data || []).map(toStyle);
}

export async function fetchStyleBySlug(slug) {
  const safeSlug = String(slug || '').trim().slice(0, 160);
  if (!safeSlug) return null;

  const { data: style, error: styleError } = await supabase
    .from('inspiration_styles')
    .select(styleColumns)
    .eq('slug', safeSlug)
    .maybeSingle();
  if (styleError) throw new Error('Unable to load this style. Please try again.');
  if (!style) return null;

  const [{ data: gallery, error: galleryError }, { data: links, error: linksError }] = await Promise.all([
    supabase.from('inspiration_gallery_images').select('id, image, sort_order').eq('style_id', style.id).order('sort_order', { ascending: true }),
    supabase.from('inspiration_style_products').select(`sort_order, products (${productColumns})`).eq('style_id', style.id).order('sort_order', { ascending: true }),
  ]);
  if (galleryError) throw new Error('Unable to load the style gallery. Please try again.');
  if (linksError) throw new Error('Unable to load style products. Please try again.');

  return {
    ...toStyle(style),
    gallery: (gallery || []).map((image) => image.image),
    products: (links || []).map((link) => link.products).filter(Boolean).map(toProduct),
  };
}
