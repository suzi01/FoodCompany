import { model, Schema, Types } from 'mongoose';

export interface IBranch {
  _id: Types.ObjectId;
  branchName: string;
  mainContactName?: string;
  mainContactPhoneNumber?: string;
  mainContactEmail?: string;
  branchEmail: string;
  phoneNumber?: string;
  address?: string;
  yearsActive: number;
  suppliers: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const branchSchema = new Schema<IBranch>(
  {
    branchName: {
      type: String,
      required: [true, 'Branch name is required'],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    branchEmail: {
      type: String,
      required: [true, 'Branch email is required'],
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
    mainContactEmail: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
    },
    mainContactPhoneNumber: {
      type: String,
      match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
    },
    address: {
      type: String,
      trim: true,
      maxLength: 70,
    },
    phoneNumber: {
      type: String,
      match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
    },
    suppliers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Supplier',
      },
    ],
  },
  { timestamps: true },
);

branchSchema.virtual('yearsActive').get(function (this: IBranch) {
  const now = new Date();
  const years = now.getFullYear() - this.createdAt.getFullYear();

  const anniversaryPassed =
    now.getMonth() > this.createdAt.getMonth() ||
    (now.getMonth() === this.createdAt.getMonth() &&
      now.getDate() >= this.createdAt.getDate());

  return anniversaryPassed ? years : years - 1;
});

branchSchema.set('toJSON', { virtuals: true });
branchSchema.set('toObject', { virtuals: true });

const Branch = model<IBranch>('Branch', branchSchema);
export default Branch;
