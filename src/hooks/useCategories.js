import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../services/categories';

export const categoryKeys = {
  all: ['categories'],
};

export const useCategories = () => useQuery({
  queryKey: categoryKeys.all,
  queryFn: fetchCategories,
  staleTime: 60 * 60 * 1000,
});
