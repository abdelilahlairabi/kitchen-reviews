import GuidesHeader from '../components/guides/GuidesHeader';
import FeaturedGuide from '../components/guides/FeaturedGuide';
import GuidesGrid from '../components/guides/GuidesGrid';
import GuidesNewsletter from '../components/guides/GuidesNewsletter';
import { guidesData } from '../data/guides';
import PageMeta from '../components/PageMeta';

const Guides = () => {
  const featuredGuide = guidesData.find((guide) => guide.slug === 'choosing-a-kitchen-faucet') || guidesData[0];

  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen">
      <PageMeta
        title="Kitchen Buying Guides and How-To Advice | Kitchen Reviews"
        description="Read practical kitchen buying guides and how-to advice on faucets, sinks, cookware, appliances, knives, and everyday kitchen care."
      />
      <GuidesHeader />
      <FeaturedGuide guide={featuredGuide} />
      <GuidesGrid guides={guidesData} />
      <GuidesNewsletter />
    </div>
  );
};

export default Guides;
