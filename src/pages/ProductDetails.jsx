import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductHero from '../components/product/ProductHero';
import ProductSpecs from '../components/product/ProductSpecs';
import ProductReviews from '../components/product/ProductReviews';
import ProductRelated from '../components/product/ProductRelated';
import { useProduct, useProducts } from '../hooks/useProducts';
import { getCategoryBySlug } from '../data/categories';
import NotFound from './NotFound';
import PageMeta from '../components/PageMeta';
import useProductSlugs from '../hooks/useProductSlugs';
import { RECENT_PRODUCTS_KEY } from '../utils/productPreferences';
import { guidesData } from '../data/guides';
import { collections } from '../data/collections';

const ProductDetails = () => {
  const { productId } = useParams();
  const { data: product, isPending, isError } = useProduct(productId);
  const { addSlug: addRecentlyViewed } = useProductSlugs(RECENT_PRODUCTS_KEY, 6);
  const { data: relatedData } = useProducts(
    { categorySlug: product?.categorySlug, page: 1, pageSize: 4, sort: 'popularity' },
    { enabled: Boolean(product?.categorySlug) },
  );

  useEffect(() => {
    if (product?.slug) addRecentlyViewed(product.slug);
  }, [addRecentlyViewed, product?.slug]);

  if (isPending) return <p className="py-16 text-center text-gray-500">Loading product...</p>;
  if (isError) return <p className="py-16 text-center text-gray-500">We could not load this product right now. Please refresh and try again.</p>;
  if (!product) return <NotFound />;

  const category = getCategoryBySlug(product.categorySlug);
  const relatedProducts = (relatedData?.products || []).filter((item) => item.id !== product.id).slice(0, 3);
  const relatedGuides = guidesData
    .filter((guide) => guide.recommendedProductSlugs?.includes(product.slug))
    .slice(0, 1);
  const relatedCollections = collections
    .filter((collection) => collection.productSlugs?.includes(product.slug))
    .slice(0, 1);

  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen">
      <PageMeta
        title={`${product.name} Review & Product Details | KitchenTrusted`}
        description={product.description}
      />
      <ProductHero key={product.id} product={product} category={category} />
      <ProductSpecs product={product} />
      <ProductReviews
        key={product.id}
        reviews={product.reviews}
        rating={product.rating}
        reviewCount={product.reviewCount}
        ratingDistribution={product.ratingDistribution}
        sourceMarketplace={product.sourceMarketplace}
      />
      <ProductRelated
        products={relatedProducts}
        category={category}
        guides={relatedGuides}
        collections={relatedCollections}
      />
    </div>
  );
};

export default ProductDetails;
