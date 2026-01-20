import { EditBranchForm } from '@/components/forms/EditForms/EditBranchForm';
import { useLocation } from 'react-router-dom';

export const EditBranchDetails = () => {
  const location = useLocation();
  const branchId = location.pathname.split('/')[2];
  console.log(branchId);
  console.log(location.pathname);
  return <EditBranchForm />;
};
