import { useParams } from 'react-router-dom';
import ProductHero from '../components/product/ProductHero';
import ProductSpecs from '../components/product/ProductSpecs';
import ProductReviews from '../components/product/ProductReviews';
import ProductRelated from '../components/product/ProductRelated';
import { useProduct, useProducts } from '../hooks/useProducts';
import { getCategoryBySlug } from '../data/categories';
import NotFound from './NotFound';

const ProductDetails = () => {
  const { productId } = useParams();
  const { data: product, isPending, isError } = useProduct(productId);
  const { data: relatedData } = useProducts(
    { categorySlug: product?.categorySlug, page: 1, pageSize: 4, sort: 'popularity' },
    { enabled: Boolean(product?.categorySlug) },
  );

  if (isPending) return <p className="py-16 text-center text-gray-500">Loading product...</p>;
  if (isError) return <p className="py-16 text-center text-gray-500">We could not load this product right now. Please refresh and try again.</p>;
  if (!product) return <NotFound />;

  const category = getCategoryBySlug(product.categorySlug);
  const relatedProducts = (relatedData?.products || []).filter((item) => item.id !== product.id).slice(0, 3);

  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen">
      <ProductHero product={product} category={category} />
      <ProductSpecs product={product} />
      <ProductReviews reviews={product.reviews} />
      <ProductRelated products={relatedProducts} />
    </div>
  );
};

export default ProductDetails;
