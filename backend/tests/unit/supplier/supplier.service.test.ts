import Supplier from '../../../src/suppliers/supplier.model';
import {
  createSupplier,
  searchSuppliers,
  getAllSuppliers,
  getSupplier,
  deleteSupplier,
  updateSupplier,
} from '../../../src/suppliers/supplier.service';

jest.mock('../../../src/suppliers/supplier.model');

describe('Supplier Service', () => {
  const mockSupplier = {
    _id: '507f1f77bcf86cd799439011',
    companyName: 'Acme Corp',
    mainContactName: 'John Doe',
    email: 'test@example.com',
    phoneNumber: '123-456-7890',
    status: 'Active',
    productsProvided: [],
    branches: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createSupplier', () => {
    it('createSupplier calls Supplier.create with correct data', async () => {
      const newSupplier = {
        status: 'Active' as const,
        companyName: 'Acme Corp',
        mainContactName: 'John Doe',
        email: 'test@example.com',
        phoneNumber: '123-456-7890',
        productsProvided: [],
        branches: [],
      };
      (Supplier.create as jest.Mock).mockResolvedValue({
        ...newSupplier,
        _id: '123',
      });

      const result = await createSupplier(newSupplier);

      expect(Supplier.create).toHaveBeenCalledWith(newSupplier);
      expect(result.companyName).toBe('Acme Corp');
    });
    it('should handle creation errors', async () => {
      const supplierData = {
        companyName: 'Error Corp',
        mainContactName: 'Error User',
        email: 'error@test.com',
        status: 'Active' as const,
        productsProvided: [],
        branches: [],
      };

      const error = new Error('Database connection failed');
      (Supplier.create as jest.Mock).mockRejectedValue(error);

      await expect(createSupplier(supplierData)).rejects.toThrow(
        'Database connection failed',
      );
      expect(Supplier.create).toHaveBeenCalledWith(supplierData);
    });
  });

  describe('getAllSuppliers', () => {
    it('should return all suppliers', async () => {
      const suppliers = [
        {
          _id: '123',
          companyName: 'Acme Corp',
          mainContactName: 'John Doe',
          email: 'test@example.com',
          phoneNumber: '123-456-7890',
          productsProvided: [],
          branches: [],
        },
        {
          _id: '1234',
          companyName: 'Acme Corp2',
          mainContactName: 'Jane Dive',
          email: 'test2@example.com',
          phoneNumber: '122-456-7890',
          productsProvided: [],
          branches: [],
        },
      ];
      (Supplier.find as jest.Mock).mockResolvedValue(suppliers);

      const result = await getAllSuppliers();

      expect(Supplier.find).toHaveBeenCalled();
      expect(result).toEqual(suppliers);
    });
    it('should return empty array when no suppliers exist', async () => {
      (Supplier.find as jest.Mock).mockResolvedValue([]);

      const result = await getAllSuppliers();

      expect(Supplier.find).toHaveBeenCalledWith();
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('should handle database errors', async () => {
      const error = new Error('Database query failed');
      (Supplier.find as jest.Mock).mockRejectedValue(error);

      await expect(getAllSuppliers()).rejects.toThrow('Database query failed');
      expect(Supplier.find).toHaveBeenCalled();
    });
  });

  describe('getSupplier', () => {
    it('should return supplier', async () => {
      const supplier = [
        {
          _id: '123',
          companyName: 'Acme Corp',
          mainContactName: 'John Doe',
          email: 'test@example.com',
          phoneNumber: '123-456-7890',
          productsProvided: [],
          branches: [],
        },
      ];
      (Supplier.findById as jest.Mock).mockResolvedValue(supplier);

      const result = await getSupplier('123');

      expect(Supplier.findById).toHaveBeenCalled();
      expect(result).toEqual(supplier);
    });
    it('should return empty array when supplier does not exist', async () => {
      (Supplier.findById as jest.Mock).mockResolvedValue([]);

      const result = await getSupplier('123');

      expect(Supplier.findById).toHaveBeenCalledWith('123');
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('should handle database errors', async () => {
      const error = new Error('Database query failed');
      (Supplier.findById as jest.Mock).mockRejectedValue(error);

      await expect(getSupplier('123')).rejects.toThrow('Database query failed');
      expect(Supplier.findById).toHaveBeenCalledWith('123');
    });
  });

  describe('updateSupplier', () => {
    const updateData = {
      companyName: 'Updated Acme Corp',
      phoneNumber: '987-654-3210',
    };
    it('should update supplier successfully', async () => {
      const updatedSupplier = { ...mockSupplier, ...updateData };

      (Supplier.findByIdAndUpdate as jest.Mock).mockResolvedValue(
        updatedSupplier,
      );

      const result = await updateSupplier(
        '507f1f77bcf86cd799439011',
        updateData,
      );

      expect(Supplier.findByIdAndUpdate).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
        updateData,
        { new: true },
      );

      expect(result).toBeDefined();
      expect(result).not.toBeNull();

      if (result) {
        expect(result.companyName).toBe('Updated Acme Corp');
        expect(result.phoneNumber).toBe('987-654-3210');
      }
    });
    it('should return null when no suppliers exist', async () => {
      (Supplier.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      const result = await updateSupplier(
        '507f1f77bcf86cd799439011',
        updateData,
      );

      expect(Supplier.findByIdAndUpdate).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
        updateData,
        { new: true },
      );
      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      const error = new Error('Database query failed');
      (Supplier.findByIdAndUpdate as jest.Mock).mockRejectedValue(error);

      await expect(
        updateSupplier('507f1f77bcf86cd799439011', updateData),
      ).rejects.toThrow('Database query failed');
      expect(Supplier.findByIdAndUpdate).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
        updateData,
        { new: true },
      );
    });
  });

  describe('searchSuppliers', () => {
    const mockSearchResults = [
      mockSupplier,
      {
        ...mockSupplier,
        _id: '507f1f77bcf86cd799439012',
        companyName: 'Beta Corp',
      },
    ];

    let mockSort: jest.Mock;

    beforeEach(() => {
      mockSort = jest.fn().mockResolvedValue(mockSearchResults);
      (Supplier.find as jest.Mock).mockReturnValue({ sort: mockSort });
    });

    it('should search suppliers with all parameters', async () => {
      const result = await searchSuppliers(
        'Acme',
        'widgets',
        'ABC123',
        'companyName',
        'asc',
      );

      expect(Supplier.find).toHaveBeenCalledWith({
        companyName: { $regex: 'Acme', $options: 'i' },
        products: { $regex: 'widgets', $options: 'i' },
        code: { $regex: 'ABC123', $options: 'i' },
      });
      expect(mockSort).toHaveBeenCalledWith({ companyName: 1 });
      expect(result).toEqual(mockSearchResults);
    });

    it('should search suppliers with only company name', async () => {
      const result = await searchSuppliers(
        'Acme',
        '',
        '',
        'companyName',
        'desc',
      );

      expect(Supplier.find).toHaveBeenCalledWith({
        companyName: { $regex: 'Acme', $options: 'i' },
      });
      expect(mockSort).toHaveBeenCalledWith({ companyName: -1 });
      expect(result).toEqual(mockSearchResults);
    });

    it('should handle case-insensitive search', async () => {
      const result = await searchSuppliers(
        'ACME',
        'WIDGETS',
        'abc123',
        'companyName',
        'asc',
      );

      expect(Supplier.find).toHaveBeenCalledWith({
        companyName: { $regex: 'ACME', $options: 'i' },
        products: { $regex: 'WIDGETS', $options: 'i' },
        code: { $regex: 'abc123', $options: 'i' },
      });
      expect(result).toEqual(mockSearchResults);
    });

    it('should sort in ascending order when order is asc', async () => {
      await searchSuppliers('Test', '', '', 'companyName', 'asc');

      expect(mockSort).toHaveBeenCalledWith({ companyName: 1 });
    });

    it('should sort in descending order when order is not asc', async () => {
      await searchSuppliers('Test', '', '', 'companyName', 'desc');

      expect(mockSort).toHaveBeenCalledWith({ companyName: -1 });
    });

    it('should sort by different fields', async () => {
      await searchSuppliers('Test', '', '', 'createdAt', 'desc');

      expect(mockSort).toHaveBeenCalledWith({ createdAt: -1 });
    });

    it('should return empty results when no matches found', async () => {
      mockSort.mockResolvedValue([]);

      const result = await searchSuppliers(
        'NonExistent',
        '',
        '',
        'companyName',
        'asc',
      );

      expect(result).toEqual([]);
    });

    it('should handle search errors', async () => {
      const error = new Error('Search failed');
      mockSort.mockRejectedValue(error);

      await expect(
        searchSuppliers('Test', '', '', 'companyName', 'asc'),
      ).rejects.toThrow('Search failed');
    });

    it('should handle special regex characters in search terms', async () => {
      await searchSuppliers(
        'Test.Corp',
        'widget+',
        'ABC[123]',
        'companyName',
        'asc',
      );

      expect(Supplier.find).toHaveBeenCalledWith({
        companyName: { $regex: 'Test.Corp', $options: 'i' },
        products: { $regex: 'widget+', $options: 'i' },
        code: { $regex: 'ABC[123]', $options: 'i' },
      });
    });
  });

  describe('deleteSupplier', () => {
    it('should delete supplier successfully', async () => {
      (Supplier.findByIdAndDelete as jest.Mock).mockResolvedValue(mockSupplier);

      const result = await deleteSupplier('507f1f77bcf86cd799439011');

      expect(Supplier.findByIdAndDelete).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
      );
      expect(result).toEqual(mockSupplier);
    });

    it('should return null when deleting non-existent supplier', async () => {
      (Supplier.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      const result = await deleteSupplier('nonexistent123');

      expect(Supplier.findByIdAndDelete).toHaveBeenCalledWith('nonexistent123');
      expect(result).toBeNull();
    });

    it('should handle deletion errors', async () => {
      const error = new Error('Deletion failed');
      (Supplier.findByIdAndDelete as jest.Mock).mockRejectedValue(error);

      await expect(deleteSupplier('507f1f77bcf86cd799439011')).rejects.toThrow(
        'Deletion failed',
      );
      expect(Supplier.findByIdAndDelete).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
      );
    });
  });
});
