import { FilterQuery } from 'mongoose';
import Branch from './branch.model';
import { CreateBranchDto } from './dtos/create-branch.dto';
import { EditBranchDto } from './dtos/edit-branch.dto';

import { BranchSearchParams } from '../types/SearchParams/BranchSearchParams';

export const getAllBranches = async () => {
  return await Branch.find();
};

export const getBranch = async (id: string) => {
  return await Branch.findById(id);
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

  console.log('Constructed Query:', query);

  return await Branch.find(query).sort({ [sort]: order === 'asc' ? 1 : -1 });
};

export const createBranch = async (data: CreateBranchDto) => {
  return await Branch.create(data);
};

export const updateBranch = async (id: string, data: EditBranchDto) => {
  return await Branch.findByIdAndUpdate(id, data, { new: true });
};

export const deleteBranch = async (id: string) => {
  return await Branch.findByIdAndDelete(id);
};
