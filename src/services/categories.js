import { supabase } from '../utils/supabase';

export async function fetchCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('id, slug, name, description, hero_image, sub_filters')
    .order('name', { ascending: true });

  if (error) throw new Error('Unable to load categories. Please try again.');

  return (data || []).map((category) => ({
    id: category.id,
    slug: category.slug,
    name: category.name,
    description: category.description,
    heroImage: category.hero_image,
    subFilters: category.sub_filters || [],
  }));
}
