import { useInfiniteQuery, useQuery, useMutation } from '@tanstack/react-query';
import http from '../http.js';

export const useGetCategoriesQuery = () => {
  return useQuery({
    queryKey: ['category'],
    queryFn: async () => {
      const res = await http.get('/categories');
      return res.data;
    },
  });
};
export const useGetContributionsQuery = ({ category, month, year, limit }) => {
  const params = {};
  if (category) params.category = category;
  if (month) params.month = month;
  if (year) params.year = year;
  return useInfiniteQuery({
    queryKey: ['contributions', category, month, year, limit],
    queryFn: async ({ pageParam }) => {
      const res = await http.get('/contributions', {
        params: { ...params, page: pageParam, limit },
      });
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.next,
  });
};
export const useAddCollectionMutation = () => {
  return useMutation({
    mutationFn: (payload) => {
      return http.post('/contributions', payload);
    },
  });
};
export const useGetOverview = () => {
  return useQuery({
    queryKey: ['overviews'],
    queryFn: async () => {
      const res = await http.get('/contributions/overview');
      return res.data;
    },
  });
};