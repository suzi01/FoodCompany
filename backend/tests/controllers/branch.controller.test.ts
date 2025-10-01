import request from 'supertest';
import app from '../../src/app';

import * as branchService from '../../src/branches/branch.service';

jest.mock('../../src/branches/branch.service');

const mockBranches = [
  {
    _id: '68d3d624eb3b2060dcc384f8',
    branchName: 'Test Branch',
    branchEmail: 'test.email@gmail.com',
    mainContactName: 'test contact',
    phoneNumber: '123-456-7890',
    address: '123 Test St, Test City, TX 12345',
    mainContactPhoneNumber: '123-456-7891',
    mainContactEmail: 'maintest.contact@gmail.com',
    yearsActive: 5,
    suppliers: [],
    createdAt: new Date('2025-09-24T11:29:40.851Z'),
    updatedAt: new Date('2025-09-24T11:36:17.456Z'),
  },
  {
    _id: '60c72b2f9b1d8c1e8c8b4567',
    branchName: 'Test Branch 2',
    branchEmail: 'maintest2.email@gmail.com',
    address: '123 Test St, Test City, TX 12345',
    mainContactEmail: 'maintest.contact@gmail.com',
    suppliers: [],
    yearsActive: 3,
    createdAt: new Date('2025-09-24T11:29:40.851Z'),
    updatedAt: new Date('2025-09-24T11:36:17.456Z'),
  },
];

const mockBranchesDto = [
  {
    id: '68d3d624eb3b2060dcc384f8',
    branchName: 'Test Branch',
    branchEmail: 'test.email@gmail.com',
    mainContactName: 'test contact',
    phoneNumber: '123-456-7890',
    address: '123 Test St, Test City, TX 12345',
    mainContactPhoneNumber: '123-456-7891',
    mainContactEmail: 'maintest.contact@gmail.com',
    yearsActive: 5,
    suppliers: [],
    createdAt: '2025-09-24T11:29:40.851Z',
    updatedAt: '2025-09-24T11:36:17.456Z',
  },
  {
    id: '60c72b2f9b1d8c1e8c8b4567',
    branchName: 'Test Branch 2',
    mainContactName: '',
    mainContactPhoneNumber: '',
    phoneNumber: '',
    branchEmail: 'maintest2.email@gmail.com',
    address: '123 Test St, Test City, TX 12345',
    mainContactEmail: 'maintest.contact@gmail.com',
    suppliers: [],
    yearsActive: 3,
    createdAt: '2025-09-24T11:29:40.851Z',
    updatedAt: '2025-09-24T11:36:17.456Z',
  },
];

