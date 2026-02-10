import { FilterQuery } from 'mongoose';
import Branch from './branch.model';
import { CreateBranchDto } from './dtos/create-branch.dto';
import { EditBranchDto } from './dtos/edit-branch.dto';
import { Types } from 'mongoose';
import Supplier from '../suppliers/supplier.model';

import { BranchSearchParams } from '../types/SearchParams/BranchSearchParams';

export const getAllBranches = async () => {
  return await Branch.find().populate('suppliers', 'companyName -_id');
};

export const getBranch = async (id: string) => {
  return await Branch.findById(id).populate(
    'suppliers',
    'companyName status id',
  );
};

export const searchBranches = async (
  branchName: string,
  branchEmail: string,
  contactName: string,
  supplierName: string,
  sort: string,
  order: string,
) => {
  const query: FilterQuery<BranchSearchParams> = {};

  query.branchName = { $regex: branchName, $options: 'i' };

  if (branchEmail !== '')
    query.branchEmail = { $regex: branchEmail, $options: 'i' };

  if (supplierName !== '')
    query.supplierName = { $regex: supplierName, $options: 'i' };
  if (contactName !== '')
    query.mainContactName = { $regex: contactName, $options: 'i' };

  return await Branch.find(query)
    .populate('suppliers', 'companyName -_id')
    .sort({ [sort]: order === 'asc' ? 1 : -1 });
};

export const createBranch = async (data: CreateBranchDto) => {
  const branchData = {
    ...data,
    suppliers: (data.suppliers || [])
      .filter((id) => Types.ObjectId.isValid(id))
      .map((id) => new Types.ObjectId(id)),
  };

  const newBranch = await Branch.create(branchData);

  // Add branchId to all suppliers
  if (newBranch.suppliers && newBranch.suppliers.length > 0) {
    await Supplier.updateMany(
      { _id: { $in: newBranch.suppliers } },
      { $addToSet: { branches: newBranch._id } }, // $addToSet prevents duplicates
    );
  }

  return newBranch;
};

export const updateBranch = async (id: string, data: EditBranchDto) => {
  return await Branch.findByIdAndUpdate(id, data, { new: true });
};

export const deleteBranch = async (id: string) => {
  return await Branch.findByIdAndDelete(id);
};

// export function addSupplierToBranch(branchId: string, supplierId: string) {

// }
