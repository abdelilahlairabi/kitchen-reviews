import CollectionsHeader from '../components/collections/CollectionsHeader';
import FeaturedCollection from '../components/collections/FeaturedCollection';
import CollectionsGrid from '../components/collections/CollectionsGrid';
import NewsletterBand from '../components/collections/NewsletterBand';
import { useCollections } from '../hooks/useCollections';

const Collections = () => {
  const { data: collections = [], isPending, isError } = useCollections();

  if (isPending) return <p className="py-16 text-center text-gray-500">Loading collections...</p>;
  if (isError) return <p className="py-16 text-center text-gray-500">We could not load collections right now. Please refresh and try again.</p>;

  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen">
      <CollectionsHeader />
      <FeaturedCollection collection={collections.find((collection) => collection.featured)} />
      <CollectionsGrid collections={collections.filter((collection) => !collection.featured)} />
      <NewsletterBand />
    </div>
  );
};

export default Collections;
