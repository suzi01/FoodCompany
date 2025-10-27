import Branch from '../../../src/branches/branch.model';
import Supplier from '../../../src/suppliers/supplier.model';
import { toBranchesResponseDTO } from '../../../src/utils/mappers/branches.mapper';
import { toSupplierResponseDTO } from '../../../src/utils/mappers/supplier.mapper';

describe('Branch Service', () => {
  const mockBranch = {
    _id: '68d3d624eb3b2060dcc384f8',
    branchName: 'Test Branch',
    branchEmail: 'test.email@gmail.com',
    mainContactName: 'test contact',
    phoneNumber: '123-456-7890',
    address: '123 Test St, Test City, TX 12345',
    mainContactPhoneNumber: '123-456-7891',
    mainContactEmail: 'maintest.contact@gmail.com',
    suppliers: [],
    createdAt: new Date('2025-09-24T11:29:40.851Z'),
    updatedAt: new Date('2025-09-24T11:36:17.456Z'),
  };

  const mockBranchDto = {
    id: '68d3d624eb3b2060dcc384f8',
    branchName: 'Test Branch',
    branchEmail: 'test.email@gmail.com',
    mainContactName: 'test contact',
    phoneNumber: '123-456-7890',
    address: '123 Test St, Test City, TX 12345',
    mainContactPhoneNumber: '123-456-7891',
    mainContactEmail: 'maintest.contact@gmail.com',
    yearsActive: 0,
    suppliers: [],
    createdAt: '2025-09-24T11:29:40.851Z',
    updatedAt: '2025-09-24T11:36:17.456Z',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('branchMapper', () => {
    it('should map a branch to DTO', async () => {
      const fakeBranch = new Branch({ ...mockBranch });
      const result = toBranchesResponseDTO(fakeBranch);
      expect(result).toEqual(mockBranchDto);
    });
  });
});
