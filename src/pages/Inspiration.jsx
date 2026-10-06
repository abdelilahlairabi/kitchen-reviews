import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductsBySlugs } from '../hooks/useProducts';
import { inspirationCategories, inspirationGallery, shopTheLookProducts, styleSpotlight } from '../data/inspiration';

import InspirationHeader from '../components/inspiration/InspirationHeader';
import InspirationGrid from '../components/inspiration/InspirationGrid';
import StyleSpotlight from '../components/inspiration/StyleSpotlight';
import ShopTheLook from '../components/inspiration/ShopTheLook';
import PageMeta from '../components/PageMeta';

export default function Inspiration() {
  const [selectedCategory, setSelectedCategory] = useState("All Styles");
  const navigate = useNavigate();
  const productSlugs = ['brushed-nickel-kitchen-faucet', 'walnut-end-grain-cutting-board', 'fireclay-ceramic-farmhouse-sink', 'gooseneck-electric-kettle'];
  const { data: fetchedProducts = [] } = useProductsBySlugs(productSlugs);
  const categories = inspirationCategories;

  // Filtrage des éléments selon la catégorie
  const filteredGallery = selectedCategory === "All Styles"
    ? inspirationGallery
    : inspirationGallery.filter((style) => style.category === selectedCategory);

  const handleProductClick = (style) => navigate(`/inspiration/${style.slug}`);
  const productsBySlug = new Map(fetchedProducts.map((product) => [product.slug, product]));
  const spotlightProducts = ['brushed-nickel-kitchen-faucet', 'walnut-end-grain-cutting-board', 'fireclay-ceramic-farmhouse-sink'].map((slug) => productsBySlug.get(slug)).filter(Boolean);
  const shopProducts = shopTheLookProducts.map((product) => productsBySlug.get(product.slug)).filter(Boolean);

  return (
    <main className="bg-white min-h-screen pb-16">
      <PageMeta
        title="Kitchen Design Inspiration and Ideas | Kitchen Reviews"
        description="Explore modern farmhouse, minimalist white, and warm Scandinavian kitchen ideas. Browse practical design details, materials, storage, lighting, and product picks."
      />
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

      <section className="max-w-3xl mx-auto px-4 mt-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Find a kitchen style that works for your home</h2>
        <p className="text-sm md:text-base leading-relaxed text-gray-600">
          Explore kitchen design ideas by comparing the materials, colors, storage, and lighting that define each look. Open a style guide for practical details, then browse related kitchen products when you are ready to plan an update.
        </p>
      </section>

      <StyleSpotlight spotlight={{ ...styleSpotlight, featuredItems: spotlightProducts }} />

      {/* Section Shop The Look */}
      {shopProducts.length > 0 && <div id="shop-the-look"><ShopTheLook products={shopProducts} /></div>}

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
