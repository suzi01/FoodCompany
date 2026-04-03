import { HttpError } from '../utils/app-error';
import { catchAsync } from '../utils/catch-async';
import { toBranchResponseDTO } from '../utils/mappers/branches.mapper';
import * as branchService from './branch.service';
import { Logger as logger } from '../utils/logger';
import { pageAndLimitValidation } from '../utils/pageAndLimitValidation';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../constants';

export const getAllBranches = catchAsync(async (req, res, next) => {
  logger.info('Fetching all branches');
  const page = parseInt(req.query.page as string) || DEFAULT_PAGE;
  const limit = parseInt(req.query.limit as string) || DEFAULT_LIMIT;

  pageAndLimitValidation(page, limit);

  const { branches, totalDocuments } = await branchService.getAllBranches(
    page,
    limit,
  );
  const mappedBranches = branches.map((branch) =>
    toBranchResponseDTO({ branch, mode: 'multiple' }),
  );

  logger.info(
    `Fetched page ${page} with ${mappedBranches.length} branches successfully`,
  );

  res.status(200).json({
    success: true,
    page,
    limit,
    totalDocuments,
    totalPages: Math.ceil(totalDocuments / limit),
    data: mappedBranches,
  });
});

export const getBranch = catchAsync(async (req, res, next) => {
  logger.info(`Fetching branch with ID: ${req.params.id}`);
  const branch = await branchService.getBranch(req.params.id as string);
  if (!branch) {
    logger.warn(`No branch found with ID: ${req.params.id}`);
    return next(
      new HttpError(404, `Branch with ID ${req.params.id} not found`),
    );
  }

  const mappedBranch = toBranchResponseDTO({ branch, mode: 'single' });
  logger.info(`Fetched branch with ID: ${req.params.id} successfully`);
  res.status(200).json({ success: true, data: mappedBranch });
});

export const searchBranches = catchAsync(async (req, res, next) => {
  logger.info(`Searching branches with query:`, req.query);
  const page = parseInt(req.query.page as string) || DEFAULT_PAGE;

  pageAndLimitValidation(page, DEFAULT_LIMIT);

  const { branchName, branchEmail, contactName, supplierName, sort, order } =
    req.query;

  const { branches, totalDocuments } = await branchService.searchBranches(
    typeof branchName === 'string' ? branchName : '',
    typeof branchEmail === 'string' ? branchEmail : '',
    typeof contactName === 'string' ? contactName : '',
    typeof supplierName === 'string' ? supplierName : '',
    typeof sort === 'string' ? sort : 'BranchName',
    typeof order === 'string' ? order : 'asc',
    page,
    DEFAULT_LIMIT,
  );

  const mappedBranches = branches.map((branch) =>
    toBranchResponseDTO({ branch, mode: 'multiple' }),
  );

  logger.info(`Fetched ${mappedBranches.length} branches successfully`);
  res.status(200).json({
    success: true,
    page,
    limit: DEFAULT_LIMIT,
    totalDocuments,
    totalPages: Math.ceil(totalDocuments / DEFAULT_LIMIT),
    data: mappedBranches,
  });
});

export const updateBranch = catchAsync(async (req, res, next) => {
  logger.info(`Updating branch with ID: ${req.params.id} and data:`, req.body);
  const updateBranch = await branchService.updateBranch(
    req.params.id as string,
    req.body,
  );
  if (!updateBranch) {
    logger.warn(`No branch found with ID: ${req.params.id}`);
    return next(new HttpError(404, 'Branch not found'));
  }

  const mappedBranch = toBranchResponseDTO({
    branch: updateBranch,
    mode: 'single',
  });
  logger.info(`Branch with ID: ${req.params.id} updated successfully`);
  res.status(200).json({ success: true, data: mappedBranch });
});

export const createBranch = catchAsync(async (req, res, next) => {
  logger.info(`Creating new branch with data:`, req.body);
  const newBranch = await branchService.createBranch(req.body);

  const mappedBranch = toBranchResponseDTO({
    branch: newBranch,
    mode: 'single',
  });
  logger.info(`Branch created successfully with ID: ${newBranch._id}`);
  res.status(201).json({ success: true, data: mappedBranch });
});

export const deleteBranch = catchAsync(async (req, res, next) => {
  logger.info(`Deleting branch with ID: ${req.params.id}`);
  const deleteBranch = await branchService.deleteBranch(
    req.params.id as string,
  );
  if (!deleteBranch) {
    logger.warn(`No branch found to delete with ID: ${req.params.id}`);
    return next(
      new HttpError(404, `Branch with ID ${req.params.id} not found`),
    );
  }
  logger.info(`Branch with ID: ${req.params.id} deleted successfully`);
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
//   logger.info(`Added supplier with ID: ${supplierId} to branch with ID: ${branchId}`);
//   res.status(200).json({ success: true, data: mappedBranch });
// });
