import { CreateProductPayload } from './Product';

type supplierStatusValues = 'Active' | 'Inactive' | 'Pending';

export interface Supplier {
  id: string;
  status: supplierStatusValues;
  companyName: string;
  mainContactName: string;
  address?: string;
  email: string;
  phoneNumber?: string;
  productsProvided: string[];
  branches: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateSupplier {
  companyName: string;
  mainContactName: string;
  address?: string;
  email: string;
  phoneNumber?: string;
  productsProvided: CreateProductPayload[];
}

export interface GetSuppliersResponse {
  success: boolean;
  data: Supplier[];
}
