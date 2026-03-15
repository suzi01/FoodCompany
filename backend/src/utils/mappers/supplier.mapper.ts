import { ISupplier } from '../../suppliers/supplier.model';
import { SupplierDto } from '../../suppliers/dtos/supplier.dto';
import { Types } from 'mongoose';

interface SupplierProduct {
  name: string;
}
interface SupplierBranch {
  branchName: string;
}

export const toSupplierResponseDTO = (supplier: ISupplier): SupplierDto => ({
  id: supplier._id.toString(),
  companyName: supplier.companyName,
  mainContactName: supplier.mainContactName,
  address: supplier.address ?? '',
  email: supplier.email,
  phoneNumber: supplier.phoneNumber ?? '',
  status: supplier.status as 'Active' | 'Inactive' | 'Pending',
  products:
    supplier.products?.map((product: Types.ObjectId | SupplierProduct) =>
      typeof product === 'object' && 'name' in product
        ? product.name
        : product.toString(),
    ) ?? [],
  branches:
    supplier.associatedBranches?.map(
      (branch: Types.ObjectId | SupplierBranch) =>
        typeof branch === 'object' && 'branchName' in branch
          ? branch.branchName
          : branch.toString(),
    ) ?? [],
  createdAt: supplier.createdAt.toISOString(),
  updatedAt: supplier.updatedAt.toISOString(),
});
