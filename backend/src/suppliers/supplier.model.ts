import mongoose, { Document, Schema, model } from 'mongoose';

import { Types } from 'mongoose';
import { supplierStatusValues } from '../constants';

export type SupplierStatusType = (typeof supplierStatusValues)[number];

export interface ISupplier extends Document {
  _id: Types.ObjectId;
  companyName: string;
  mainContactName: string;
  address?: string;
  email: string;
  phoneNumber?: string;
  status: SupplierStatusType;
  products?: Types.ObjectId[];
  associatedBranches?: Types.ObjectId[];
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
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

supplierSchema.virtual('products', {
  ref: 'Product', // Model to join
  localField: '_id', // Supplier._id
  foreignField: 'supplier', // Product.supplier
});

// VIRTUAL: Find all branches that list this supplier
supplierSchema.virtual('associatedBranches', {
  ref: 'Branch',
  localField: '_id',
  foreignField: 'suppliers',
});

supplierSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    const Branch = mongoose.model('Branch');
    await Branch.findByIdAndUpdate(doc.branch, {
      $pull: { suppliers: doc._id },
    });
  }
});

const Supplier = model('Supplier', supplierSchema);

export default Supplier;
