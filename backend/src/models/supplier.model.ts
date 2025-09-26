import { Schema, model } from 'mongoose';


import { Types } from 'mongoose';

export type SupplierStatusType = 'Active' | 'Pending' | 'Removed';

export interface ISupplier {
  companyName: string;
  mainContactName: string;
  address?: string;
  email: string;
  phoneNumber?: string;
  status: SupplierStatusType;
  productsProvided: Types.ObjectId[];
  branches: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const supplierSchema = new Schema<ISupplier>(
  {
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      minLength: 2,
      maxLength: 50,
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Company email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
    },
    mainContactName: {
      type: String,
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    address: {
      type: String,
      trim: true,
      maxLength: 70,
    },
    status: {
      type: String,
      enum: ['Active', 'Pending', 'Removed'],
    },
    phoneNumber: {
      type: String,
      match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
    },
    productsProvided: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: false,
      },
    ],
    branches: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Branch',
        required: false,
      },
    ],
  },
  { timestamps: true },
);

const Supplier = model('Supplier', supplierSchema);

export default Supplier;
