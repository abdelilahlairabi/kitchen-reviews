import { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductHero = ({ product, category }) => {
  const gallery = product.images.length > 0 ? product.images : [{ url: product.image, alt: product.name }];
  const [activeImage, setActiveImage] = useState(gallery[0]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-xs text-gray-500 mb-8" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-black">Home</Link><span className="mx-2">/</span>
        {category ? <Link to={`/category/${category.slug}`} className="hover:text-black">{category.name}</Link> : <span>Products</span>}
        <span className="mx-2">/</span><span className="text-gray-900 font-medium">{product.name}</span>
      </nav>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="bg-white rounded-2xl p-8 border border-gray-100 flex items-center justify-center h-[400px]">
            <img src={activeImage.url} alt={activeImage.alt} className="max-h-full object-contain" />
          </div>
          {gallery.length > 1 && <div className="flex gap-4 overflow-x-auto pb-2">
            {gallery.map((image, index) => <button key={image.url} type="button" onClick={() => setActiveImage(image)} aria-label={`Show product image ${index + 1}`} aria-pressed={activeImage.url === image.url} className={`bg-white border rounded-lg p-2 w-20 h-20 flex-shrink-0 transition-colors ${activeImage.url === image.url ? 'border-black' : 'border-gray-200 hover:border-black'}`}><img src={image.url} alt={image.alt} className="w-full h-full object-contain" /></button>)}
          </div>}
        </div>
        <div className="w-full md:w-1/2">
          {product.badge && <span className="bg-[#ebd5b3] text-black text-xs font-bold px-3 py-1 rounded mb-4 inline-block">{product.badge}</span>}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4"><div className="flex text-[#a0aec0]">{[...Array(5)].map((_, index) => <span key={index} className={index < Math.round(product.rating) ? 'text-gray-700' : 'text-gray-300'}>★</span>)}</div><span className="text-sm font-medium text-gray-700">{product.rating}</span><span className="text-sm text-gray-500">({product.reviewCount.toLocaleString()} reviews)</span></div>
          <div className="flex items-end gap-3 mb-4"><span className="text-3xl font-extrabold text-black">${product.price.toFixed(2)}</span>{product.originalPrice && <><span className="text-lg text-gray-400 line-through mb-1">${product.originalPrice.toFixed(2)}</span><span className="text-sm text-red-500 font-medium mb-2">-{product.discountPercent}%</span></>}</div>
          <p className="text-gray-600 text-sm mb-6 line-clamp-3">{product.description}</p>
          <ul className="space-y-3 mb-8">{product.features.map((feature) => <li key={feature} className="flex items-start gap-2 text-sm text-gray-700"><span className="text-black">✓</span>{feature}</li>)}</ul>
          <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow sponsored" className="block w-full text-center bg-[#ebd5b3] hover:bg-[#dcb589] text-black font-bold py-3 rounded-lg transition-colors mb-2">View on Amazon</a>
          <p className="text-center text-xs text-gray-500 mb-6">As an Amazon Associate we earn from qualifying purchases</p>
        </div>
      </div>
    </div>
  );
};

export default ProductHero;
