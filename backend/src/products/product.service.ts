import Supplier from '../suppliers/supplier.model';
import { ProductSearchParams } from '../types/SearchParams/ProductSearchParams';
import { CreateProductDto } from './dtos/create-product.dto';
import { EditProductDto } from './dtos/edit-product.dto';
import Product from './product.model';

import { ClientSession, FilterQuery } from 'mongoose';

export const getAllProducts = async () => {
  return Product.find();
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
) => {
  const query: FilterQuery<ProductSearchParams> = {};

  query.name = { $regex: name, $options: 'i' };
  if (name !== '') query.name = { $regex: name, $options: 'i' };
  if (category !== '') query.category = { $regex: category, $options: 'i' };
  if (barcode !== '') query.barcode = { $regex: barcode, $options: 'i' };
  if (supplier !== '') query.supplier = { $regex: supplier, $options: 'i' };

  return await Product.find(query).sort({ [sortBy]: order === 'asc' ? 1 : -1 });
};

export const getProductsByPriceRange = async (
  minPrice: number,
  maxPrice: number,
) => {
  return await Product.find({
    price: { $gte: minPrice, $lte: maxPrice },
  });
};

export const getProductsInStock = async () => {
  return await Product.find({ quantityInStock: { $gt: 0 } });
};

export const getProductsOutOfStock = async () => {
  return await Product.find({ quantityInStock: 0 });
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
