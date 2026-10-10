import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import CategoryHero from '../components/category/CategoryHero';
import CategoryFilters from '../components/category/CategoryFilters';
import CategoryProductGrid from '../components/category/CategoryProductGrid';
import RelatedCategories from '../components/category/RelatedCategories';
import { useProducts } from '../hooks/useProducts';
import { PRODUCT_PAGE_SIZE } from '../services/products';
import { categories, getCategoryBySlug } from '../data/categories';
import PageMeta from '../components/PageMeta';
import NotFound from './NotFound';
import { getCategorySeo } from '../data/seoMetadata';

const Category = () => {
  const { categoryName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = getCategoryBySlug(categoryName);
  const sort = searchParams.get('sort') || 'popularity';
  const requestedPage = searchParams.has('type') ? 1 : Math.max(1, Number(searchParams.get('page')) || 1);
  const seo = category ? getCategorySeo(category) : null;

  useEffect(() => {
    if (!category || !searchParams.has('type')) return;
    const params = new URLSearchParams(searchParams);
    params.delete('type');
    params.delete('page');
    setSearchParams(params, { replace: true });
  }, [category, searchParams, setSearchParams]);

  const { data, isPending: isLoadingProducts, isFetching, isError: productsError } = useProducts({
    categorySlug: category?.slug,
    page: requestedPage,
    pageSize: PRODUCT_PAGE_SIZE,
    sort,
  }, { enabled: Boolean(category?.slug) });

  if (!category) return <NotFound />;
  if (productsError) return <p className="py-16 text-center text-gray-500">We could not load products right now. Please refresh and try again.</p>;

  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen" aria-busy={isFetching}>
      <PageMeta title={seo.title} description={seo.description} />
      <CategoryHero category={category} productCount={data?.total || 0} />
      <CategoryFilters />
      {isLoadingProducts ? <p className="py-16 text-center text-gray-500">Loading products...</p> : <CategoryProductGrid products={data?.products || []} total={data?.total || 0} pageSize={PRODUCT_PAGE_SIZE} page={requestedPage} />}
      {!isLoadingProducts && <RelatedCategories categories={categories} currentSlug={category.slug} />}
    </div>
  );
};

export default Category;
