import { useParams } from 'react-router-dom';
import { useStyle, useStyles } from '../hooks/useStyles';

import StyleHero from '../components/style/StyleHero';
import StyleGallery from '../components/style/StyleGallery';
import ShopThisLook from '../components/style/ShopThisLook';
import ExploreOtherStyles from '../components/style/ExploreOtherStyles';
import NotFound from './NotFound';

export default function StyleDetails() {
  const { slug } = useParams();
  const { data: styleData, isLoading, isError } = useStyle(slug);
  const { data: styles = [] } = useStyles();

  if (isLoading) return <main className="min-h-screen bg-white p-8 text-center text-gray-600">Loading style…</main>;
  if (isError) return <main className="min-h-screen bg-white p-8 text-center text-gray-600">Unable to load this style. Please try again.</main>;
  if (!styleData) return <NotFound />;

  return (
    <main className="bg-white min-h-screen pb-16">
      {/* Hero & Description */}
      <StyleHero styleData={styleData} />

      {/* Photo Gallery Grid */}
      <StyleGallery gallery={styleData.gallery} />

      {/* Shop This Look */}
      {styleData.products.length > 0 && <ShopThisLook products={styleData.products} />}

      {/* Explore Other Styles */}
      <ExploreOtherStyles otherStyles={styles.filter((style) => style.slug !== styleData.slug)} />

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
