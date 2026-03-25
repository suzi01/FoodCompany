import { HttpError } from '../utils/app-error';
import { catchAsync } from '../utils/catch-async';
import { toProductResponseDTO } from '../utils/mappers/product.mapper';
import * as productService from './product.service';
import { Logger as logger } from '../utils/logger';

import mongoose from 'mongoose';

// Get all products
export const getAllProducts = catchAsync(async (req, res, next) => {
  logger.info('Fetching all products');
  const products = await productService.getAllProducts();
  logger.info(`Fetched ${products.length} products successfully`);
  res
    .status(200)
    .json({ success: true, data: products.map(toProductResponseDTO) });
});

// Get a single product by ID
export const getProduct = catchAsync(async (req, res, next) => {
  logger.info(`Fetching product with ID: ${req.params.id}`);
  const product = await productService.getProduct(req.params.id as string);
  if (!product) {
    logger.warn(`No product found with ID: ${req.params.id}`);
    return next(
      new HttpError(404, `No product found with ID ${req.params.id}`),
    );
  }
  logger.info(`Fetched product with ID: ${req.params.id} successfully`);
  res.status(200).json({ success: true, data: toProductResponseDTO(product) });
});

// Create a new product
export const createProduct = catchAsync(async (req, res, next) => {
  logger.info('Creating new product with data:', req.body);
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const newProduct = await productService.createProduct(req.body, session);
    await session.commitTransaction();
    session.endSession();
    logger.info(`Product created successfully with ID: ${newProduct._id}`);
    res
      .status(201)
      .json({ success: true, data: toProductResponseDTO(newProduct) });
  } catch (error) {
    logger.error('Error creating product:', error);
    await session.abortTransaction();
    session.endSession();
    return next(new HttpError(500, 'Failed to create product'));
  }
});

// Update an existing product
export const updateProduct = catchAsync(async (req, res, next) => {
  logger.info(
    `Updating product with ID: ${req.params.id} and data:`,
    req.body,
  );
  const updatedProduct = await productService.updateProduct(
    req.params.id as string,
    req.body,
  );
  if (!updatedProduct) {
    logger.warn(`No product found with ID: ${req.params.id}`);
    return next(
      new HttpError(404, `Product with ID ${req.params.id} not found`),
    );
  }
  logger.info(`Product with ID: ${req.params.id} updated successfully`);
  res
    .status(200)
    .json({ success: true, data: toProductResponseDTO(updatedProduct) });
});

// Delete a product
export const deleteProduct = catchAsync(async (req, res, next) => {
  logger.info(`Deleting product with ID: ${req.params.id}`);
  const deletedProduct = await productService.deleteProduct(
    req.params.id as string,
  );
  if (!deletedProduct) {
    logger.warn(`No product found to delete with ID: ${req.params.id}`);
    return next(
      new HttpError(404, `Product with ID ${req.params.id} not found`),
    );
  }
  logger.info(`Product with ID: ${req.params.id} deleted successfully`);
  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  });
});

// maybe worth incorporating getting products by price range, stock status
// also need to add pagination

// Search products
export const searchProducts = catchAsync(async (req, res, next) => {
  logger.info(`Searching products with query:`, req.query);
  const { name, barcode, supplier, sortBy, category, order } = req.query;
  const products = await productService.searchProducts(
    typeof name === 'string' ? name : '',
    typeof barcode === 'string' ? barcode : '',
    typeof supplier === 'string' ? supplier : '',
    typeof sortBy === 'string' ? sortBy : 'name',
    typeof category === 'string' ? category : '',
    typeof order === 'string' ? order : 'asc',
  );
  logger.info(`Search returned ${products.length} products successfully`);
  res
    .status(200)
    .json({ success: true, data: products.map(toProductResponseDTO) });
});

// Get products by price range
export const getProductsByPriceRange = catchAsync(async (req, res, next) => {
  logger.info(`Getting products by price range with minPrice: ${req.query.minPrice}, maxPrice: ${req.query.maxPrice}`);
  const minPrice = Number(req.query.minPrice) || 0;
  const maxPrice = Number(req.query.maxPrice) || Number.MAX_SAFE_INTEGER;
  const products = await productService.getProductsByPriceRange(
    minPrice,
    maxPrice,
  );
  logger.info(`Fetched ${products.length} products in price range successfully`);
  res
    .status(200)
    .json({ success: true, data: products.map(toProductResponseDTO) });
});

// Get products in stock
export const getProductsInStock = catchAsync(async (req, res, next) => {
  logger.info(`Getting products in stock`);
  const products = await productService.getProductsInStock();
  logger.info(`Fetched ${products.length} products in stock successfully`);
  res
    .status(200)
    .json({ success: true, data: products.map(toProductResponseDTO) });
});

// Get products out of stock
export const getProductsOutOfStock = catchAsync(async (req, res, next) => {
  logger.info(`Getting products out of stock`);
  const products = await productService.getProductsOutOfStock();
  logger.info(`Fetched ${products.length} products out of stock successfully`);
  res
    .status(200)
    .json({ success: true, data: products.map(toProductResponseDTO) });
});

// Update product stock
export const updateProductStock = catchAsync(async (req, res, next) => {
  logger.info(`Updating stock for product with ID: ${req.params.id} and quantity: ${req.body.quantity}`);
  const { quantity } = req.body;
  const updatedProduct = await productService.updateProductStock(
    req.params.id as string,
    quantity,
  );
  if (!updatedProduct) {
    logger.warn(`No product found with ID: ${req.params.id}`);
    return next(
      new HttpError(404, `Product with ID ${req.params.id} not found`),
    );
  }
  logger.info(`Updated stock for product with ID: ${req.params.id} successfully`);
  res
    .status(200)
    .json({ success: true, data: toProductResponseDTO(updatedProduct) });
});

// Bulk update products
export const bulkUpdateProducts = catchAsync(async (req, res, next) => {
  logger.info(`Bulk updating products with data:`, req.body.updates);
  const updates = req.body.updates;
  const updatedProducts = await productService.bulkUpdateProducts(updates);
  logger.info(`Bulk updated ${updatedProducts.length} products successfully`);
  res.status(200).json({ success: true, data: updatedProducts });
});

// Get product count
export const getProductCount = catchAsync(async (req, res, next) => {
  logger.info(`Getting product count`);
  const count = await productService.getProductCount();
  logger.info(`Fetched product count successfully: ${count}`);
  res.status(200).json({ success: true, count });
});

// Get product count by category
export const getProductCountByCategory = catchAsync(async (req, res, next) => {
  logger.info(`Getting product count by category`);
  const counts = await productService.getProductCountByCategory();
  logger.info(`Fetched product count by category successfully`);
  res.status(200).json({ success: true, data: counts });
});
