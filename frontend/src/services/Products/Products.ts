import { apiClient } from '@/utils/apiClient';
import type { AxiosError } from 'axios';

import { keepPreviousData } from '@tanstack/react-query';
import { useMemo } from 'react';

export const searchProducts = async (searchParams?: string) => {
  const response = await apiClient.get(`/products/search${searchParams}`, {
    responseType: 'json',
  });
  return response.data;
};

export const useSearchProducts = (searchParams?: string) => {
  return useMemo(() => {
    return {
      queryFn: () => searchProducts(searchParams),
      queryKey: ['/products/search', searchParams],
      placeholderData: keepPreviousData,
      retry: (retryCount: number, error: AxiosError) => {
        return error?.response?.status !== 500 && retryCount < 3;
      },
    };
  }, [searchParams]);
};