describe('branch Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllBranches', () => {
    it('GET / should return a list of branches', async () => {
      (branchService.getAllBranches as jest.Mock).mockResolvedValue(
        mockBranches,
      );

      const response = await request(app).get('/api/v1/branches/');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data).toEqual(mockBranchesDto);
    });

    it('GET / should handle errors', async () => {
      (branchService.getAllBranches as jest.Mock).mockRejectedValue(
        new Error('No branches found'),
      );

      const response = await request(app).get('/api/v1/branches/');
      expect(response.status).toBe(500);

      expect(response.body.message).toBe('No branches found');
    });
  });

  describe('getSupplier', () => {
    it('GET / should return an existing supplier', async () => {
      (branchService.getBranch as jest.Mock).mockResolvedValue(mockBranches[0]);

      const response = await request(app).get(
        '/api/v1/branches/68d3d624eb3b2060dcc384f8',
      );

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(mockBranchesDto[0]);
    });

    it('GET / should return a 400 if supplier does not exist', async () => {
      (branchService.getBranch as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get('/api/v1/branches/2343232342');
      expect(response.status).toBe(404);
      expect(response.body.status).toBe('fail');
    });

    it('GET / should handle errors', async () => {
      (branchService.getBranch as jest.Mock).mockRejectedValue(
        new Error('Database error'),
      );
      const response = await request(app).get('/api/v1/branches/2343232342');
      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Database error');
    });
  });

  describe('searchBranches', () => {
    it('GET / find a branch based on search criteria', async () => {
      (branchService.searchBranches as jest.Mock).mockResolvedValue(
        mockBranches,
      );

      const response = await request(app).get(
        '/api/v1/branches/search?branchName=Tes',
      );
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('GET / should handle errors', async () => {
      (branchService.searchBranches as jest.Mock).mockRejectedValue(
        new Error('Database error'),
      );
      const response = await request(app).get(
        '/api/v1/branches/search?branchName=Test',
      );
      expect(response.status).toBe(500);

      expect(response.body.message).toBe('Database error');
    });

    it('GET / should handle multiple search parameters', async () => {
      (branchService.searchBranches as jest.Mock).mockResolvedValue([
        mockBranches[0],
      ]);

      const response = await request(app).get(
        '/api/v1/branches/search?branchName=Test&email=widgets&supplierName=ABC123&sort=companyName&order=Descending',
      );

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual([mockBranchesDto[0]]);
      expect(branchService.searchBranches).toHaveBeenCalledWith(
        'Test',
        'widgets',
        'ABC123',
        'companyName',
        'Descending',
      );
    });
  });

  describe('createBranch', () => {
    it('POST / should add a new valid branch', async () => {
      (branchService.createBranch as jest.Mock).mockResolvedValue(
        mockBranches[0],
      );

      const response = await request(app)
        .post('/api/v1/branches/')
        .send(mockBranchesDto[0]);
      expect(response.status).toBe(201);
      expect(response.body.data).toEqual(mockBranchesDto[0]);
    });

    it('POST / should not add an invalid supplier', async () => {
      const validationError = new Error('Validation Error');
      (validationError as any).name = 'ValidationError';
      (validationError as any).errors = {
        email: {
          message: 'Email is required',
          kind: 'required',
          path: 'email',
        },
        companyName: {
          message: 'Company name is required',
          kind: 'required',
          path: 'companyName',
        },
      };
      (branchService.createBranch as jest.Mock).mockRejectedValue(
        validationError,
      );

      const response = await request(app)
        .post('/api/v1/branches/')
        .send(mockBranchesDto[0]);
      expect(response.status).toBe(400);

      expect(response.body.message).toBe('Validation Error');
    });

    it('POST / should handle server errors', async () => {
      (branchService.createBranch as jest.Mock).mockRejectedValue(
        new Error('Database connection failed'),
      );

      const validBranchData = {
        branchName: 'Third Branch',
        mainContactName: 'Stephanie Brown',
        branchEmail: 'jeff@hotmail.com',
        phoneNumber: '123-456-7890',
        suppliers: [],
        createdAt: '2025-09-29T14:35:43.794Z',
        updatedAt: '2025-09-29T14:36:39.170Z',
      };

      const response = await request(app)
        .post('/api/v1/branches/')
        .send(validBranchData);

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Database connection failed');
    });
  });

  describe('updateBranch', () => {
    it('PUT / should update an existing branch with valid data', async () => {
      const updatedValue = { ...mockBranches[1], branchName: 'updated Name' };
      (branchService.updateBranch as jest.Mock).mockResolvedValue({
        ...mockBranches[1],
        branchName: 'updated Name',
      });

      const response = await request(app)
        .put('/api/v1/branches/60c72b2f9b1d8c1e8c8b4567')
        .send({ branchName: 'updated Name' });
      expect(response.status).toBe(200);
      expect(response.body.data).toEqual({
        ...mockBranchesDto[1],
        branchName: 'updated Name',
      });
    });

    it('PUT / should return a 404 if branch does not exist', async () => {
      (branchService.updateBranch as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .put('/api/v1/branches/60c72b2f9b1d8c1e8c8b4567')
        .send({ branchName: 'updated Name' });
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Branch not found');
    });

    it('PUT / should handle validation errors during update', async () => {
      const validationError = new Error('Validation Error');
      (validationError as any).name = 'ValidationError';
      (validationError as any).errors = {
        email: {
          message: 'Please provide a valid email',
          kind: 'invalid',
          path: 'email',
        },
      };

      (branchService.updateBranch as jest.Mock).mockRejectedValue(
        validationError,
      );

      const invalidUpdateData = {
        email: 'invalid-email-format',
      };

      const response = await request(app)
        .put('/api/v1/branches/60c72b2f9b1d8c1e8c8b4567')
        .send(invalidUpdateData);

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
    });

    it('PUT / should handle partial updates correctly', async () => {
      const partiallyUpdatedBranch = {
        ...mockBranches[0],
        phoneNumber: '123-456-7890',
      };

      (branchService.updateBranch as jest.Mock).mockResolvedValue(
        partiallyUpdatedBranch,
      );

      const partialUpdateData = {
        phoneNumber: '123-456-7890',
      };

      const response = await request(app)
        .put('/api/v1/branches/68d3d624eb3b2060dcc384f8')
        .send(partialUpdateData);

      expect(response.status).toBe(200);
      expect(response.body.data.phoneNumber).toBe('123-456-7890');
    });
  });

  describe('deleteBranch', () => {
    it('DELETE / should delete an existing Branch', async () => {
      (branchService.deleteBranch as jest.Mock).mockResolvedValue(
        mockBranches[0],
      );

      const response = await request(app).delete(
        '/api/v1/branches/68d3d624eb3b2060dcc384f8',
      );
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Branch deleted successfully');
    });

    it('DELETE / should return 404 if Branch not found', async () => {
      (branchService.deleteBranch as jest.Mock).mockResolvedValue(null);

      const response = await request(app).delete(
        '/api/v1/branches/68d3d624eb3b2060dcc384f8',
      );
      expect(response.status).toBe(404);
      expect(response.body.message).toBe(
        'Branch with ID 68d3d624eb3b2060dcc384f8 not found',
      );
    });
  });
});
