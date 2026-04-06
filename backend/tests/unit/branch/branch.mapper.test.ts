import { toBranchResponseDTO } from '../../../src/utils/mappers/branches.mapper';
import { buildBranch } from '../../factories/domin/branchFactory';

describe('Branch Service', () => {
  const mockBranch = buildBranch();

  const mockBranchDto = toBranchResponseDTO({
    branch: mockBranch,
    mode: 'single',
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('branchMapper', () => {
    it('should map a branch to DTO', async () => {
      const result = toBranchResponseDTO({
        branch: mockBranch,
        mode: 'single',
      });
      expect(result).toEqual(mockBranchDto);
    });
  });
});
