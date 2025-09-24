import { Types } from "mongoose";

export type SupplierStatusType = 'Active'|'Pending'|'Removed'

export interface ISupplier extends Document {
    companyName: string;
    mainContactName: string;
    address?: string;
    email: string,
    phoneNumber?:string,
    status: SupplierStatusType;
    productsProvided: Types.ObjectId[];
    branches:Types.ObjectId[]
}