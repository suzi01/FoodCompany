import { HttpError } from '../utils/app-error';
import { catchAsync } from '../utils/catch-async';
import { toProductResponseDTO } from '../utils/mappers/product.mapper';
import * as productService from './product.service';

import mongoose from 'mongoose';

// Get all products
export const getAllProducts = catchAsync(async (req, res, next) => {
  const products = await productService.getAllProducts();
  res
    .status(200)
    .json({ success: true, data: products.map(toProductResponseDTO) });
});

// Get a single product by ID
export const getProduct = catchAsync(async (req, res, next) => {
  const product = await productService.getProduct(req.params.id as string);
  if (!product) {
    return next(
      new HttpError(404, `No product found with ID ${req.params.id}`),
    );
  }
  res.status(200).json({ success: true, data: toProductResponseDTO(product) });
});

// Create a new product
export const createProduct = catchAsync(async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const newProduct = await productService.createProduct(req.body, session);
    await session.commitTransaction();
    session.endSession();
    res
      .status(201)
      .json({ success: true, data: toProductResponseDTO(newProduct) });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return next(new HttpError(500, 'Failed to create product'));
  }
});

// Update an existing product
export const updateProduct = catchAsync(async (req, res, next) => {
  const updatedProduct = await productService.updateProduct(
    req.params.id as string,
    req.body,
  );
  if (!updatedProduct) {
    return next(
      new HttpError(404, `Product with ID ${req.params.id} not found`),
    );
  }
  res
    .status(200)
    .json({ success: true, data: toProductResponseDTO(updatedProduct) });
});

// Delete a product
export const deleteProduct = catchAsync(async (req, res, next) => {
  const deletedProduct = await productService.deleteProduct(
    req.params.id as string,
  );
  if (!deletedProduct) {
    return next(
      new HttpError(404, `Product with ID ${req.params.id} not found`),
    );
  }
  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  });
});

// Search products
export const searchProducts = catchAsync(async (req, res, next) => {
  const { name, barcode, supplier, sortBy, category, order } = req.query;
  const products = await productService.searchProducts(
    typeof name === 'string' ? name : '',
    typeof barcode === 'string' ? barcode : '',
    typeof supplier === 'string' ? supplier : '',
    typeof sortBy === 'string' ? sortBy : 'name',
    typeof category === 'string' ? category : '',
    typeof order === 'string' ? order : 'asc',
  );
  res
    .status(200)
    .json({ success: true, data: products.map(toProductResponseDTO) });
});

// Get products by price range
export const getProductsByPriceRange = catchAsync(async (req, res, next) => {
  console.log('Price Range Query:', req.query);
  const minPrice = Number(req.query.minPrice) || 0;
  const maxPrice = Number(req.query.maxPrice) || Number.MAX_SAFE_INTEGER;
  const products = await productService.getProductsByPriceRange(
    minPrice,
    maxPrice,
  );
  res
    .status(200)
    .json({ success: true, data: products.map(toProductResponseDTO) });
});

// Get products in stock
export const getProductsInStock = catchAsync(async (req, res, next) => {
  const products = await productService.getProductsInStock();
  res
    .status(200)
    .json({ success: true, data: products.map(toProductResponseDTO) });
});

// Get products out of stock
export const getProductsOutOfStock = catchAsync(async (req, res, next) => {
  const products = await productService.getProductsOutOfStock();
  res
    .status(200)
    .json({ success: true, data: products.map(toProductResponseDTO) });
});

// Update product stock
export const updateProductStock = catchAsync(async (req, res, next) => {
  const { quantity } = req.body;
  const updatedProduct = await productService.updateProductStock(
    req.params.id as string,
    quantity,
  );
  if (!updatedProduct) {
    return next(
      new HttpError(404, `Product with ID ${req.params.id} not found`),
    );
  }
  res
    .status(200)
    .json({ success: true, data: toProductResponseDTO(updatedProduct) });
});

// Bulk update products
export const bulkUpdateProducts = catchAsync(async (req, res, next) => {
  const updates = req.body.updates;
  const updatedProducts = await productService.bulkUpdateProducts(updates);
  res.status(200).json({ success: true, data: updatedProducts });
});

// Get product count
export const getProductCount = catchAsync(async (req, res, next) => {
  const count = await productService.getProductCount();
  res.status(200).json({ success: true, count });
});

// Get product count by category
export const getProductCountByCategory = catchAsync(async (req, res, next) => {
  const counts = await productService.getProductCountByCategory();
  res.status(200).json({ success: true, data: counts });
});
