import { supabase } from '../utils/supabase';
import { productColumns, toProduct } from './products';

const guideColumns = 'id, slug, title, badge, read_time, description, image, author_name, author_role, author_avatar, quick_tip, comparison_types, comparison_finishes';

const toGuide = (row) => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  badge: row.badge,
  time: row.read_time,
  desc: row.description,
  image: row.image,
  author: row.author_name ? {
    name: row.author_name,
    role: row.author_role,
    avatar: row.author_avatar,
  } : null,
  quickTip: row.quick_tip,
  types: row.comparison_types || [],
  finishes: row.comparison_finishes || [],
});

export async function fetchGuides() {
  const { data, error } = await supabase
    .from('guides')
    .select(guideColumns)
    .order('title', { ascending: true });

  if (error) throw new Error('Unable to load guides. Please try again.');
  return (data || []).map(toGuide);
}

export async function fetchGuideBySlug(slug) {
  const safeSlug = String(slug || '').trim().slice(0, 160);
  if (!safeSlug) return null;

  const { data: guide, error: guideError } = await supabase
    .from('guides')
    .select(guideColumns)
    .eq('slug', safeSlug)
    .maybeSingle();
  if (guideError) throw new Error('Unable to load this guide. Please try again.');
  if (!guide) return null;

  const [{ data: faqs, error: faqsError }, { data: links, error: linksError }] = await Promise.all([
    supabase
      .from('guide_faqs')
      .select('id, question, answer, sort_order')
      .eq('guide_id', guide.id)
      .order('sort_order', { ascending: true }),
    supabase
      .from('guide_products')
      .select(`sort_order, products (${productColumns})`)
      .eq('guide_id', guide.id)
      .order('sort_order', { ascending: true }),
  ]);

  if (faqsError) throw new Error('Unable to load guide FAQs. Please try again.');
  if (linksError) throw new Error('Unable to load guide products. Please try again.');

  return {
    ...toGuide(guide),
    faqs: (faqs || []).map((faq) => ({ id: faq.id, q: faq.question, a: faq.answer })),
    recommendedProducts: (links || []).map((link) => link.products).filter(Boolean).map(toProduct),
  };
}
