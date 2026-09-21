import GuidesHeader from '../components/guides/GuidesHeader';
import FeaturedGuide from '../components/guides/FeaturedGuide';
import GuidesGrid from '../components/guides/GuidesGrid';
import GuidesNewsletter from '../components/guides/GuidesNewsletter';
import { useGuides } from '../hooks/useGuides';

const Guides = () => {
  const { data: guides = [], isLoading, isError } = useGuides();
  const featuredGuide = guides.find((guide) => guide.slug === 'choosing-a-kitchen-faucet') || guides[0];

  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen">
      <GuidesHeader />
      <FeaturedGuide guide={featuredGuide} isLoading={isLoading} />
      <GuidesGrid guides={guides} isLoading={isLoading} isError={isError} />
      <GuidesNewsletter />
    </div>
  );
};

export default Guides;
