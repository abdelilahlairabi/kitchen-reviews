import ProductCard from '../ProductCard';

export default function CollectionProductCard({ product }) {
  return <ProductCard product={product} imageSizes="(max-width: 359px) calc(100vw - 56px), (max-width: 639px) calc((100vw - 92px) / 2), (max-width: 1023px) calc((100vw - 100px) / 2), (max-width: 1279px) calc((100vw - 232px) / 3), 276px" fallbackToProductDetails />;
}
