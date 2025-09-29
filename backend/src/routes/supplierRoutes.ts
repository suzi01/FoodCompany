import Router from 'express';
import {
  createSupplier,
  deleteSupplier,
  getAllSuppliers,
  getSupplier,
  searchSuppliers,
  updateSupplier,
} from '../controllers/supplier.controller';
import { createSupplierSchema } from '../dtos/createSupplier.dto';
import { validateSchema } from '../middlewares/validateSchema';

const supplierRouter = Router();

supplierRouter.post('/', validateSchema(createSupplierSchema), createSupplier);
supplierRouter.get('/', getAllSuppliers);
supplierRouter.get('/search', searchSuppliers);
supplierRouter.get('/:id', getSupplier);
supplierRouter.delete('/:id', deleteSupplier);
supplierRouter.put('/:id', updateSupplier);

export default supplierRouter;
