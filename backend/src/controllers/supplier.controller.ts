import * as supplierService from '../services/supplier.service';
import { HttpError } from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';
import { toSupplierResponseDTO } from '../utils/mappers/supplier.mapper';

// Display a list of all suppliers.
export const getAllSuppliers = catchAsync(async (req, res, next) => {
  const suppliers = await supplierService.getAllSuppliers();
  const mappedSuppliers = suppliers.map(toSupplierResponseDTO);

  res.status(200).json({ success: true, data: mappedSuppliers });
});

// Display a supplier.
export const getSupplier = catchAsync(async (req, res, next) => {
  const supplier = await supplierService.getSupplier(req.params.id);
  if (!supplier) {
    return next(new HttpError(404, 'No supplier found with that ID'));
  }

  const mappedSupplier = toSupplierResponseDTO(supplier);

  res.status(200).json({ success: true, data: mappedSupplier });
});

// Add a new supplier.
export const createSupplier = catchAsync(async (req, res, next) => {
  const newSupplier = await supplierService.createSupplier(req.body);
  const mappedSupplier = toSupplierResponseDTO(newSupplier);
  res.status(201).json({ success: true, data: mappedSupplier });
});

// - **Search**: Filter suppliers by name, items they provide (through a product search), or unique code (which you could add, such as a supplier ID).
export const searchSuppliers = catchAsync(async (req, res, next) => {
  const { companyName, product, code, sort, order } = req.query;
  const suppliers = await supplierService.searchSuppliers(
    typeof companyName === 'string' ? companyName : '',
    typeof product === 'string' ? product : '',
    typeof code === 'string' ? code : '',
    typeof sort === 'string' ? sort : 'CompanyName',
    typeof order === 'string' ? order : 'Ascending',
  );

  const mappedSuppliers = suppliers.map(toSupplierResponseDTO);

  res.status(200).json({ success: true, data: mappedSuppliers });
});

// - **Update**: Modify an existing supplier's details.

export const updateSupplier = catchAsync(async (req, res, next) => {
  const updatedSupplier = await supplierService.updateSupplier(
    req.params.id,
    req.body,
  );
  if (!updatedSupplier) {
    return next(new HttpError(404, 'Supplier not found'));
  }
  const mappedSupplier = toSupplierResponseDTO(updatedSupplier);
  res.status(200).json({ success: true, data: mappedSupplier });
});

// Remove a supplier.

export const deleteSupplier = catchAsync(async (req, res, next) => {
  const deletedSupplier = await supplierService.deleteSupplier(req.params.id);
  if (!deletedSupplier) {
    return next(new HttpError(404, 'Supplier not found'));
  }
  res
    .status(200)
    .json({ success: true, message: 'Supplier deleted successfully' });
});
