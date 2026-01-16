import { Router } from 'express';
import { validateSchema } from '../middlewares/validate-schema.middleware';
import {
  createBranch,
  deleteBranch,
  getAllBranches,
  getBranch,
  searchBranches,
  updateBranch,
} from './branches.controller';
import { createBranchSchema } from './dtos/create-branch.dto';
import { editBranchSchema } from './dtos/edit-branch.dto';

const branchRouter = Router();

branchRouter
  .route('/')
  .post(validateSchema(createBranchSchema), createBranch)
  .get(getAllBranches);

branchRouter.get('/search', searchBranches);

branchRouter
  .route('/:id')
  .get(getBranch)
  .put(validateSchema(editBranchSchema), updateBranch)
  .delete(deleteBranch);

export default branchRouter;
