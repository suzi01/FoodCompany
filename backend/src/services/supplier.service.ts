import { ISupplier } from "../dtos/supplier.dto";
import Supplier from "../models/supplier.model";


export const getAllSuppliers = async () => {
  const suppliers = await Supplier.find()
  return suppliers;
};

export const getSupplier = async (id:string) => {
  const supplier = await Supplier.find({_id: id})
  return supplier;
};

export const createSupplier = async (data: ISupplier) => {
  const newSupplier = await Supplier.create(data)
  return newSupplier;
};