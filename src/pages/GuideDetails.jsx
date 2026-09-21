import { useParams } from 'react-router-dom';
import { useGuide, useGuides } from '../hooks/useGuides';

import GuideHeader from '../components/guidedetails/GuideHeader';
import GuideContent from '../components/guidedetails/GuideContent';
import RelatedGuides from '../components/guidedetails/RelatedGuides';
import GuideNewsletter from '../components/guidedetails/GuideNewsletter';
import NotFound from './NotFound';

export default function GuideDetails() {
  const { slug } = useParams();
  const { data: guide, isLoading, isError } = useGuide(slug);
  const { data: guides = [] } = useGuides();

  if (isLoading) return <main className="min-h-screen bg-white p-8 text-center text-gray-600">Loading guide…</main>;
  if (isError) return <main className="min-h-screen bg-white p-8 text-center text-gray-600">Unable to load this guide. Please try again.</main>;
  if (!guide) return <NotFound />;

  return (
    <main className="bg-white min-h-screen pb-16">
      <GuideHeader guide={guide} />
      <GuideContent guide={guide} />
      <RelatedGuides currentSlug={guide.slug} guides={guides} />
      <GuideNewsletter />
    </main>
  );
}
