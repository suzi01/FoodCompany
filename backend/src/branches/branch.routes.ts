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

branchRouter.post('/', validateSchema(createBranchSchema), createBranch);
branchRouter.get('/', getAllBranches);
branchRouter.get('/search', searchBranches);
branchRouter.get('/:id', getBranch);
branchRouter.put('/:id', validateSchema(editBranchSchema), updateBranch);
branchRouter.delete('/:id', deleteBranch);

export default branchRouter;
