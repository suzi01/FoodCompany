import { Document, Schema, model } from 'mongoose';

import { Types } from 'mongoose';

export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  idOrBarcode: string;
  description: string;
  price: number;
  category: string;
  supplier: Types.ObjectId;
  quantityInStock: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    idOrBarcode: {
      type: String,
      required: [true, 'Product ID or Barcode is required'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: 0,
    },
    quantityInStock: {
      type: Number,
      required: [true, 'Product quantity in stock is required'],
      min: 0,
    },
    supplier: {
      type: Schema.Types.ObjectId,
      ref: 'Supplier',
      required: [true, 'Product supplier is required'],
    },
  },
  { timestamps: true },
);

const Product = model<IProduct>('Product', productSchema);

export default Product;
