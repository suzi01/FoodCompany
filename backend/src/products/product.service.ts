import Supplier from '../suppliers/supplier.model';
import { ProductSearchParams } from '../types/SearchParams/ProductSearchParams';
import { CreateProductDto } from './dtos/create-product.dto';
import { EditProductDto } from './dtos/edit-product.dto';
import Product from './product.model';

import { ClientSession, FilterQuery } from 'mongoose';

export const getAllProducts = async (page: number, limit: number) => {
  const totalDocuments = await Product.countDocuments();
  const products = await Product.find()
    .skip((page - 1) * limit)
    .limit(limit);
  return { products, totalDocuments };
};

export const getProduct = async (id: string) => {
  return Product.findById(id);
};

export const createProduct = async (
  data: CreateProductDto,
  session?: ClientSession,
) => {
  const [newProduct] = await Product.create([data], { session });

  await Supplier.findByIdAndUpdate(
    data.supplier,
    { $addToSet: { productsProvided: newProduct._id } },
    { session },
  );

  // 3. Update Branches
  // await Branch.updateMany(
  //   { _id: { $in: data.branches } },
  //   { $addToSet: { products: newProduct._id } },
  //   { session },
  // );

  return newProduct;
};

export const updateProduct = async (id: string, data: EditProductDto) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProduct = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};

export const searchProducts = async (
  name: string,
  barcode: string,
  supplier: string,
  category: string,
  sortBy: string,
  order: string,
  page: number,
) => {
  const query: FilterQuery<ProductSearchParams> = {};

  query.name = { $regex: name, $options: 'i' };
  if (name !== '') query.name = { $regex: name, $options: 'i' };
  if (category !== '') query.category = { $regex: category, $options: 'i' };
  if (barcode !== '') query.barcode = { $regex: barcode, $options: 'i' };
  if (supplier !== '') query.supplier = { $regex: supplier, $options: 'i' };

  const totalDocuments = await Product.countDocuments(query);
  const products = await Product.find(query)
    .skip((page - 1) * 10)
    .limit(10)
    .sort({ [sortBy]: order === 'asc' ? 1 : -1 });
  return { products, totalDocuments };
};

export const getProductsByPriceRange = async (
  minPrice: number,
  maxPrice: number,
  page: number,
  limit: number,
) => {
  const filter = { price: { $gte: minPrice, $lte: maxPrice } };
  const totalDocuments = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .skip((page - 1) * limit)
    .limit(limit);
  return { products, totalDocuments };
};

export const getProductsInStock = async (page: number, limit: number) => {
  const filter = { quantityInStock: { $gt: 0 } };
  const totalDocuments = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .skip((page - 1) * limit)
    .limit(limit);
  return { products, totalDocuments };
};

export const getProductsOutOfStock = async (page: number, limit: number) => {
  const filter = { quantityInStock: 0 };
  const totalDocuments = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .skip((page - 1) * limit)
    .limit(limit);
  return { products, totalDocuments };
};

export const updateProductStock = async (id: string, quantity: number) => {
  // Only allow updating quantityInStock
  return await Product.findByIdAndUpdate(
    id,
    { quantityInStock: quantity },
    { new: true },
  );
};

export const bulkUpdateProducts = async (
  updates: Array<{ id: string; data: EditProductDto }>,
) => {
  const promises = updates.map((update) =>
    Product.findByIdAndUpdate(update.id, update.data, { new: true }),
  );
  return await Promise.all(promises);
};

export const getProductCount = async () => {
  return await Product.countDocuments();
};

export const getProductCountByCategory = async () => {
  return await Product.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
  ]);
};
