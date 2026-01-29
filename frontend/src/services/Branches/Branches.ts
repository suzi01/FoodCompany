import { apiClient } from '@/utils/apiClient';
import type { AxiosError } from 'axios';

import { IFormInput } from '@/components/Forms/EditForms/IFormInput';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const searchBranches = async (searchParams?: string) => {
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
      return error?.response?.status !== 500 && retryCount < 3;
    },
  };
};

export const getBranchById = async (branchId: string) => {
  const response = await apiClient.get(`/branches/${branchId}`, {
    responseType: 'json',
  });
  return response.data;
};

export const useGetBranchById = (branchId: string) => {
  return {
    queryFn: () => getBranchById(branchId),
    queryKey: ['/branches', branchId],
    retry: (retryCount: number, error: AxiosError) => {
      return error?.response?.status !== 500 && retryCount < 3;
    },
  };
};

export const updateBranchDetails = async (
  branchId: string,
  data: IFormInput,
) => {
  const response = await apiClient.put(`/branches/${branchId}`, data, {
    responseType: 'json',
  });
  return response.data;
};

export const useUpdateBranchDetails = (branchId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: IFormInput) => updateBranchDetails(branchId, data),
    mutationKey: ['branch-details', branchId],
    onError: (error) => {
      console.log(error);
      // You can add more error handling logic here if needed such as showing a notification
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/branches', branchId] });
      queryClient.invalidateQueries({ queryKey: ['/branches/search'] });
    },
  });
};
