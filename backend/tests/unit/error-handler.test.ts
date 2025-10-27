import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../../src/utils/app-error';
import { globalErrorHandler } from '../../src/error/error.controller';

describe('Error handler', () => {
  const mockReq = {} as Request;
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;
  const mockNext: NextFunction = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return formatted HttpError in development', () => {
    const err = new HttpError(400, 'Test error');
    process.env.NODE_ENV = 'development';

    globalErrorHandler(err, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Test error',
      }),
    );
  });

  it('should return formatted HttpError in production', () => {
    const err = new HttpError(400, 'validation error');
    process.env.NODE_ENV = 'production';

    globalErrorHandler(err, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'validation error',
      }),
    );
  });
});
