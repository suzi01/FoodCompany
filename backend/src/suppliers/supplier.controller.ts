import { HttpError } from '../utils/app-error';
import { catchAsync } from '../utils/catch-async';
import { toSupplierResponseDTO } from '../utils/mappers/supplier.mapper';
import * as supplierService from './supplier.service';
import { Logger as logger } from '../utils/logger';
import { pageAndLimitValidation } from '../utils/pageAndLimitValidation';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '../constants';

// Display a list of all suppliers.
export const getAllSuppliers = catchAsync(async (req, res, next) => {
  logger.info('Fetching all suppliers');
  const page = parseInt(req.query.page as string) || DEFAULT_PAGE;
  const limit = parseInt(req.query.limit as string) || DEFAULT_LIMIT;

  pageAndLimitValidation(page, limit);
  const { suppliers, totalDocuments } = await supplierService.getAllSuppliers(
    page,
    limit,
  );
  const mappedSuppliers = suppliers.map(toSupplierResponseDTO);
  logger.info(`Fetched ${mappedSuppliers.length} suppliers successfully`);
  res.status(200).json({
    success: true,
    page,
    limit,
    totalDocuments,
    totalPages: Math.ceil(totalDocuments / limit),
    data: mappedSuppliers,
  });
});

// Display a supplier.
export const getSupplier = catchAsync(async (req, res, next) => {
  logger.info(`Fetching supplier with ID: ${req.params.id}`);
  const supplier = await supplierService.getSupplier(req.params.id as string);
  if (!supplier) {
    logger.warn(`No supplier found with ID: ${req.params.id}`);
    return next(
      new HttpError(404, `No supplier found with ID ${req.params.id}`),
    );
  }
  const mappedSupplier = toSupplierResponseDTO(supplier);
  logger.info(`Fetched supplier with ID: ${req.params.id} successfully`);
  res.status(200).json({ success: true, data: mappedSupplier });
});

// Add a new supplier.
export const createSupplier = catchAsync(async (req, res, next) => {
  logger.info('Creating new supplier with data:', req.body);
  const newSupplier = await supplierService.createSupplier(req.body);
  const mappedSupplier = toSupplierResponseDTO(newSupplier);
  logger.info(`Supplier created successfully with ID: ${newSupplier._id}`);
  res.status(201).json({ success: true, data: mappedSupplier });
});

// - **Search**: Filter suppliers by name, items they provide (through a product search), or unique code (which you could add, such as a supplier ID).
export const searchSuppliers = catchAsync(async (req, res, next) => {
  const page = parseInt(req.query.page as string) || DEFAULT_PAGE;

  pageAndLimitValidation(page, DEFAULT_LIMIT);
  const { companyName, product, status, sort, order } = req.query;
  logger.info(
    `Searching suppliers with companyName: ${companyName}, product: ${product}, status: ${status}, sort: ${sort ? sort : 'companyName'}, order: ${order ? order : 'asc'}, page: ${page}`,
  );
  const { suppliers, totalDocuments } = await supplierService.searchSuppliers(
    typeof companyName === 'string' ? companyName : '',
    typeof product === 'string' ? product : '',
    typeof status === 'string' ? status : '',
    typeof sort === 'string' ? sort : 'companyName',
    typeof order === 'string' ? order : 'asc',
    page,
  );
  const mappedSuppliers = suppliers.map(toSupplierResponseDTO);

  res.status(200).json({
    success: true,
    page,
    limit: DEFAULT_LIMIT,
    totalDocuments,
    totalPages: Math.ceil(totalDocuments / DEFAULT_LIMIT),
    data: mappedSuppliers,
  });
});

// - **Update**: Modify an existing supplier's details.
export const updateSupplier = catchAsync(async (req, res, next) => {
  logger.info(
    `Updating supplier with ID: ${req.params.id} and data:`,
    req.body,
  );
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
  logger.info(`Supplier with ID: ${req.params.id} updated successfully`);
  res.status(200).json({ success: true, data: mappedSupplier });
});

// Remove a supplier.
export const deleteSupplier = catchAsync(async (req, res, next) => {
  logger.info(`Deleting supplier with ID: ${req.params.id}`);
  const deletedSupplier = await supplierService.deleteSupplier(
    req.params.id as string,
  );
  if (!deletedSupplier) {
    logger.warn(`No supplier found to delete with ID: ${req.params.id}`);
    return next(
      new HttpError(404, `Supplier with ID ${req.params.id} not found`),
    );
  }
  logger.info(`Supplier with ID: ${req.params.id} deleted successfully`);
  res.status(200).json({
    success: true,
    message: 'Supplier deleted successfully',
  });
});

// what about when a supplier is deleted? Should they not be set to inactive instead?

// What about when a branch buys products from a supplier? The quanity of the products should decrease. Also, should there be a history of purchases from suppliers?
