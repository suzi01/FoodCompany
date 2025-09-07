import { ISupplier } from '../dtos/supplier.dto';
import Supplier from '../models/supplier.model';


export const getAllSuppliers = async () => {
  return Supplier.find();
};

export const getSupplier = async (id:string) => {
  return Supplier.find({ _id: id });
};

export const createSupplier = async (data: ISupplier) => {
  return await Supplier.create(data);
};