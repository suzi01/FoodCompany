import { ISupplier } from '../../suppliers/supplier.model';
import { SupplierDto } from '../../suppliers/dtos/supplier.dto';

export const toSupplierResponseDTO = (supplier: ISupplier): SupplierDto => ({
  id: supplier._id.toString(),
  companyName: supplier.companyName,
  mainContactName: supplier.mainContactName,
  address: supplier.address ?? '',
  email: supplier.email,
  phoneNumber: supplier.phoneNumber ?? '',
  status: supplier.status as 'Active' | 'Inactive' | 'Pending',
  productsProvided: supplier.productsProvided.map((product) =>
    product.toString(),
  ),
  branches: supplier.branches.map((branch) => branch.toString()),
  createdAt: supplier.createdAt.toISOString(),
  updatedAt: supplier.updatedAt.toISOString(),
});
