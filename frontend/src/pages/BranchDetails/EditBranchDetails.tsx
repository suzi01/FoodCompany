import { EditBranchForm } from '@/components/Forms/EditForms/EditBranchForm';
import {
  useGetBranchById,
  useUpdateBranchDetails,
} from '@/services/Branches/Branches';
import { Accordion } from '@/components/common/Accordion';
import { useState } from 'react';
import { ButtonLink } from '@/components/common/ButtonLink';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Loader } from '@mantine/core';
import { IFormInput } from '@/components/Forms/EditForms/IFormInput';
import { C } from 'vitest/dist/chunks/reporters.d.BFLkQcL6';

export const EditBranchDetails = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
        <div className="flex gap-10">
          <div className="w-1/3">
          <EditBranchForm
            branch={branch?.data}
            onSubmit={handleUpdateBranchDetails}
          />
          </div>
          <div className="w-2/3">
            <Accordion isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
            <ButtonLink to="/branches/add-supplier" className="mt-4">
              <button
                type="button"
                form="edit-supplier"
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
              >
                Add supplier
              </button>
            </ButtonLink>
          </div>
        </div>
      )}
    </>
  );
};
