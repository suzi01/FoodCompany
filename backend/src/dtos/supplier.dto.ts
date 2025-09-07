import { Types } from "mongoose";

export type SupplerStatus = 'Active'|'Pending'|'Removed'

export interface ISupplier extends Document {
    companyName: string;
    mainContactName: string;
    address?: string;
    email: string,
    phoneNumber?:string,
    status: SupplerStatus;
    productsProvided: Types.ObjectId[];
    branches:Types.ObjectId[]
}