import Router from 'express';
import {
  createSupplier,
  deleteSupplier,
  getAllSuppliers,
  getSupplier,
  searchSuppliers,
  updateSupplier,
} from '../controllers/supplier.controller';

const supplierRouter = Router();

supplierRouter.post('/', createSupplier);
supplierRouter.get('/', getAllSuppliers);
supplierRouter.get('/search', searchSuppliers);
supplierRouter.get('/:id', getSupplier);
supplierRouter.delete('/:id', deleteSupplier);
supplierRouter.put('/:id', updateSupplier);

export default supplierRouter;
