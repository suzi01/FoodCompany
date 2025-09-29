import mongoose from 'mongoose';
import type { MongoError } from 'mongodb';
import { HttpError } from '../utils/app-error';

const { ValidationError } = mongoose.Error;

export type GlobalError = HttpError &
  Partial<MongoError> &
  Partial<typeof ValidationError> & { [key: string]: any };
