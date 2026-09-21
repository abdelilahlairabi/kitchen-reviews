import { useQuery } from '@tanstack/react-query';
import { fetchGuideBySlug, fetchGuides } from '../services/guides';

export const guideKeys = {
  all: ['guides'],
  lists: () => [...guideKeys.all, 'list'],
  details: () => [...guideKeys.all, 'detail'],
  detail: (slug) => [...guideKeys.details(), slug],
};

export const useGuides = () => useQuery({
  queryKey: guideKeys.lists(),
  queryFn: fetchGuides,
  staleTime: 60 * 60 * 1000,
});

export const useGuide = (slug) => useQuery({
  queryKey: guideKeys.detail(slug),
  queryFn: () => fetchGuideBySlug(slug),
  enabled: Boolean(slug),
});
