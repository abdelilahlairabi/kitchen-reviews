import CollectionsHeader from '../components/collections/CollectionsHeader';
import FeaturedCollection from '../components/collections/FeaturedCollection';
import CollectionsGrid from '../components/collections/CollectionsGrid';
import NewsletterBand from '../components/collections/NewsletterBand';
import { getFeaturedCollection, getRegularCollections } from '../data/collections';
import PageMeta from '../components/PageMeta';

const Collections = () => {
  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen">
      <PageMeta
        title="Kitchen Product Collections for Every Home | Kitchen Reviews"
        description="Browse curated kitchen product collections for small spaces, farmhouse kitchens, coffee corners, budget updates, and more."
      />
      <CollectionsHeader />
      <FeaturedCollection collection={getFeaturedCollection()} />
      <CollectionsGrid collections={getRegularCollections()} />
      <NewsletterBand />
    </div>
  );
};

export default Collections;
