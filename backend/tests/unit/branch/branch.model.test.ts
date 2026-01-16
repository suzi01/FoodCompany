import Branch from '../../../src/branches/branch.model';
import { buildBranchDTO } from '../../factories/dto/branchDTOFactory';

describe('Branch Model Test', () => {
  it('should throw validation error when email is missing', async () => {
    const branch = new Branch({ email: '' });

    await expect(branch.validate()).rejects.toMatchObject({
      name: 'ValidationError',
      errors: expect.objectContaining({
        branchEmail: expect.objectContaining({
          message: expect.stringMatching(/Branch email is required/),
        }),
      }),
    });
  });

  it('should throw validation error when email is not valid', async () => {
    const branch = new Branch({
      ...buildBranchDTO({ branchEmail: 'invalid-email' }),
    });

    await expect(branch.validate()).rejects.toMatchObject({
      name: 'ValidationError',
      errors: expect.objectContaining({
        branchEmail: expect.objectContaining({
          message: expect.stringMatching(/Please fill a valid email address/),
        }),
      }),
    });
  });
  it('should throw validation error when branch name is missing', async () => {
    const branch = new Branch({ branchName: '' });

    await expect(branch.validate()).rejects.toMatchObject({
      name: 'ValidationError',
      errors: expect.objectContaining({
        branchName: expect.objectContaining({
          message: expect.stringMatching(/Branch name is required/),
        }),
      }),
    });
  });
});
