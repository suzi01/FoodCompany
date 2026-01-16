import Router from 'express';
import { validateSchema } from '../middlewares/validate-schema.middleware';
import { createSupplierSchema } from './dtos/create-supplier.dto';
import {
  createSupplier,
  deleteSupplier,
  getAllSuppliers,
  getSupplier,
  searchSuppliers,
  updateSupplier,
} from './supplier.controller';

const supplierRouter = Router();

supplierRouter
  .route('/')
  .post(validateSchema(createSupplierSchema), createSupplier)
  .get(getAllSuppliers);

supplierRouter.get('/search', searchSuppliers);

supplierRouter
  .route('/:id')
  .get(getSupplier)
  .delete(deleteSupplier)
  .put(updateSupplier);

export default supplierRouter;
