import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProductsBySlugs } from '../hooks/useProducts';
import { inspirationCategories, inspirationGallery } from '../data/inspiration';
import { stylesData } from '../data/inspirationStyles';

import InspirationHeader from '../components/inspiration/InspirationHeader';
import InspirationGrid from '../components/inspiration/InspirationGrid';
import StyleSpotlight from '../components/inspiration/StyleSpotlight';
import ShopTheLook from '../components/inspiration/ShopTheLook';
import PageMeta from '../components/PageMeta';

export default function Inspiration() {
  const [selectedCategory, setSelectedCategory] = useState("All Styles");
  const categories = inspirationCategories;

  // Filtrage des éléments selon la catégorie
  const filteredGallery = selectedCategory === "All Styles"
    ? inspirationGallery
    : inspirationGallery.filter((style) => style.category === selectedCategory);

  const activeGalleryStyle = selectedCategory === 'All Styles'
    ? inspirationGallery.find((style) => style.featured) || inspirationGallery[0]
    : inspirationGallery.find((style) => style.category === selectedCategory);
  const activeStyle = stylesData[activeGalleryStyle?.slug];
  const { data: shopProducts = [], isError: productsError } = useProductsBySlugs(activeStyle?.productSlugs || []);
  const spotlight = activeStyle ? {
    title: `Design notes: ${activeStyle.title}`,
    subtitle: 'A CLOSER LOOK AT THE STYLE',
    description: activeStyle.description,
    image: activeStyle.heroImage,
    slug: activeStyle.slug,
    tags: activeStyle.tags,
  } : null;

  return (
    <main className="bg-white min-h-screen pb-16">
      <PageMeta
        title="Kitchen Design Inspiration and Ideas | Kitchen Reviews"
        description="Explore modern farmhouse, minimalist white, and warm Scandinavian kitchen ideas. Browse practical design details, materials, storage, lighting, and product picks."
      />
      <InspirationHeader
        categories={categories}
        activeCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <InspirationGrid
        items={filteredGallery}
      />

      <section className="max-w-4xl mx-auto px-4 mt-12 text-center">
        <p className="text-xs uppercase tracking-[0.18em] font-semibold text-[#8c6744] mb-3">Ideas you can adapt</p>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-950 mb-3">Find a kitchen style that works for your home</h2>
        <p className="text-sm md:text-base leading-relaxed text-gray-600 max-w-3xl mx-auto">
          Compare the colors, materials, storage, and lighting behind each look. Every style opens a practical guide with design choices and related catalog products. The gallery images are illustrative concepts, not photographs of completed customer projects.
        </p>
      </section>

      {spotlight && <StyleSpotlight spotlight={spotlight} />}

      {activeStyle && (shopProducts.length > 0 || productsError) && <div id="shop-the-look"><ShopTheLook products={shopProducts} styleTitle={activeStyle.title} isError={productsError} /></div>}

      <section className="max-w-6xl mx-auto px-4 my-16">
        <div className="rounded-3xl bg-gray-950 text-white p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#dfc39f] mb-3">Make a plan</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">Bring the ideas into your kitchen.</h2>
            <p className="text-gray-300 leading-relaxed">Use the style guides to define your palette and priorities, then compare items in the current product catalog.</p>
          </div>
          <Link to="/products" className="inline-flex justify-center items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-gray-950 hover:bg-gray-100 transition-colors shrink-0">Browse products <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </main>
  );
}
