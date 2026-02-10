import Branch from '../../../src/branches/branch.model';

import {
  createBranch,
  getAllBranches,
  getBranch,
  deleteBranch,
  updateBranch,
  searchBranches,
} from '../../../src/branches/branch.service';
import { buildBranch } from '../../factories/domin/branchFactory';
import { buildBranchDTO } from '../../factories/dto/branchDTOFactory';

jest.mock('../../../src/branches/branch.model');

describe('Branch Service', () => {
  const mockBranch = buildBranch();

  const mockBranches = [...Array(10).keys()].map(() => buildBranch());

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createBranch', () => {
    it('createBranch calls Branch.create with correct data', async () => {
      const branchData = buildBranchDTO({
        branchName: 'Test Branch',
        suppliers: [],
      });

      (Branch.create as jest.Mock).mockResolvedValue({
        ...branchData,
        _id: '123',
      });
      const result = await createBranch(branchData);

      expect(Branch.create).toHaveBeenCalledWith(branchData);

      expect(result.branchName).toBe(branchData.branchName);
    });

    it('should handle creation errors', async () => {
      const branchData = buildBranchDTO({
        branchName: 'Error Branch',
      });

      const error = new Error('Database connection failed');
      (Branch.create as jest.Mock).mockRejectedValue(error);

      await expect(createBranch(branchData)).rejects.toThrow(
        'Database connection failed',
      );
      expect(Branch.create).toHaveBeenCalledWith(branchData);
    });
  });

  describe('getAllBranches', () => {
    it('should return all branches', async () => {
      const mockPopulate = jest.fn().mockResolvedValue(mockBranches);
      (Branch.find as jest.Mock).mockReturnValue({ populate: mockPopulate });

      const result = await getAllBranches();

      expect(Branch.find).toHaveBeenCalled();
      expect(result).toEqual(mockBranches);
    });
    it('should return empty array when no branches exist', async () => {
      const mockPopulate = jest.fn().mockResolvedValue([]);
      (Branch.find as jest.Mock).mockReturnValue({ populate: mockPopulate });

      const result = await getAllBranches();

      expect(Branch.find).toHaveBeenCalledWith();
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('should handle database errors', async () => {
      const error = new Error('Database query failed');
      const mockPopulate = jest.fn().mockRejectedValue(error);
      (Branch.find as jest.Mock).mockReturnValue({ populate: mockPopulate });

      await expect(getAllBranches()).rejects.toThrow('Database query failed');
      expect(Branch.find).toHaveBeenCalled();
    });
  });

  describe('getBranch', () => {
    it('should return branch', async () => {
      (Branch.findById as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockBranch),
      });

      const result = await getBranch('123');

      expect(Branch.findById).toHaveBeenCalled();
      expect(result).toEqual(mockBranch);
    });
    it('should return empty array when branch does not exist', async () => {
      (Branch.findById as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue([]),
      });

      const result = await getBranch('123');

      expect(Branch.findById).toHaveBeenCalled();
      expect(result).toStrictEqual([]);
    });

    it('should handle database errors', async () => {
      const error = new Error('Database query failed');
      (Branch.findById as jest.Mock).mockReturnValue({
        populate: jest.fn().mockRejectedValue(error),
      });

      await expect(getBranch('123')).rejects.toThrow('Database query failed');
      expect(Branch.findById).toHaveBeenCalledWith('123');
    });
  });

  describe('updateBranch', () => {
    const updateData = {
      branchName: 'Updated Acme Branch',
      phoneNumber: '987-654-3210',
      suppliers: [],
    };
    it('should update branch successfully', async () => {
      const updatedBranch = { ...mockBranch, ...updateData };

      (Branch.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedBranch);

      const result = await updateBranch('507f1f77bcf86cd799439011', updateData);

      expect(Branch.findByIdAndUpdate).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
        updateData,
        { new: true },
      );

      expect(result).toBeDefined();
      expect(result).not.toBeNull();

      if (result) {
        expect(result.branchName).toBe('Updated Acme Branch');
        expect(result.phoneNumber).toBe('987-654-3210');
      }
    });
    it('should return empty array when no branches exist', async () => {
      (Branch.findByIdAndUpdate as jest.Mock).mockResolvedValue([]);

      const result = await updateBranch('507f1f77bcf86cd799439011', updateData);

      expect(Branch.findByIdAndUpdate).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
        updateData,
        { new: true },
      );
      expect(result).toStrictEqual([]);
    });

    it('should handle database errors', async () => {
      const error = new Error('Database query failed');
      (Branch.findByIdAndUpdate as jest.Mock).mockRejectedValue(error);

      await expect(
        updateBranch('507f1f77bcf86cd799439011', updateData),
      ).rejects.toThrow('Database query failed');
      expect(Branch.findByIdAndUpdate).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
        updateData,
        { new: true },
      );
    });
  });

  describe('searchBranches', () => {
    const mockSearchResults = [
      mockBranch,
      {
        ...mockBranch,
        _id: '507f1f77bcf86cd799439012',
        branchName: 'Beta Branch',
      },
    ];

    let mockSort: jest.Mock;
    let mockPopulate: jest.Mock;

    beforeEach(() => {
      mockSort = jest.fn().mockResolvedValue(mockSearchResults);
      mockPopulate = jest.fn().mockReturnValue({ sort: mockSort });
      (Branch.find as jest.Mock).mockReturnValue({ populate: mockPopulate });
    });

    it('should search branches with all parameters', async () => {
      const result = await searchBranches(
        'Acme',
        'something@domain.com',
        '',
        'ABC123',
        'branchName',
        'asc',
      );

      expect(Branch.find).toHaveBeenCalledWith({
        branchName: { $regex: 'Acme', $options: 'i' },
        branchEmail: { $regex: 'something@domain.com', $options: 'i' },
        supplierName: { $regex: 'ABC123', $options: 'i' },
      });
      expect(mockPopulate).toHaveBeenCalledWith(
        'suppliers',
        'companyName -_id',
      );
      expect(mockSort).toHaveBeenCalledWith({ branchName: 1 });
      expect(result).toEqual(mockSearchResults);
    });

    it('should search branches with only branch name', async () => {
      const result = await searchBranches(
        'Acme',
        '',
        '',
        '',
        'branchName',
        'desc',
      );

      expect(Branch.find).toHaveBeenCalledWith({
        branchName: { $regex: 'Acme', $options: 'i' },
      });
      expect(mockSort).toHaveBeenCalledWith({ branchName: -1 });
      expect(result).toEqual(mockSearchResults);
    });

    it('should handle search errors', async () => {
      const error = new Error('Search failed');
      mockSort.mockRejectedValue(error);

      await expect(
        searchBranches('Test', '', '', '', 'branchName', 'asc'),
      ).rejects.toThrow('Search failed');
    });

    it('should handle special regex characters in search terms', async () => {
      await searchBranches(
        'Test.Corp',
        'james@horizon.com',
        'ABC[123]',
        '',
        'branchName',
        'asc',
      );

      expect(Branch.find).toHaveBeenCalledWith({
        branchName: { $regex: 'Test.Corp', $options: 'i' },
        branchEmail: { $regex: 'james@horizon.com', $options: 'i' },
        mainContactName: { $regex: 'ABC[123]', $options: 'i' },
      });
    });
  });

  describe('deleteBranch', () => {
    it('should delete branch successfully', async () => {
      (Branch.findByIdAndDelete as jest.Mock).mockResolvedValue(mockBranch);

      const result = await deleteBranch('507f1f77bcf86cd799439011');

      expect(Branch.findByIdAndDelete).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
      );
      expect(result).toEqual(mockBranch);
    });

    it('should return null when deleting non-existent branch', async () => {
      (Branch.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      const result = await deleteBranch('nonexistent123');

      expect(Branch.findByIdAndDelete).toHaveBeenCalledWith('nonexistent123');
      expect(result).toBeNull();
    });

    it('should handle deletion errors', async () => {
      const error = new Error('Deletion failed');
      (Branch.findByIdAndDelete as jest.Mock).mockRejectedValue(error);

      await expect(deleteBranch('507f1f77bcf86cd799439011')).rejects.toThrow(
        'Deletion failed',
      );
      expect(Branch.findByIdAndDelete).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
      );
    });
  });
});
