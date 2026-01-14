import Product from '../products/product.model';
import { SupplierSearchParams } from '../types/SearchParams/SupplierSearchParams';
import { CreateSupplierDto } from './dtos/create-supplier.dto';
import { EditSupplierDto } from './dtos/edit-supplier.dto';
import Supplier from './supplier.model';

import { FilterQuery } from 'mongoose';

export const getAllSuppliers = async () => {
  return await Supplier.find().populate('productsProvided', 'name -_id');
};

export const createSupplier = async (data: CreateSupplierDto) => {
  return await Supplier.create(data);
};

export const updateSupplier = async (id: string, data: EditSupplierDto) => {
  try {
    return await Supplier.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw new Error('Database query failed');
  }
};

export const deleteSupplier = async (id: string) => {
  return await Supplier.findByIdAndDelete(id);
};

export const searchSuppliers = async (
  companyName: string,
  product: string,
  status: string,
  sort: string,
  order: string,
) => {
  const query: FilterQuery<SupplierSearchParams> = {};

  query.companyName = { $regex: companyName, $options: 'i' };

  if (product !== '') {
    const products = await Product.find({
      name: { $regex: product, $options: 'i' },
    }).select('_id');
    const productIds = products.map((p) => p._id);
    query.productsProvided = { $in: productIds };
  }
  if (status !== '') query.status = { $regex: status, $options: 'i' };

  return await Supplier.find(query)
    .sort({ [sort]: order === 'asc' ? 1 : -1 })
    .populate('productsProvided', '-_id -__v');
};

export const getSupplier = async (id: string) => {
  return await Supplier.findById(id).populate('productsProvided', '-_id -__v');
};
