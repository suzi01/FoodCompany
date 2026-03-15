import { CreateSupplier } from '@/models/Supplier';
import { apiClient } from '@/utils/apiClient';
import type { AxiosError } from 'axios';

export const createSupplier = async (supplier: CreateSupplier) => {
  const response = await apiClient.post('suppliers', supplier, {
    responseType: 'json',
  });
  return response.data;
};

export const useCreateSupplier = (supplier: CreateSupplier) => {
  return {
    mutationFn: () => createSupplier(supplier),
    mutationKey: ['/suppliers', supplier],
    onSuccess: () => {
      console.log('Supplier created successfully');
    },
    onError: (error: AxiosError) => {
      console.error('Error creating supplier:', error);
    },
    retry: (retryCount: number, error: AxiosError) => {
      return error?.response?.status !== 500 && retryCount < 2;
    },
  };
};
