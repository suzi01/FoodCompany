import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../utils/app-error';
import { GlobalError } from '../types/GlobalError';

const handleCastErrorDB = (err: GlobalError) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new HttpError(400, message);
};

const handleDuplicateFieldsDB = (err: GlobalError) => {
  const value = err.keyValue ? JSON.stringify(err.keyValue) : '';
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new HttpError(400, message);
};

const handleValidationErrorDB = (err: GlobalError) => {
  const errors = err.errors
    ? Object.values(err.errors).map((el: any) => el.message)
    : [];
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new HttpError(400, message);
};

const sendErrorDev = (err: GlobalError, res: Response) => {
  res.status(err.statusCode || 500).json({
    status: err.status || 'error',
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: GlobalError, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode || 500).json({
      status: err.status || 'error',
      message: err.message,
    });
  } else {
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

export const globalErrorHandler = (
  err: GlobalError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  err.statusCode = err.name === 'ValidationError' ? 400 : err.statusCode || 500;
  err.status = err.status || 'error';

  console.log('Error:', err.status);
  console.log('Message:', err.message);

  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test'
  ) {
    sendErrorDev(err, res);
  } else {
    if (err.name === 'CastError') err = handleCastErrorDB(err);
    if ((err as any).code === 11000) err = handleDuplicateFieldsDB(err);
    if (err.name === 'ValidationError') err = handleValidationErrorDB(err);

    sendErrorProd(err, res);
  }
};
