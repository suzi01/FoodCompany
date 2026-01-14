import Branch from '../../../src/branches/branch.model';
import { toBranchesResponseDTO } from '../../../src/utils/mappers/branches.mapper';
import { buildBranch } from '../../factories/domin/branchFactory';

describe('Branch Service', () => {
  const mockBranch = buildBranch();

  const mockBranchDto = toBranchesResponseDTO(mockBranch);

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
