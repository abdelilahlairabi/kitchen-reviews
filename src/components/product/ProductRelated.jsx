import { Link } from 'react-router-dom';

const ProductRelated = ({ products }) => {
  if (!products?.length) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-10">
      <h2 className="text-center text-lg font-medium text-gray-600 mb-8">You May Also Like</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{products.map((product) => <article key={product.id} className="border border-gray-200 rounded-xl p-4 flex flex-col items-center bg-white text-center hover:shadow-md transition-shadow"><div className="w-full h-48 mb-4 flex items-center justify-center bg-gray-50 rounded-lg p-4"><img src={product.image} alt={product.name} className="max-h-full object-contain mix-blend-multiply" loading="lazy" /></div><h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">{product.name}</h3><div className="text-[#a0aec0] text-xs mb-2" aria-label={`${product.rating} out of 5 stars`}>{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</div><p className="text-lg font-bold mb-3">${product.price.toFixed(2)}</p><Link to={`/product/${product.slug}`} className="bg-[#ebd5b3] hover:bg-[#dcb589] px-6 py-1.5 rounded text-sm font-medium text-black transition-colors">View Details</Link></article>)}</div>
    </div>
  );
};

export default ProductRelated;
