import { Link, useParams } from 'react-router-dom';
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
  const { data: fetchedProducts = [], isError: productsError } = useProductsBySlugs(styleData?.productSlugs || []);

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
      {styleWithProducts.products.length > 0 || productsError ? <ShopThisLook products={styleWithProducts.products} styleTitle={styleWithProducts.title} isError={productsError} /> : null}

      {/* Explore Other Styles */}
      <ExploreOtherStyles otherStyles={otherStylesList.filter((style) => style.slug !== styleData.slug)} />

      <section className="max-w-6xl mx-auto px-4 my-16">
        <div className="rounded-3xl bg-gray-950 text-white p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#dfc39f] mb-3">Explore more design ideas</p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">Build a kitchen that feels like yours.</h2>
            <p className="text-gray-300 leading-relaxed">Compare other style guides or browse the current catalog to find details that fit your space and budget.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link to="/inspiration" className="inline-flex justify-center items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-gray-950 hover:bg-gray-100 transition-colors">All style guides</Link>
            <Link to="/products" className="inline-flex justify-center items-center rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors">Browse products</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
