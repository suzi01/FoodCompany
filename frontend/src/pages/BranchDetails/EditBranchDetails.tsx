import CompanyIcon from '@/assets/icons/ApprovedDelivery.png';
import AddSupplier from '@/assets/icons/Store.png';
import { Accordion } from '@/components/common/Accordion';
import { ButtonLink } from '@/components/common/ButtonLink';
import { Image } from '@/components/common/Image';
import { EditBranchSupplier } from '@/components/Forms/EditBranchSupplier/EditBranchSupplier';
import { EditBranchForm } from '@/components/Forms/EditForms/EditBranchForm';
import { IFormInput } from '@/components/Forms/EditForms/IFormInput';
import {
  useGetBranchById,
  useUpdateBranchDetails,
} from '@/services/Branches/Branches';
import { Loader } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

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
          <div className="flex-1">
            <EditBranchForm
              branch={branch?.data}
              onSubmit={handleUpdateBranchDetails}
            />
          </div>

          <div className="w-[55%]">
            {branch?.data?.suppliers.length > 0 && (
              <Accordion
                headerContent={
                  <div className="flex gap-3 items-center ">
                    <Image
                      src={CompanyIcon}
                      alt="Company"
                      width={30}
                      height={30}
                    />
                    <div className="block">
                      <p className="font-bold">
                        {branch?.data?.suppliers[0].companyName}
                      </p>
                    </div>
                  </div>
                }
                isOpen={isOpen}
                onClick={() => setIsOpen(!isOpen)}
                status="active"
                // TODO: Need to update backend so that call can be made to get supplier products used and unused by branch
                content={
                  <EditBranchSupplier
                    handleSubmit={() => {}}
                    supplier={branch?.data?.suppliers[0]}
                  />
                }
              />
            )}
            <div className="w-full border-2 border-dashed flex flex-col items-center mt-4 rounded-md p-8 bg-gray-100">
              <Image src={AddSupplier} alt="Company" width={30} height={30} />
              <div className="w-1/2 flex flex-col text-center gap-4 mt-4">
                <p className="font-semibold">Add another supplier?</p>
                <p>
                  Connecting more suppliers allows for redundant resourcing and
                  better price competition.
                </p>
                <ButtonLink to="/branches/add-supplier" className="mt-4">
                  Add a new supplier
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
