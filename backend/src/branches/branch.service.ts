import { FilterQuery } from 'mongoose';
import Branch, { IBranch } from './branch.model';
import { CreateBranchDto } from './dtos/create-branch.dto';
import { EditBranchDto } from './dtos/edit-branch.dto';

import { BranchSearchParams } from '../types/SearchParams/BranchSearchParams';

export const getAllBranches = async () => {
  return Branch.find();
};

export const getBranch = async (id: string) => {
  return Branch.findById(id);
};

export const searchBranches = async (
  branchName: string,
  email: string,
  supplierName: string,
  sort: string,
  order: string,
) => {
  const query: FilterQuery<BranchSearchParams> = {};
  query.branchName = { $regex: branchName, $options: 'i' };

  if (email !== '') query.branchEmail = { $regex: email, $options: 'i' };

  if (supplierName !== '')
    query.supplierName = { $regex: supplierName, $options: 'i' };

  return Branch.find(query).sort({ [sort]: order === 'asc' ? 1 : -1 });
};

export const createBranch = async (data: CreateBranchDto) => {
  return Branch.create(data);
};

export const updateBranch = async (id: string, data: EditBranchDto) => {
  return Branch.findByIdAndUpdate(id, data, { new: true });
};

export const deleteBranch = async (id: string) => {
  return Branch.findByIdAndDelete(id);
};
