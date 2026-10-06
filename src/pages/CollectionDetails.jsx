import { useParams } from 'react-router-dom';
import CollectionHero from '../components/collectiondetails/CollectionHero';
import CollectionIntro from '../components/collectiondetails/CollectionIntro';
import CollectionProductGrid from '../components/collectiondetails/CollectionProductGrid';
import RelatedCollections from '../components/collectiondetails/RelatedCollections';
import NewsletterBand from '../components/collections/NewsletterBand';
import { collections, getCollectionBySlug } from '../data/collections';
import { useProductsBySlugs } from '../hooks/useProducts';
import NotFound from './NotFound';
import PageMeta from '../components/PageMeta';

export default function CollectionDetails() {
  const { slug } = useParams();
  const collection = getCollectionBySlug(slug);
  const { data: fetchedProducts = [], isError: productsError } = useProductsBySlugs(collection?.productSlugs || []);

  if (!collection) return <NotFound />;
  const productsBySlug = new Map(fetchedProducts.map((product) => [product.slug, product]));
  const products = collection.productSlugs.map((productSlug) => productsBySlug.get(productSlug)).filter(Boolean);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <PageMeta title={`${collection.name} | Kitchen Reviews`} description={collection.introText || collection.subtitle} />
      <CollectionHero collection={collection} />
      <CollectionIntro collection={collection} />
      <CollectionProductGrid products={products} isError={productsError} />
      <RelatedCollections currentSlug={collection.slug} collections={collections} />
      <NewsletterBand />
    </main>
  );
}
