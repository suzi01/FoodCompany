import Supplier from '../../../src/suppliers/supplier.model';
import Product from '../../../src/products/product.model';
import {
  createSupplier,
  searchSuppliers,
  getAllSuppliers,
  getSupplier,
  deleteSupplier,
  updateSupplier,
} from '../../../src/suppliers/supplier.service';

jest.mock('../../../src/suppliers/supplier.model');
jest.mock('../../../src/products/product.model');

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
      const mockPopulate = jest.fn().mockResolvedValue(suppliers);
      (Supplier.find as jest.Mock).mockReturnValue({
        populate: mockPopulate,
      });

      const result = await getAllSuppliers();

      expect(Supplier.find).toHaveBeenCalled();
      expect(mockPopulate).toHaveBeenCalledWith(
        'productsProvided',
        'name -_id',
      );
      expect(result).toEqual(suppliers);
    });
    it('should return empty array when no suppliers exist', async () => {
      const mockPopulate = jest.fn().mockResolvedValue([]);
      (Supplier.find as jest.Mock).mockReturnValue({
        populate: mockPopulate,
      });

      const result = await getAllSuppliers();

      expect(Supplier.find).toHaveBeenCalledWith();
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('should handle database errors', async () => {
      const error = new Error('Database query failed');
      const mockPopulate = jest.fn().mockRejectedValue(error);
      (Supplier.find as jest.Mock).mockReturnValue({
        populate: mockPopulate,
      });

      await expect(getAllSuppliers()).rejects.toThrow('Database query failed');
      expect(Supplier.find).toHaveBeenCalled();
    });
  });

  describe('getSupplier', () => {
    it('should return supplier', async () => {
      const supplier = {
        _id: '123',
        companyName: 'Acme Corp',
        mainContactName: 'John Doe',
        email: 'test@example.com',
        phoneNumber: '123-456-7890',
        productsProvided: [],
        branches: [],
      };

      const mockPopulate = jest.fn().mockResolvedValue(supplier);
      (Supplier.findById as jest.Mock).mockReturnValue({
        populate: mockPopulate,
      });

      const result = await getSupplier('123');

      expect(Supplier.findById).toHaveBeenCalledWith('123');
      expect(mockPopulate).toHaveBeenCalledWith(
        'productsProvided',
        'name -_id',
      );
      expect(result).toEqual(supplier);
    });
    it('should return null when supplier does not exist', async () => {
      const mockPopulate = jest.fn().mockResolvedValue(null);
      (Supplier.findById as jest.Mock).mockReturnValue({
        populate: mockPopulate,
      });

      const result = await getSupplier('123');

      expect(Supplier.findById).toHaveBeenCalledWith('123');
      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      const error = new Error('Database query failed');
      const mockPopulate = jest.fn().mockRejectedValue(error);
      (Supplier.findById as jest.Mock).mockReturnValue({
        populate: mockPopulate,
      });

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
    const mockSearchResults = [mockSupplier];
    let mockSort: jest.Mock;
    let mockPopulate: jest.Mock;

    beforeEach(() => {
      mockPopulate = jest.fn().mockResolvedValue(mockSearchResults);
      mockSort = jest.fn().mockReturnValue({ populate: mockPopulate });
      (Supplier.find as jest.Mock).mockReturnValue({ sort: mockSort });
    });

    it('should search suppliers with company name only', async () => {
      const result = await searchSuppliers(
        'Acme',
        '',
        '',
        'companyName',
        'asc',
      );

      expect(Supplier.find).toHaveBeenCalledWith({
        companyName: { $regex: 'Acme', $options: 'i' },
      });
      expect(mockSort).toHaveBeenCalledWith({ companyName: 1 });
      expect(mockPopulate).toHaveBeenCalledWith(
        'productsProvided',
        'name -_id',
      );
      expect(result).toEqual(mockSearchResults);
    });

    it('should search suppliers with product name', async () => {
      const mockProducts = [{ _id: 'prod1' }, { _id: 'prod2' }];
      (Product.find as jest.Mock).mockReturnValue({
        select: jest.fn().mockResolvedValue(mockProducts),
      });

      const result = await searchSuppliers(
        'Acme',
        'widget',
        '',
        'companyName',
        'asc',
      );

      expect(Product.find).toHaveBeenCalledWith({
        name: { $regex: 'widget', $options: 'i' },
      });
      expect(Supplier.find).toHaveBeenCalledWith({
        companyName: { $regex: 'Acme', $options: 'i' },
        productsProvided: { $in: ['prod1', 'prod2'] },
      });
    });

    it('should search suppliers with status filter', async () => {
      const result = await searchSuppliers(
        'Acme',
        '',
        'Active',
        'companyName',
        'desc',
      );

      expect(Supplier.find).toHaveBeenCalledWith({
        companyName: { $regex: 'Acme', $options: 'i' },
        status: { $regex: 'Active', $options: 'i' },
      });
      expect(mockSort).toHaveBeenCalledWith({ companyName: -1 });
    });

    it('should search with all parameters', async () => {
      const mockProducts = [{ _id: 'prod1' }];
      (Product.find as jest.Mock).mockReturnValue({
        select: jest.fn().mockResolvedValue(mockProducts),
      });

      const result = await searchSuppliers(
        'Acme',
        'widget',
        'Active',
        'status',
        'asc',
      );

      expect(Supplier.find).toHaveBeenCalledWith({
        companyName: { $regex: 'Acme', $options: 'i' },
        productsProvided: { $in: ['prod1'] },
        status: { $regex: 'Active', $options: 'i' },
      });
      expect(mockSort).toHaveBeenCalledWith({ status: 1 });
    });

    it('should handle case-insensitive search', async () => {
      await searchSuppliers('ACME', '', 'ACTIVE', 'companyName', 'asc');

      expect(Supplier.find).toHaveBeenCalledWith({
        companyName: { $regex: 'ACME', $options: 'i' },
        status: { $regex: 'ACTIVE', $options: 'i' },
      });
    });

    it('should sort by different fields', async () => {
      await searchSuppliers('Test', '', '', 'createdAt', 'desc');

      expect(mockSort).toHaveBeenCalledWith({ createdAt: -1 });
    });

    it('should return empty results when no matches found', async () => {
      mockPopulate.mockResolvedValue([]);

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
      mockPopulate.mockRejectedValue(error);

      await expect(
        searchSuppliers('Test', '', '', 'companyName', 'asc'),
      ).rejects.toThrow('Search failed');
    });

    it('should handle no products found for product search', async () => {
      (Product.find as jest.Mock).mockReturnValue({
        select: jest.fn().mockResolvedValue([]),
      });

      const result = await searchSuppliers(
        '',
        'nonexistent',
        '',
        'companyName',
        'asc',
      );

      expect(Supplier.find).toHaveBeenCalledWith({
        companyName: { $regex: '', $options: 'i' },
        productsProvided: { $in: [] },
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
