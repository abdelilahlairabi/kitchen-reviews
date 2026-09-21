-- Public catalog security baseline.
-- Apply this file with the Supabase CLI or paste it into the Supabase SQL Editor.
-- This is intentionally idempotent so it is safe to re-run.

-- 1. Enable Row Level Security on every table exposed by the public catalog.
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.reviews enable row level security;
alter table public.collections enable row level security;
alter table public.collection_products enable row level security;
alter table public.guides enable row level security;
alter table public.guide_faqs enable row level security;
alter table public.guide_products enable row level security;
alter table public.inspiration_styles enable row level security;
alter table public.inspiration_gallery_images enable row level security;
alter table public.inspiration_style_products enable row level security;

-- 2. The browser may read this public editorial catalog, but it cannot write to it.
-- Secret-key scripts and server-side jobs bypass RLS and remain able to import data.
revoke all on table public.categories from anon, authenticated;
revoke all on table public.products from anon, authenticated;
revoke all on table public.product_images from anon, authenticated;
revoke all on table public.reviews from anon, authenticated;
revoke all on table public.collections from anon, authenticated;
revoke all on table public.collection_products from anon, authenticated;
revoke all on table public.guides from anon, authenticated;
revoke all on table public.guide_faqs from anon, authenticated;
revoke all on table public.guide_products from anon, authenticated;
revoke all on table public.inspiration_styles from anon, authenticated;
revoke all on table public.inspiration_gallery_images from anon, authenticated;
revoke all on table public.inspiration_style_products from anon, authenticated;

grant select on table public.categories to anon, authenticated;
grant select on table public.products to anon, authenticated;
grant select on table public.product_images to anon, authenticated;
grant select on table public.reviews to anon, authenticated;
grant select on table public.collections to anon, authenticated;
grant select on table public.collection_products to anon, authenticated;
grant select on table public.guides to anon, authenticated;
grant select on table public.guide_faqs to anon, authenticated;
grant select on table public.guide_products to anon, authenticated;
grant select on table public.inspiration_styles to anon, authenticated;
grant select on table public.inspiration_gallery_images to anon, authenticated;
grant select on table public.inspiration_style_products to anon, authenticated;

-- 3. Explicit RLS policies: read-only access for public catalog content.
drop policy if exists "Public can read categories" on public.categories;
create policy "Public can read categories" on public.categories for select to anon, authenticated using (true);

drop policy if exists "Public can read products" on public.products;
create policy "Public can read products" on public.products for select to anon, authenticated using (true);

drop policy if exists "Public can read product images" on public.product_images;
create policy "Public can read product images" on public.product_images for select to anon, authenticated using (true);

drop policy if exists "Public can read reviews" on public.reviews;
create policy "Public can read reviews" on public.reviews for select to anon, authenticated using (true);

drop policy if exists "Public can read collections" on public.collections;
create policy "Public can read collections" on public.collections for select to anon, authenticated using (true);

drop policy if exists "Public can read collection products" on public.collection_products;
create policy "Public can read collection products" on public.collection_products for select to anon, authenticated using (true);

drop policy if exists "Public can read guides" on public.guides;
create policy "Public can read guides" on public.guides for select to anon, authenticated using (true);

drop policy if exists "Public can read guide FAQs" on public.guide_faqs;
create policy "Public can read guide FAQs" on public.guide_faqs for select to anon, authenticated using (true);

drop policy if exists "Public can read guide products" on public.guide_products;
create policy "Public can read guide products" on public.guide_products for select to anon, authenticated using (true);

drop policy if exists "Public can read inspiration styles" on public.inspiration_styles;
create policy "Public can read inspiration styles" on public.inspiration_styles for select to anon, authenticated using (true);

drop policy if exists "Public can read inspiration gallery images" on public.inspiration_gallery_images;
create policy "Public can read inspiration gallery images" on public.inspiration_gallery_images for select to anon, authenticated using (true);

drop policy if exists "Public can read inspiration style products" on public.inspiration_style_products;
create policy "Public can read inspiration style products" on public.inspiration_style_products for select to anon, authenticated using (true);

-- 4. Indexes for the public read patterns: slug lookups, category filtering,
-- sorting, and joins. Primary keys and unique constraints remain the source of truth.
create index if not exists products_category_id_idx on public.products (category_id);
create index if not exists products_rating_idx on public.products (rating desc);
create index if not exists products_price_idx on public.products (price);
create index if not exists product_images_product_id_sort_order_idx on public.product_images (product_id, sort_order);
create index if not exists reviews_product_id_idx on public.reviews (product_id);
create index if not exists collection_products_collection_id_sort_order_idx on public.collection_products (collection_id, sort_order);
create index if not exists collection_products_product_id_idx on public.collection_products (product_id);
create index if not exists guide_faqs_guide_id_sort_order_idx on public.guide_faqs (guide_id, sort_order);
create index if not exists guide_products_guide_id_sort_order_idx on public.guide_products (guide_id, sort_order);
create index if not exists guide_products_product_id_idx on public.guide_products (product_id);
create index if not exists inspiration_gallery_images_style_id_sort_order_idx on public.inspiration_gallery_images (style_id, sort_order);
create index if not exists inspiration_style_products_style_id_sort_order_idx on public.inspiration_style_products (style_id, sort_order);
create index if not exists inspiration_style_products_product_id_idx on public.inspiration_style_products (product_id);

-- 5. Verification query (run after applying; it should list every table with RLS enabled).
-- select tablename, rowsecurity
-- from pg_tables
-- where schemaname = 'public'
--   and tablename in (
--     'categories', 'products', 'product_images', 'reviews', 'collections',
--     'collection_products', 'guides', 'guide_faqs', 'guide_products',
--     'inspiration_styles', 'inspiration_gallery_images', 'inspiration_style_products'
--   )
-- order by tablename;
