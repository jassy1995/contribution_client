import { useMutation, useQuery } from '@tanstack/react-query';
import http from '../http.js';

export const useGetProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => http.get('/auth/profile'),
    enabled: false,
    retry: false,
  });
};
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: ({ phone, password }) => {
      return http.post('/auth/login/phone', { phone, password }, { intercept: false });
    },
  });
};
export const useAddUserMutation = () => {
  return useMutation({
    mutationFn: (data) => {
      return http.post('/auth/signup/phone', data);
    },
  });
};
