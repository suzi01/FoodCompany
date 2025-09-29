import Supplier, { ISupplier } from './supplier.model';

export const getAllSuppliers = async () => {
  return Supplier.find();
};

export const createSupplier = async (data: Omit<ISupplier, '_id'>) => {
  return await Supplier.create(data);
};

export const updateSupplier = async (id: string, data: Partial<ISupplier>) => {
  return Supplier.findByIdAndUpdate(id, data, { new: true });
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
  if (product) query.products = { $regex: product, $options: 'i' };
  if (code) query.code = code;

  return Supplier.find(query).sort({ [sort]: order === 'Ascending' ? 1 : -1 });
};

export const getSupplier = async (id: string) => {
  return Supplier.findById(id);
};
