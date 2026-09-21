import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ShopThisLook({ products }) {
  return (
    <section className="max-w-5xl mx-auto px-4 my-16">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 text-center mb-10">
        Shop This Look
      </h2>

      {/* Grille de 3 colonnes de produits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products?.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl border border-gray-200/90 p-4 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
          >
            <div>
              {/* Conteneur Image Produit */}
              <div className="h-48 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center p-3 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain rounded-lg"
                  loading="lazy"
                />
              </div>

              {/* Titre & Évaluation */}
              <Link to={`/products/${product.slug}`} className="block font-bold text-gray-900 text-xs md:text-sm line-clamp-2 mb-1 hover:underline">
                {product.name}
              </Link>
              
              <div className="flex text-amber-400 mb-2">
                {[...Array(product.rating || 5)].map((_, i) => (
                  <Star key={i} size={12} fill="currentColor" />
                ))}
              </div>

              {/* Prix */}
              <p className="text-sm font-bold text-gray-900">
                ${product.price?.toFixed(2)}
              </p>
            </div>

            {/* Bouton d'action */}
            <a
              href={product.affiliateUrl || "#"}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="mt-4 block text-center bg-[#D4A373] hover:bg-[#b8895b] text-white text-xs font-bold py-2.5 rounded-xl transition-colors"
            >
              Check Price
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
