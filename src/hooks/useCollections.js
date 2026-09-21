import { useQuery } from '@tanstack/react-query';
import { fetchCollectionBySlug, fetchCollections } from '../services/collections';

export const collectionKeys = {
  all: ['collections'],
  lists: () => [...collectionKeys.all, 'list'],
  details: () => [...collectionKeys.all, 'detail'],
  detail: (slug) => [...collectionKeys.details(), slug],
};

export const useCollections = () => useQuery({
  queryKey: collectionKeys.lists(),
  queryFn: fetchCollections,
  staleTime: 60 * 60 * 1000,
});

export const useCollection = (slug) => useQuery({
  queryKey: collectionKeys.detail(slug),
  queryFn: () => fetchCollectionBySlug(slug),
  enabled: Boolean(slug),
});
