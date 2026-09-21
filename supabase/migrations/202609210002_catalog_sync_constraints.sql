-- Stable identifiers required for idempotent imports.
-- Apply after 202609210001_public_catalog_security.sql and before running scripts/migrate.js again.

create unique index if not exists categories_slug_key on public.categories (slug);
create unique index if not exists products_slug_key on public.products (slug);
create unique index if not exists collections_slug_key on public.collections (slug);
create unique index if not exists guides_slug_key on public.guides (slug);
create unique index if not exists inspiration_styles_slug_key on public.inspiration_styles (slug);

-- Child rows use a deterministic parent + position or parent + natural identifier.
create unique index if not exists product_images_product_id_sort_order_key
  on public.product_images (product_id, sort_order);
create unique index if not exists reviews_product_id_author_name_key
  on public.reviews (product_id, author_name);
create unique index if not exists collection_products_collection_id_product_id_key
  on public.collection_products (collection_id, product_id);
create unique index if not exists guide_faqs_guide_id_sort_order_key
  on public.guide_faqs (guide_id, sort_order);
create unique index if not exists guide_products_guide_id_product_id_key
  on public.guide_products (guide_id, product_id);
create unique index if not exists inspiration_gallery_images_style_id_sort_order_key
  on public.inspiration_gallery_images (style_id, sort_order);
create unique index if not exists inspiration_style_products_style_id_product_id_key
  on public.inspiration_style_products (style_id, product_id);
