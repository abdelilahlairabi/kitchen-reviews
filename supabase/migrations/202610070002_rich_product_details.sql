-- Extra catalog fields returned by the Amazon product enrichment workflow.
-- Flexible attributes stay in products.specs; stable/high-value fields get columns.

alter table public.products
  add column if not exists brand_name text,
  add column if not exists model_number text,
  add column if not exists upc text,
  add column if not exists availability_status text,
  add column if not exists shipping_price text,
  add column if not exists shipping_time text,
  add column if not exists shipping_condition text,
  add column if not exists sold_by text,
  add column if not exists ships_from text,
  add column if not exists is_coupon_available boolean,
  add column if not exists source_category_path text,
  add column if not exists aplus_present boolean,
  add column if not exists rating_distribution jsonb not null default '{}'::jsonb,
  add column if not exists variants jsonb not null default '[]'::jsonb,
  add column if not exists last_scraped_at timestamptz;

-- Keep both standard and high-resolution links for each gallery position.
alter table public.product_images
  add column if not exists standard_image_url text;

-- Store metadata needed to identify and refresh imported review samples.
alter table public.reviews
  add column if not exists source text,
  add column if not exists source_review_key text,
  add column if not exists reviewer_url text,
  add column if not exists review_title text,
  add column if not exists reviewed_at text,
  add column if not exists variation jsonb not null default '{}'::jsonb,
  add column if not exists verified_purchase boolean,
  add column if not exists manufacturer_replied boolean,
  add column if not exists helpful_count integer,
  add column if not exists review_images jsonb not null default '[]'::jsonb;

-- Reconcile ON CONFLICT targets with the n8n/PostgREST upsert requests.
-- NULL identity values remain allowed for products not sourced from Amazon.
drop index if exists public.products_source_identity_key;
create unique index products_source_identity_key
  on public.products (source_marketplace, amazon_asin);

-- Source review keys let one reviewer contribute multiple distinct reviews.
drop index if exists public.reviews_product_id_author_name_key;
create unique index if not exists reviews_product_id_source_review_key
  on public.reviews (product_id, source_review_key);
