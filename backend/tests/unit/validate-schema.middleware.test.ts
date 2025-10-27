import { NextFunction, Request, Response } from 'express';

import { validateSchema } from '../../src/middlewares/validate-schema.middleware';
import { createSupplierSchema } from '../../src/suppliers/dtos/create-supplier.dto';
import { createBranchSchema } from '../../src/branches/dtos/create-branch.dto';
import { editBranchSchema } from '../../src/branches/dtos/edit-branch.dto';

describe('Validation Middleware', () => {
  const mockReq = {} as Request;
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;
  const next: NextFunction = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('supplier creation', () => {
    const validMockSupplierDto = {
      companyName: 'Acme Corp',
      mainContactName: 'John Doe',
      email: 'test@example.com',
      phoneNumber: '123-456-7890',
      address: '',
      status: 'Active',
      productsProvided: [],
      branches: [],
    };

    const invalidMockSupplierDto = {
      companyName: 'Acme Corp',
      mainContactName: 'John Doe',
      phoneNumber: '123-456-7890',
      address: '',
      status: 'Active',
      productsProvided: [],
      branches: [],
    };

    it('should call next if body is valid', async () => {
      mockReq.body = validMockSupplierDto;

      validateSchema(createSupplierSchema)(mockReq, mockRes, next);

      expect(mockRes.status).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });

    it('should throw 400 if body invalid', async () => {
      mockReq.body = invalidMockSupplierDto;

      validateSchema(createSupplierSchema)(mockReq, mockRes, next);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: false,
          message: expect.stringContaining('email'),
        }),
      );
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('branch creation', () => {
    const validMockBranchDto = {
      branchName: 'Test Branch',
      branchEmail: 'test.email@gmail.com',
      mainContactName: 'test contact',
      phoneNumber: '123-456-7890',
      address: '123 Test St, Test City, TX 12345',
      mainContactPhoneNumber: '123-456-7891',
      mainContactEmail: 'maintest.contact@gmail.com',
      suppliers: [],
    };

    const invalidMockBranchDto = {
      branchEmail: 'test.email@gmail.com',
      mainContactName: 'test contact',
      phoneNumber: '123-456-7890',
      mainContactPhoneNumber: '123-456-7891',
      suppliers: [],
    };

    it('should call next if body is valid', async () => {
      mockReq.body = validMockBranchDto;

      validateSchema(createBranchSchema)(mockReq, mockRes, next);

      expect(mockRes.status).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });

    it('should throw 400 if body invalid for branch creation', async () => {
      mockReq.body = invalidMockBranchDto;

      validateSchema(createBranchSchema)(mockReq, mockRes, next);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: false,
          message: expect.stringContaining('branchName'),
        }),
      );
      expect(next).not.toHaveBeenCalled();
    });

    it('should throw 400 if body invalid for branch update', async () => {
      mockReq.body = { ...invalidMockBranchDto, branchName: '' };

      validateSchema(editBranchSchema)(mockReq, mockRes, next);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: false,
          message: expect.stringContaining('branchName'),
        }),
      );
      expect(next).not.toHaveBeenCalled();
    });
  });
});
