import { Link } from 'react-router-dom';

export default function ShopTheLook({ products }) {
  return (
    <section className="max-w-5xl mx-auto px-4 my-16">
      <div className="text-center mb-8">
        <span className="text-[10px] md:text-xs font-bold tracking-widest text-gray-400 uppercase">
          SHOP THE LOOK KITCHEN
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1">
          Shop the Modern Farmhouse Look
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl border border-gray-200 p-3 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="space-y-3">
              <div className="h-40 md:h-48 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center p-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
              <div>
                <Link to={`/products/${product.slug}`} className="font-bold text-gray-900 text-xs md:text-sm line-clamp-2 hover:underline">
                  {product.name}
                </Link>
                <p className="text-xs md:text-sm font-semibold text-gray-800 mt-1">
                  ${product.price?.toFixed(2)}
                </p>
              </div>
            </div>

            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="mt-4 block text-center bg-[#D4A373] hover:bg-[#b8895b] text-white text-xs font-bold py-2 px-3 rounded-xl transition-colors"
            >
              Check Price
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
