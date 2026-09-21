import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStyle, useStyles } from '../hooks/useStyles';

import InspirationHeader from '../components/inspiration/InspirationHeader';
import InspirationGrid from '../components/inspiration/InspirationGrid';
import StyleSpotlight from '../components/inspiration/StyleSpotlight';
import ShopTheLook from '../components/inspiration/ShopTheLook';

export default function Inspiration() {
  const [selectedCategory, setSelectedCategory] = useState("All Styles");
  const navigate = useNavigate();
  const { data: styles = [], isLoading, isError } = useStyles();
  const spotlightStyle = styles.find((style) => style.slug === 'modern-farmhouse') || styles[0];
  const { data: spotlightDetails } = useStyle(spotlightStyle?.slug);
  const categories = ['All Styles', ...styles.map((style) => style.title)];

  // Filtrage des éléments selon la catégorie
  const filteredGallery = selectedCategory === "All Styles"
    ? styles
    : styles.filter((style) => style.title === selectedCategory);

  const handleProductClick = (style) => navigate(`/inspiration/${style.slug}`);

  return (
    <main className="bg-white min-h-screen pb-16">
      {/* En-tête et Filtres */}
      <InspirationHeader
        categories={categories}
        activeCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Galerie Masonry */}
      <InspirationGrid
        items={filteredGallery}
        onProductClick={handleProductClick}
      />

      {isLoading && <p className="max-w-5xl mx-auto px-4 text-center text-gray-600">Loading inspiration styles…</p>}
      {isError && <p className="max-w-5xl mx-auto px-4 text-center text-gray-600">Unable to load inspiration styles. Please try again.</p>}
      {spotlightStyle && <StyleSpotlight spotlight={{
        title: `This Month's Spotlight: ${spotlightStyle.title}`,
        subtitle: 'Style Spotlight',
        description: spotlightStyle.description,
        image: spotlightStyle.heroImage,
        featuredItems: spotlightDetails?.products || [],
      }} />}

      {/* Section Shop The Look */}
      {spotlightDetails?.products?.length > 0 && <div id="shop-the-look"><ShopTheLook products={spotlightDetails.products} /></div>}

      {/* Formulaire Newsletter */}
      <section className="max-w-3xl mx-auto px-4 my-16">
        <div className="bg-[#EFECE6] rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Get Weekly Kitchen Inspiration
          </h3>
          <p className="text-xs md:text-sm text-gray-600 mb-6">
            New styles, design guides, and product picks delivered to your inbox.
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
              placeholder="Your email address"
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
