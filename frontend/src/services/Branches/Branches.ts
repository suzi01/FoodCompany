import type { AxiosError } from 'axios';
import { apiClient } from '@/utils/apiClient';

export const searchBranches = async (searchParams?: string) => {
  console.log('Fetching branches with search params:', searchParams);
  const response = await apiClient.get(`/branches/search${searchParams}`, {
    responseType: 'json',
  });
  return response.data;
};

export const useSearchBranches = (searchParams?: string) => {
  return {
    queryFn: () => searchBranches(searchParams),
    queryKey: ['/branches/search', searchParams],
    retry: (retryCount: number, error: AxiosError) => {
      return error?.response?.status !== 401 && retryCount < 5;
    },
  };
};
