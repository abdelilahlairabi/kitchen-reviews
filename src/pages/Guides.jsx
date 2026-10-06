import { useState } from 'react';
import GuidesHeader from '../components/guides/GuidesHeader';
import FeaturedGuide from '../components/guides/FeaturedGuide';
import GuidesGrid from '../components/guides/GuidesGrid';
import GuidesNewsletter from '../components/guides/GuidesNewsletter';
import { guidesData } from '../data/guides';
import PageMeta from '../components/PageMeta';

const Guides = () => {
  const [activeCategory, setActiveCategory] = useState('All Guides');
  const [search, setSearch] = useState('');
  const featuredGuide = guidesData.find((guide) => guide.slug === 'choosing-a-kitchen-faucet') || guidesData[0];
  const normalizedSearch = search.trim().toLowerCase();
  const filteredGuides = guidesData.filter((guide) => {
    const matchesCategory = activeCategory === 'All Guides' || guide.badge === activeCategory;
    const matchesSearch = !normalizedSearch || `${guide.title} ${guide.desc} ${guide.badge}`.toLowerCase().includes(normalizedSearch);
    return matchesCategory && matchesSearch;
  });
  const showFeatured = activeCategory === 'All Guides' && !normalizedSearch;
  const gridGuides = showFeatured
    ? filteredGuides.filter((guide) => guide.slug !== featuredGuide.slug)
    : filteredGuides;

  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen">
      <PageMeta
        title="Kitchen Buying Guides and How-To Advice | KitchenTrusted"
        description="Read practical kitchen buying guides and how-to advice on faucets, sinks, cookware, appliances, knives, and everyday kitchen care."
      />
      <GuidesHeader
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        search={search}
        onSearchChange={setSearch}
        resultCount={filteredGuides.length}
      />
      {showFeatured && <FeaturedGuide guide={featuredGuide} />}
      <GuidesGrid guides={gridGuides} />
      <GuidesNewsletter />
    </div>
  );
};

export default Guides;
