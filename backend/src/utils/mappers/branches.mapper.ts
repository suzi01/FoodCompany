import { IBranch } from '../../branches/branch.model';
import { BranchDto } from '../../branches/dtos/branch.dto';
import { Types } from 'mongoose';

interface BranchSupplier {
  _id: string;
  companyName: string;
  status: 'Active' | 'Inactive' | 'Pending';
}

export const toBranchesResponseDTO = (branch: IBranch): BranchDto => {
  return {
    id: branch._id.toString(),
    branchName: branch.branchName,
    mainContactName: branch.mainContactName ?? '',
    mainContactPhoneNumber: branch.mainContactPhoneNumber ?? '',
    mainContactEmail: branch.mainContactEmail ?? '',
    branchEmail: branch.branchEmail,
    phoneNumber: branch.phoneNumber ?? '',
    address: branch.address ?? '',
    yearsActive: branch.yearsActive,
    suppliers: branch.suppliers.map(
      (supplier: Types.ObjectId | BranchSupplier) => {
        if (typeof supplier === 'object' && 'companyName' in supplier) {
          return {
            id: supplier._id.toString(),
            companyName: supplier.companyName,
            status: supplier.status,
          };
        }
        return supplier.toString();
      },
    ),
    createdAt: branch.createdAt.toISOString(),
    updatedAt: branch.updatedAt.toISOString(),
  };
};
