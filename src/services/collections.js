import { supabase } from '../utils/supabase';
import { productColumns, toProduct } from './products';

const collectionColumns = 'id, slug, name, featured, badge, image, subtitle, intro_text, curator_name';

const toCollection = (row) => ({
  id: row.id,
  slug: row.slug,
  name: row.name,
  title: row.name,
  featured: row.featured,
  badge: row.badge,
  image: row.image,
  heroImage: row.image,
  subtitle: row.subtitle,
  introText: row.intro_text,
  curator: row.curator_name ? { name: row.curator_name } : null,
});

export async function fetchCollections() {
  const { data, error } = await supabase
    .from('collections')
    .select(collectionColumns)
    .order('featured', { ascending: false })
    .order('name', { ascending: true });
  if (error) throw new Error('Unable to load collections. Please try again.');
  return (data || []).map(toCollection);
}

export async function fetchCollectionBySlug(slug) {
  const safeSlug = String(slug || '').trim().slice(0, 160);
  if (!safeSlug) return null;
  const { data: collection, error: collectionError } = await supabase
    .from('collections')
    .select(collectionColumns)
    .eq('slug', safeSlug)
    .maybeSingle();
  if (collectionError) throw new Error('Unable to load this collection. Please try again.');
  if (!collection) return null;

  const { data: links, error: linksError } = await supabase
    .from('collection_products')
    .select(`sort_order, products (${productColumns})`)
    .eq('collection_id', collection.id)
    .order('sort_order', { ascending: true });
  if (linksError) throw new Error('Unable to load collection products. Please try again.');

  return {
    ...toCollection(collection),
    products: (links || []).map((link) => link.products).filter(Boolean).map(toProduct),
  };
}
