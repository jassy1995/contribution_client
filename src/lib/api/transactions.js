import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import http from '../http.js';

export const useGetTransactionsQuery = ({ type, month, year, limit }) => {
  const params = {};
  if (type && type !== 'all') params.type = type;
  if (month) params.month = month;
  if (year) params.year = year;
  return useInfiniteQuery({
    queryKey: ['transactions', type, month, year, limit],
    queryFn: async ({ pageParam }) => {
      const res = await http.get('/transactions', {
        params: { ...params, page: pageParam, limit },
      });
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.next,
  });
};

export const useAddTransactionMutation = () => {
  return useMutation({
    mutationFn: (payload) => {
      return http.post('/transactions', payload);
    },
  });
};
