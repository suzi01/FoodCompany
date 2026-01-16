import type { MongoError } from 'mongodb';
import { HttpError } from '../utils/app-error';

export type GlobalError = HttpError &
  Partial<MongoError> &
  Partial<Error> & {
    code?: number;
    path?: string;
    value?: unknown;
    keyValue?: Record<string, unknown>;
    errors?: Record<string, { message: string; [key: string]: unknown }>;
  };
