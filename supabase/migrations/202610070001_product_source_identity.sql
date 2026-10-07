-- Store a private source identity so repeated Amazon CSV imports update the
-- existing catalog row rather than creating another product with a new slug.
alter table public.products
  add column if not exists source_marketplace text,
  add column if not exists amazon_asin text;

create unique index if not exists products_source_identity_key
  on public.products (source_marketplace, amazon_asin)
  where source_marketplace is not null and amazon_asin is not null;
