import Router from 'express';
import {
  createSupplier,
  deleteSupplier,
  getAllSuppliers,
  getSupplier,
  searchSuppliers,
  updateSupplier,
} from './supplier.controller';
import { createSupplierSchema } from './dtos/create-supplier.dto';
import { validateSchema } from '../middlewares/validate-schema.middleware';

const supplierRouter = Router();

supplierRouter.post('/', validateSchema(createSupplierSchema), createSupplier);
supplierRouter.get('/', getAllSuppliers);
supplierRouter.get('/search', searchSuppliers);
supplierRouter.get('/:id', getSupplier);
supplierRouter.delete('/:id', deleteSupplier);
supplierRouter.put('/:id', updateSupplier);

export default supplierRouter;
