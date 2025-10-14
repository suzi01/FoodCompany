import { CreateSupplierDto } from './dtos/create-supplier.dto';
import { EditSupplierDto } from './dtos/edit-supplier.dto';
import Supplier from './supplier.model';

export const getAllSuppliers = async () => {
  return Supplier.find();
};

export const createSupplier = async (data: CreateSupplierDto) => {
  return await Supplier.create(data);
};

export const updateSupplier = async (id: string, data: EditSupplierDto) => {
  try {
    return Supplier.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw new Error('Database query failed');
  }
};

export const deleteSupplier = async (id: string) => {
  return Supplier.findByIdAndDelete(id);
};
export const searchSuppliers = async (
  companyName: string,
  product: string,
  code: string,
  sort: string,
  order: string,
) => {
  const query: any = {};

  query.companyName = { $regex: companyName, $options: 'i' };
  if (product !== '') query.products = { $regex: product, $options: 'i' };
  if (code !== '') query.code = { $regex: code, $options: 'i' };

  return Supplier.find(query).sort({ [sort]: order === 'asc' ? 1 : -1 });
};

export const getSupplier = async (id: string) => {
  return Supplier.findById(id);
};
