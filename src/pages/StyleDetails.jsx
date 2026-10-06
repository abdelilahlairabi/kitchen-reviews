import { useParams } from 'react-router-dom';
import { getStyleBySlug, otherStylesList } from '../data/inspirationStyles';
import { useProductsBySlugs } from '../hooks/useProducts';

import StyleHero from '../components/style/StyleHero';
import StyleGallery from '../components/style/StyleGallery';
import ShopThisLook from '../components/style/ShopThisLook';
import ExploreOtherStyles from '../components/style/ExploreOtherStyles';
import NotFound from './NotFound';
import PageMeta from '../components/PageMeta';

export default function StyleDetails() {
  const { slug } = useParams();
  const styleData = getStyleBySlug(slug);
  const { data: fetchedProducts = [] } = useProductsBySlugs(styleData?.productSlugs || []);

  if (!styleData) return <NotFound />;
  const productsBySlug = new Map(fetchedProducts.map((product) => [product.slug, product]));
  const styleWithProducts = { ...styleData, products: (styleData.productSlugs || []).map((productSlug) => productsBySlug.get(productSlug)).filter(Boolean) };

  return (
    <main className="bg-white min-h-screen pb-16">
      <PageMeta
        title={styleData.seoTitle || `${styleData.title} Kitchen Ideas | Kitchen Reviews`}
        description={styleData.description}
      />
      {/* Hero & Description */}
      <StyleHero styleData={styleWithProducts} />

      {/* Photo Gallery Grid */}
      <StyleGallery gallery={styleWithProducts.gallery} />

      {/* Shop This Look */}
      {styleWithProducts.products.length > 0 && <ShopThisLook products={styleWithProducts.products} />}

      {/* Explore Other Styles */}
      <ExploreOtherStyles otherStyles={otherStylesList.filter((style) => style.slug !== styleData.slug)} />

      {/* Newsletter Section */}
      <section className="max-w-4xl mx-auto px-4 my-12">
        <div className="bg-[#EFECE6] rounded-3xl p-8 md:p-10 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Get Weekly Kitchen Inspiration
          </h3>
          <p className="text-xs md:text-sm text-gray-600 mb-6">
            Receive fresh kitchen ideas and curated product picks in your inbox.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Subscribed!");
            }}
            className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="px-4 py-2.5 rounded-xl text-xs md:text-sm bg-white border border-gray-300 flex-1 focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
            />
            <button
              type="submit"
              className="bg-[#D4A373] hover:bg-[#b8895b] text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-colors shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
