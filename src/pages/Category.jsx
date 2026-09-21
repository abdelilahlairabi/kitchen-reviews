import { useParams, useSearchParams } from 'react-router-dom';
import CategoryHero from '../components/category/CategoryHero';
import CategoryFilters from '../components/category/CategoryFilters';
import CategoryProductGrid from '../components/category/CategoryProductGrid';
import RelatedCategories from '../components/category/RelatedCategories';
import { useCategories } from '../hooks/useCategories';
import { useProducts } from '../hooks/useProducts';
import { PRODUCT_PAGE_SIZE } from '../services/products';
import NotFound from './NotFound';

const Category = () => {
  const { categoryName } = useParams();
  const [searchParams] = useSearchParams();
  const { data: categories = [], isPending: isLoadingCategories, isError: categoriesError } = useCategories();
  const category = categories.find((item) => item.slug === categoryName);
  const activeType = searchParams.get('type') || '';
  const sort = searchParams.get('sort') || 'popularity';
  const requestedPage = Math.max(1, Number(searchParams.get('page')) || 1);
  const { data, isPending: isLoadingProducts, isFetching, isError: productsError } = useProducts({
    categoryId: category?.id,
    productType: activeType || undefined,
    page: requestedPage,
    pageSize: PRODUCT_PAGE_SIZE,
    sort,
  }, { enabled: Boolean(category?.id) });

  if (isLoadingCategories) return <p className="py-16 text-center text-gray-500">Loading category...</p>;
  if (categoriesError) return <p className="py-16 text-center text-gray-500">We could not load this category right now. Please refresh and try again.</p>;
  if (!category) return <NotFound />;
  if (productsError) return <p className="py-16 text-center text-gray-500">We could not load products right now. Please refresh and try again.</p>;

  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen" aria-busy={isFetching}>
      <CategoryHero category={category} productCount={data?.total || 0} />
      <CategoryFilters category={category} />
      {isLoadingProducts ? <p className="py-16 text-center text-gray-500">Loading products...</p> : <CategoryProductGrid products={data?.products || []} total={data?.total || 0} pageSize={PRODUCT_PAGE_SIZE} page={requestedPage} />}
      <RelatedCategories categories={categories} currentSlug={category.slug} />
    </div>
  );
};

export default Category;
