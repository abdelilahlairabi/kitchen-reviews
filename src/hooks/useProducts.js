import { useQuery } from '@tanstack/react-query';
import { fetchProductBySlug, fetchProducts } from '../services/products';

export const productKeys = {
  all: ['products'],
  lists: () => [...productKeys.all, 'list'],
  list: (filters) => [...productKeys.lists(), filters],
  details: () => [...productKeys.all, 'detail'],
  detail: (slug) => [...productKeys.details(), slug],
};

export const useProducts = (filters, options = {}) => useQuery({
  queryKey: productKeys.list(filters),
  queryFn: () => fetchProducts(filters),
  placeholderData: (previousData) => previousData,
  enabled: options.enabled ?? true,
});

export const useProduct = (slug) => useQuery({
  queryKey: productKeys.detail(slug),
  queryFn: () => fetchProductBySlug(slug),
  enabled: Boolean(slug),
});
