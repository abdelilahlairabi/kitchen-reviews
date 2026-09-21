import { useQuery } from '@tanstack/react-query';
import { fetchStyleBySlug, fetchStyles } from '../services/styles';

export const styleKeys = {
  all: ['inspiration-styles'],
  lists: () => [...styleKeys.all, 'list'],
  details: () => [...styleKeys.all, 'detail'],
  detail: (slug) => [...styleKeys.details(), slug],
};

export const useStyles = () => useQuery({
  queryKey: styleKeys.lists(),
  queryFn: fetchStyles,
  staleTime: 60 * 60 * 1000,
});

export const useStyle = (slug) => useQuery({
  queryKey: styleKeys.detail(slug),
  queryFn: () => fetchStyleBySlug(slug),
  enabled: Boolean(slug),
});
