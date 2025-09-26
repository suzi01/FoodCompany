import request from 'supertest';
import app from '../../src/app';

import * as supplierService from '../../src/services/supplier.service';
import { SupplierDto } from '../../src/dtos/supplier.dto';

jest.mock('../../src/services/supplier.service');

const mockSuppliers = [
  {
    id: '68d3d624eb3b2060dcc384f8',
    companyName: 'Test company',
    email: 'test.email@gmail.com',
    mainContactName: 'test contact',
    status: 'Pending',
    productsProvided: [],
    branches: [],
    createdAt: '2025-09-24T11:29:40.851Z',
    updatedAt: '2025-09-24T11:36:17.456Z',
  },
  {
    id: '60c72b2f9b1d8c1e8c8b4567',
    companyName: 'Test company2',
    email: 'test2.email@gmail.com',
    mainContactName: 'test2 contact',
    status: 'Active',
    productsProvided: [],
    branches: [],
    createdAt: '2025-10-24T11:29:40.851Z',
    updatedAt: '2025-10-24T11:36:17.456Z',
  },
] as SupplierDto[];

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
    });

    it('GET / should handle errors', async () => {
      (supplierService.getAllSuppliers as jest.Mock).mockRejectedValue(
        new Error('Database error'),
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
      expect(response.body.data).toEqual(mockSuppliers[0]);
    });

    it('GET / should return a 400 if supplier does not exist', async () => {
      (supplierService.getSupplier as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get('/api/v1/suppliers/2343232342');
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Supplier not found');
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
  });

  describe('createSupplier', () => {
    it('POST / should add a new valid supplier', async () => {
      (supplierService.createSupplier as jest.Mock).mockResolvedValue(
        mockSuppliers[0],
      );

      const response = await request(app).post('/api/v1/suppliers/');
      expect(response.status).toBe(201);
      expect(response.body.data).toEqual(mockSuppliers[0]);
    });

    it('POST / should not add an invalid supplier', async () => {
      (supplierService.createSupplier as jest.Mock).mockRejectedValue({
        name: 'ValidationError',
      });

      const response = await request(app).post('/api/v1/suppliers/');
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid supplier data');
    });
  });

  describe('updateSupplier', () => {
    it('PUT / should update an existing supplier with valid data', async () => {
      const updatedValue = { ...mockSuppliers[1], companyName: 'updated Name' };
      (supplierService.updateSupplier as jest.Mock).mockResolvedValue(
        updatedValue,
      );

      const response = await request(app)
        .put('/api/v1/suppliers/60c72b2f9b1d8c1e8c8b4567')
        .send({ companyName: 'updated Name' });
      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(updatedValue);
    });

    it('PUT / should return a 404 if supplier does not exist', async () => {
      (supplierService.updateSupplier as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .put('/api/v1/suppliers/60c72b2f9b1d8c1e8c8b4567')
        .send({ companyName: 'updated Name' });
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Supplier not found');
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
      expect(response.body.message).toBe('Supplier not found');
      expect(response.body.success).toBe(false);
    });
  });
});
