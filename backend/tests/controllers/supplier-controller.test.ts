import request from 'supertest';
import app  from '../../src/app'; 
import * as supplierService from '../../src/services/supplier.service';

jest.mock('../../src/services/supplier.service');

const mockedSupplierService = supplierService as jest.Mocked<typeof supplierService>;

describe('supplier Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('GET / should return a list of suppliers', async () => {
    const mockSuppliers = [{
      "_id": "68d3d624eb3b2060dcc384f8",
      "companyName": "Test company",
      "email": "test.email@gmail.com",
      "mainContactName": "test contact",
      "status": "Pending",
      "productsProvided": [],
      "branches": [],
      "createdAt": "2025-09-24T11:29:40.851Z",
      "updatedAt": "2025-09-24T11:36:17.456Z",
    },
  {
      "_id": "60c72b2f9b1d8c1e8c8b4567",
      "companyName": "Test company2",
      "email": "test2.email@gmail.com",
      "mainContactName": "test2 contact",
      "status": "Active",
      "productsProvided": [],
      "branches": [],
      "createdAt": "2025-10-24T11:29:40.851Z",
      "updatedAt": "2025-10-24T11:36:17.456Z",
    }];
    mockedSupplierService.getAllSuppliers.mockResolvedValue(mockSuppliers as any );

    const response = await request(app).get('/api/v1/suppliers/');
    expect(response.status).toBe(200);
   expect(Array.isArray(response.body.data)).toBe(true);
  });
})



