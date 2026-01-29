import { HttpError } from '../utils/app-error';
import { catchAsync } from '../utils/catch-async';
import { toBranchesResponseDTO } from '../utils/mappers/branches.mapper';
import * as branchService from './branch.service';

export const getAllBranches = catchAsync(async (req, res, next) => {
  const branches = await branchService.getAllBranches();
  const mappedBranches = branches.map(toBranchesResponseDTO);

  res.status(200).json({ success: true, data: mappedBranches });
});

export const getBranch = catchAsync(async (req, res, next) => {
  const branch = await branchService.getBranch(req.params.id as string);
  if (!branch) {
    return next(
      new HttpError(404, `Branch with ID ${req.params.id} not found`),
    );
  }

  const mappedBranch = toBranchesResponseDTO(branch);
  res.status(200).json({ success: true, data: mappedBranch });
});

export const searchBranches = catchAsync(async (req, res, next) => {
  const { branchName, branchEmail, contactName, supplierName, sort, order } =
    req.query;

  const branches = await branchService.searchBranches(
    typeof branchName === 'string' ? branchName : '',
    typeof branchEmail === 'string' ? branchEmail : '',
    typeof contactName === 'string' ? contactName : '',
    typeof supplierName === 'string' ? supplierName : '',
    typeof sort === 'string' ? sort : 'BranchName',
    typeof order === 'string' ? order : 'asc',
  );
  const mappedBranches = branches.map(toBranchesResponseDTO);
  res.status(200).json({ success: true, data: mappedBranches });
});

export const updateBranch = catchAsync(async (req, res, next) => {
  const updateBranch = await branchService.updateBranch(
    req.params.id as string,
    req.body,
  );
  if (!updateBranch) {
    return next(new HttpError(404, 'Branch not found'));
  }

  const mappedBranch = toBranchesResponseDTO(updateBranch);
  res.status(200).json({ success: true, data: mappedBranch });
});

export const createBranch = catchAsync(async (req, res, next) => {
  const newBranch = await branchService.createBranch(req.body);

  const mappedBranch = toBranchesResponseDTO(newBranch);
  res.status(201).json({ success: true, data: mappedBranch });
});

export const deleteBranch = catchAsync(async (req, res, next) => {
  const deleteBranch = await branchService.deleteBranch(
    req.params.id as string,
  );
  if (!deleteBranch) {
    return next(
      new HttpError(404, `Branch with ID ${req.params.id} not found`),
    );
  }
  res
    .status(200)
    .json({ success: true, message: 'Branch deleted successfully' });
});

// export const addSupplierToBranch = catchAsync(async (req, res, next) => {
//   const { branchId, supplierId } = req.params;

//   const updatedBranch = await branchService.addSupplierToBranch(
//     branchId as string,
//     supplierId as string,
//   );

//   if (!updatedBranch) {
//     return next(
//       new HttpError(404, `Branch with ID ${branchId} not found`),
//     );
//   }

//   const mappedBranch = toBranchesResponseDTO(updatedBranch);
//   res.status(200).json({ success: true, data: mappedBranch });
// });
