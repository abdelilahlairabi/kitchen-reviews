import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CollectionProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative">
      {/* Badge */}
      {product.badge && (
        <span className="absolute top-6 left-6 z-10 bg-[#C59B67] text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded">
          {product.badge}
        </span>
      )}

      {/* Image */}
      <div className="h-48 bg-gray-50 rounded-lg overflow-hidden mb-4 flex items-center justify-center p-2">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Infos */}
      <div>
        <Link to={`/product/${product.slug}`} className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1 min-h-[2.5rem] hover:text-[#C59B67] transition-colors">
          {product.name}
        </Link>

        {/* Note / Étoiles */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < Math.floor(product.rating || 0) ? "currentColor" : "none"}
                className={i < Math.floor(product.rating || 0) ? "text-amber-400" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">({product.reviewCount || 0})</span>
        </div>
      </div>

      {/* Prix et Bouton Affiliation */}
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-100 mt-2">
        <div>
          <span className="text-base font-bold text-gray-900">
            ${product.price?.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through ml-2">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <Link
          to={`/product/${product.slug}`}
          className="border border-gray-300 hover:border-gray-500 text-gray-900 text-xs font-medium px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
        >
          Details
        </Link>
        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer nofollow sponsored"
          className="bg-[#C59B67] hover:bg-[#b28856] text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
        >
          Check Price
        </a>
      </div>
    </div>
  );
}
