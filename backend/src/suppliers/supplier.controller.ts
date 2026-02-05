import { HttpError } from '../utils/app-error';
import { catchAsync } from '../utils/catch-async';
import { toSupplierResponseDTO } from '../utils/mappers/supplier.mapper';
import * as supplierService from './supplier.service';

// Display a list of all suppliers.
export const getAllSuppliers = catchAsync(async (req, res, next) => {
  const suppliers = await supplierService.getAllSuppliers();
  console.log('Suppliers retrieved:', suppliers); // Debug log to check retrieved suppliers
  const mappedSuppliers = suppliers.map(toSupplierResponseDTO);

  res.status(200).json({ success: true, data: mappedSuppliers });
});

// Display a supplier.
export const getSupplier = catchAsync(async (req, res, next) => {
  const supplier = await supplierService.getSupplier(req.params.id as string);
  if (!supplier) {
    return next(
      new HttpError(404, `No supplier found with ID ${req.params.id}`),
    );
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
  const { companyName, product, status, sort, order } = req.query;
  const suppliers = await supplierService.searchSuppliers(
    typeof companyName === 'string' ? companyName : '',
    typeof product === 'string' ? product : '',
    typeof status === 'string' ? status : '',
    typeof sort === 'string' ? sort : 'CompanyName',
    typeof order === 'string' ? order : 'asc',
  );
  const mappedSuppliers = suppliers.map(toSupplierResponseDTO);

  res.status(200).json({ success: true, data: mappedSuppliers });
});

// - **Update**: Modify an existing supplier's details.

export const updateSupplier = catchAsync(async (req, res, next) => {
  const updatedSupplier = await supplierService.updateSupplier(
    req.params.id as string,
    req.body,
  );
  if (!updatedSupplier) {
    return next(
      new HttpError(404, `Supplier with ID ${req.params.id} not found`),
    );
  }
  const mappedSupplier = toSupplierResponseDTO(updatedSupplier);
  res.status(200).json({ success: true, data: mappedSupplier });
});

// Remove a supplier.

export const deleteSupplier = catchAsync(async (req, res, next) => {
  const deletedSupplier = await supplierService.deleteSupplier(
    req.params.id as string,
  );
  if (!deletedSupplier) {
    return next(
      new HttpError(404, `Supplier with ID ${req.params.id} not found`),
    );
  }
  res.status(200).json({
    success: true,
    message: 'Supplier deleted successfully',
  });
});

// what about when a supplier is deleted? Should they not be set to inactive instead?

// What about when a branch buys products from a supplier? The quanity of the products should decrease. Also, should there be a history of purchases from suppliers?
