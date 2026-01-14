import request from 'supertest';
import app from '../../../src/app';

import * as supplierService from '../../../src/suppliers/supplier.service';
import mongoose from 'mongoose';
import { buildSupplier } from '../../factories/domin/supplierFactory';
import { toSupplierResponseDTO } from '../../../src/utils/mappers/supplier.mapper';

jest.mock('../../../src/suppliers/supplier.service');

const mockSuppliers = [...Array(2).keys()].map(() => buildSupplier());

const mockSuppliersDto = mockSuppliers.map((supplier) =>
  toSupplierResponseDTO(supplier),
);


describe('supplier Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllSuppliers', () => {
    it('GET / should return a list of suppliers', async () => {
      (supplierService.getAllSuppliers as jest.Mock).mockResolvedValue(
        mockSuppliers,
      );

      const response = await request(app).get('/api/v1/suppliers/');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data).toEqual(mockSuppliersDto);
    });

    it('GET / should handle errors', async () => {
      (supplierService.getAllSuppliers as jest.Mock).mockRejectedValue(
        new Error('No suppliers found'),
      );

      const response = await request(app).get('/api/v1/suppliers/');
      expect(response.status).toBe(500);

      expect(response.body.message).toBe('No suppliers found');
    });
  });

  describe('getSupplier', () => {
    it('GET / should return an existing supplier', async () => {
      (supplierService.getSupplier as jest.Mock).mockResolvedValue(
        mockSuppliers[0],
      );

      const response = await request(app).get(
        '/api/v1/suppliers/68d3d624eb3b2060dcc384f8',
      );

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(mockSuppliersDto[0]);
    });

    it('GET / should return a 400 if supplier does not exist', async () => {
      (supplierService.getSupplier as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get('/api/v1/suppliers/2343232342');
      expect(response.status).toBe(404);
      expect(response.body.status).toBe('fail');
    });

    it('GET / should handle errors', async () => {
      (supplierService.getSupplier as jest.Mock).mockRejectedValue(
        new Error('Database error'),
      );
      const response = await request(app).get('/api/v1/suppliers/2343232342');
      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Database error');
    });
  });

  describe('searchSuppliers', () => {
    it('GET / find a supplier based on search criteria', async () => {
      (supplierService.searchSuppliers as jest.Mock).mockResolvedValue(
        mockSuppliers,
      );

      const response = await request(app).get(
        '/api/v1/suppliers/search?companyName=TestCo',
      );
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('GET / should handle errors', async () => {
      (supplierService.searchSuppliers as jest.Mock).mockRejectedValue(
        new Error('Database error'),
      );
      const response = await request(app).get(
        '/api/v1/suppliers/search?companyName=TestCo',
      );
      expect(response.status).toBe(500);

      expect(response.body.message).toBe('Database error');
    });

    it('GET / should handle multiple search parameters', async () => {
      (supplierService.searchSuppliers as jest.Mock).mockResolvedValue([
        mockSuppliers[0],
      ]);

      const response = await request(app).get(
        '/api/v1/suppliers/search?companyName=Test&product=widgets&status=active&sort=companyName&order=Descending',
      );

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual([mockSuppliersDto[0]]);
      expect(supplierService.searchSuppliers).toHaveBeenCalledWith(
        'Test',
        'widgets',
        'active',
        'companyName',
        'Descending',
      );
    });
  });

  describe('createSupplier', () => {
    it('POST / should add a new valid supplier', async () => {
      (supplierService.createSupplier as jest.Mock).mockResolvedValue(
        mockSuppliers[0],
      );

      const response = await request(app)
        .post('/api/v1/suppliers/')
        .send(mockSuppliersDto[0]);
      expect(response.status).toBe(201);
      expect(response.body.data).toEqual(mockSuppliersDto[0]);
    });

    it('POST / should not add an invalid supplier', async () => {
      const validationError = new Error(
        'Validation Error',
      ) as mongoose.Error.ValidationError;
      validationError.name = 'ValidationError';
      validationError.errors = {
        email: {
          message: 'Email is required',
          kind: 'required',
          path: 'email',
          name: 'ValidatorError',
          properties: {
            message: 'Email is required',
            type: 'required',
            path: 'email',
          },
          value: undefined,
        },
        companyName: {
          message: 'Company name is required',
          kind: 'required',
          path: 'companyName',
          name: 'ValidatorError',
          properties: {
            message: 'Company name is required',
            type: 'required',
            path: 'companyName',
          },
          value: undefined,
        },
      };
      (supplierService.createSupplier as jest.Mock).mockRejectedValue(
        validationError,
      );

      const response = await request(app)
        .post('/api/v1/suppliers/')
        .send(mockSuppliersDto[0]);
      expect(response.status).toBe(400);

      expect(response.body.message).toBe('Validation Error');
    });

    it('POST / should handle server errors', async () => {
      (supplierService.createSupplier as jest.Mock).mockRejectedValue(
        new Error('Database connection failed'),
      );

      const validSupplierData = {
        companyName: 'Test Company',
        mainContactName: 'John Doe',
        email: 'test@company.com',
        status: 'Active',
        productsProvided: [],
        branches: [],
      };

      const response = await request(app)
        .post('/api/v1/suppliers/')
        .send(validSupplierData);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Database connection failed');
    });
  });

  describe('updateSupplier', () => {
    it('PUT / should update an existing supplier with valid data', async () => {
      const updatedValue = { ...mockSuppliers[1], companyName: 'updated Name' };
      (supplierService.updateSupplier as jest.Mock).mockResolvedValue({
        ...mockSuppliers[1],
        companyName: 'updated Name',
      });

      const response = await request(app)
        .put('/api/v1/suppliers/60c72b2f9b1d8c1e8c8b4567')
        .send({ companyName: 'updated Name' });
      expect(response.status).toBe(200);
      expect(response.body.data).toEqual({
        ...mockSuppliersDto[1],
        companyName: 'updated Name',
      });
    });

    it('PUT / should return a 404 if supplier does not exist', async () => {
      (supplierService.updateSupplier as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .put('/api/v1/suppliers/60c72b2f9b1d8c1e8c8b4567')
        .send({ companyName: 'updated Name' });
      expect(response.status).toBe(404);
      expect(response.body.message).toBe(
        'Supplier with ID 60c72b2f9b1d8c1e8c8b4567 not found',
      );
    });

    it('PUT / should handle validation errors during update', async () => {
      const validationError = new Error(
        'Validation Error',
      ) as mongoose.Error.ValidationError;
      validationError.name = 'ValidationError';
      validationError.errors = {
        email: {
          message: 'Please provide a valid email',
          kind: 'invalid',
          path: 'email',
          name: 'ValidatorError',
          properties: {
            message: 'Email is required',
            type: 'required',
            path: 'email',
          },
          value: undefined,
        },
      };

      (supplierService.updateSupplier as jest.Mock).mockRejectedValue(
        validationError,
      );

      const invalidUpdateData = {
        email: 'invalid-email-format',
      };

      const response = await request(app)
        .put('/api/v1/suppliers/60c72b2f9b1d8c1e8c8b4567')
        .send(invalidUpdateData);

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
    });

    it('PUT / should handle partial updates correctly', async () => {
      const partiallyUpdatedSupplier = {
        ...mockSuppliers[0],
        phoneNumber: '+1234567890',
      };

      (supplierService.updateSupplier as jest.Mock).mockResolvedValue(
        partiallyUpdatedSupplier,
      );

      const partialUpdateData = {
        phoneNumber: '+1234567890',
      };

      const response = await request(app)
        .put('/api/v1/suppliers/68d3d624eb3b2060dcc384f8')
        .send(partialUpdateData);

      expect(response.status).toBe(200);
      expect(response.body.data.phoneNumber).toBe('+1234567890');
    });
  });

  describe('deleteSupplier', () => {
    it('DELETE / should delete an existing supplier', async () => {
      (supplierService.deleteSupplier as jest.Mock).mockResolvedValue(
        mockSuppliers[0],
      );

      const response = await request(app).delete(
        '/api/v1/suppliers/68d3d624eb3b2060dcc384f8',
      );
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Supplier deleted successfully');
    });

    it('DELETE / should return 404 if supplier not found', async () => {
      (supplierService.deleteSupplier as jest.Mock).mockResolvedValue(null);

      const response = await request(app).delete(
        '/api/v1/suppliers/68d3d624eb3b2060dcc384f8',
      );
      expect(response.status).toBe(404);
      expect(response.body.message).toBe(
        'Supplier with ID 68d3d624eb3b2060dcc384f8 not found',
      );
    });
  });
});
