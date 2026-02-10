import { IBranch } from '../../branches/branch.model';
import { BranchDto, BranchesDto } from '../../branches/dtos/branch.dto';
import { Types } from 'mongoose';

interface BranchSupplier extends BranchesSupplier {
  _id: string;
  status: 'Active' | 'Inactive' | 'Pending';
}

interface BranchesSupplier {
  companyName: string;
}

interface toBranchResponseDTO {
  branch: IBranch;
  mode: 'single' | 'multiple';
}

export const toBranchResponseDTO = ({
  branch,
  mode,
}: toBranchResponseDTO): BranchesDto => {
  const baseBranch = {
    id: branch._id.toString(),
    branchName: branch.branchName,
    mainContactName: branch.mainContactName,
    mainContactPhoneNumber: branch.mainContactPhoneNumber,
    mainContactEmail: branch.mainContactEmail,
    branchEmail: branch.branchEmail,
    phoneNumber: branch.phoneNumber,
    address: branch.address,
    yearsActive: branch.yearsActive,
    inventory: branch.inventory.map((item) => ({
      product: item.product.toString(),
      quantity: item.quantity,
      lastRestocked: item.lastRestocked.toISOString(),
    })),
    createdAt: branch.createdAt.toISOString(),
    updatedAt: branch.updatedAt.toISOString(),
  };

  if (mode === 'single') {
    return {
      ...baseBranch,
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
    };
  }

  return {
    ...baseBranch,
    suppliers: branch.suppliers.map(
      (supplier: Types.ObjectId | BranchesSupplier) => {
        if (typeof supplier === 'object' && 'companyName' in supplier) {
          return supplier.companyName;
        }
        return supplier.toString();
      },
    ),
  } as BranchesDto;
};
