import { useParams } from 'react-router-dom';
import CollectionHero from '../components/collectiondetails/CollectionHero';
import CollectionIntro from '../components/collectiondetails/CollectionIntro';
import CollectionProductGrid from '../components/collectiondetails/CollectionProductGrid';
import RelatedCollections from '../components/collectiondetails/RelatedCollections';
import NewsletterBand from '../components/collectiondetails/NewsletterBand';
import { useCollection, useCollections } from '../hooks/useCollections';
import NotFound from './NotFound';

export default function CollectionDetails() {
  const { slug } = useParams();
  const { data: collection, isPending, isError } = useCollection(slug);
  const { data: collections = [] } = useCollections();

  if (isPending) return <p className="py-16 text-center text-gray-500">Loading collection...</p>;
  if (isError) return <p className="py-16 text-center text-gray-500">We could not load this collection right now. Please refresh and try again.</p>;
  if (!collection) return <NotFound />;

  return <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"><CollectionHero collection={collection} /><CollectionIntro text={collection.introText} /><CollectionProductGrid products={collection.products} /><RelatedCollections currentSlug={collection.slug} collections={collections} /><NewsletterBand /></main>;
}
