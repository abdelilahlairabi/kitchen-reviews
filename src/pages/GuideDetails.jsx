import { useParams } from 'react-router-dom';
import { getGuideBySlug, guidesData } from '../data/guides';
import { useProductsBySlugs } from '../hooks/useProducts';

import GuideHeader from '../components/guidedetails/GuideHeader';
import GuideContent from '../components/guidedetails/GuideContent';
import RelatedGuides from '../components/guidedetails/RelatedGuides';
import GuideNewsletter from '../components/guidedetails/GuideNewsletter';
import NotFound from './NotFound';
import PageMeta from '../components/PageMeta';

export default function GuideDetails() {
  const { slug } = useParams();
  const guide = getGuideBySlug(slug);
  const { data: fetchedProducts = [] } = useProductsBySlugs(guide?.recommendedProductSlugs || []);

  if (!guide) return <NotFound />;
  const productsBySlug = new Map(fetchedProducts.map((product) => [product.slug, product]));
  const guideWithProducts = { ...guide, recommendedProducts: guide.recommendedProductSlugs.map((productSlug) => productsBySlug.get(productSlug)).filter(Boolean) };

  return (
    <main className="bg-white min-h-screen pb-16">
      <PageMeta
        title={guide.seoTitle || `${guide.title} | Kitchen Reviews`}
        description={guide.desc}
      />
      <GuideHeader guide={guideWithProducts} />
      <GuideContent guide={guideWithProducts} />
      <RelatedGuides currentSlug={guide.slug} guides={guidesData} />
      <GuideNewsletter />
    </main>
  );
}
