import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import http from '../http.js';

export const useGetUsersQuery = ({ search, page, limit, role, category }) => {
  return useQuery({
    queryKey: ['users', search, role, category, page, limit],
    queryFn: async () => {
      const res = await http.get('/users', {
        params: { search, page, limit, role, category },
      });
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};
export const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: ({ id, data }) => {
      return http.patch(`/admin/users/${id}`, data);
    },
  });
};