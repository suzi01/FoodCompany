import mongoose from 'mongoose';
import type { MongoError } from 'mongodb';
import { HttpError } from '../utils/appError';

const { ValidationError } = mongoose.Error;

export type GlobalError = HttpError &
  Partial<MongoError> &
  Partial<typeof ValidationError> & { [key: string]: any };
