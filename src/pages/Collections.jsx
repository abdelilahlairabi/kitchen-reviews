import { useState } from 'react';
import CollectionsHeader from '../components/collections/CollectionsHeader';
import FeaturedCollection from '../components/collections/FeaturedCollection';
import CollectionsGrid from '../components/collections/CollectionsGrid';
import NewsletterBand from '../components/collections/NewsletterBand';
import { getFeaturedCollection, getRegularCollections } from '../data/collections';
import PageMeta from '../components/PageMeta';

const Collections = () => {
  const [search, setSearch] = useState('');
  const normalizedSearch = search.trim().toLowerCase();
  const featuredCollection = getFeaturedCollection();
  const allCollections = [featuredCollection, ...getRegularCollections()].filter(Boolean);
  const filteredCollections = allCollections.filter((collection) =>
    `${collection.name} ${collection.subtitle} ${collection.introText}`.toLowerCase().includes(normalizedSearch)
  );
  const showFeatured = !normalizedSearch && Boolean(featuredCollection);
  const visibleCollections = showFeatured
    ? filteredCollections.filter((collection) => collection.slug !== featuredCollection.slug)
    : filteredCollections;

  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen">
      <PageMeta
        title="Kitchen Product Collections for Every Home | KitchenTrusted"
        description="Browse curated kitchen product collections for small spaces, farmhouse kitchens, coffee corners, budget updates, and more."
      />
      <CollectionsHeader search={search} onSearchChange={setSearch} resultCount={filteredCollections.length} />
      {showFeatured && <FeaturedCollection collection={featuredCollection} />}
      <CollectionsGrid collections={visibleCollections} />
      <NewsletterBand />
    </div>
  );
};

export default Collections;
