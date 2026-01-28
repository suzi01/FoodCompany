import { EditBranchForm } from '@/components/Forms/EditForms/EditBranchForm';
import {
  useGetBranchById,
  useUpdateBranchDetails,
} from '@/services/Branches/Branches';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Loader } from '@mantine/core';
import { IFormInput } from '@/components/Forms/EditForms/IFormInput';

export const EditBranchDetails = () => {
  const params = useParams();

  const {
    data: branch,
    isLoading,
    isError,
    isSuccess,
  } = useQuery(useGetBranchById(params.id || ''));

  const { mutate: mutateBranchDetails } = useUpdateBranchDetails(
    params.id || '',
  );

  const handleUpdateBranchDetails = (
    data: IFormInput,
    event?: React.BaseSyntheticEvent,
  ) => {
    event?.preventDefault();
    mutateBranchDetails(data);
  };

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <Loader color="cyan" type="bars" />
        </div>
      )}
      {isError && <p>Error loading branch details.</p>}

      {isSuccess && (
        <EditBranchForm
          branch={branch?.data}
          onSubmit={handleUpdateBranchDetails}
        />
      )}
    </>
  );
};
