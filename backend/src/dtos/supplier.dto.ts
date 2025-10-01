import { Types } from 'mongoose';
import { SupplierStatusType } from '../models/supplier.model';


export interface SupplierDto {
  id:string
  companyName: string;
  mainContactName: string;
  address?: string;
  email: string;
  phoneNumber?: string;
  status: SupplierStatusType;
  productsProvided: string[];
  branches: string[];
  createdAt: string;
  updatedAt: string;
}
