import { EditBranchForm } from '@/components/forms/EditForms/EditBranchForm';
import { Accordion } from '@/components/common/Accordion';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { ButtonLink } from '@/components/common/ButtonLink';

export const EditBranchDetails = () => {
  const location = useLocation();
  const branchId = location.pathname.split('/')[2];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  console.log(branchId);
  console.log(location.pathname);

  return (
    <div className="flex gap-10">
      <div className="w-1/3">
        <EditBranchForm />
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
  );
};
