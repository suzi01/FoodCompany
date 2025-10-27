import Branch from '../../../src/branches/branch.model';

describe('Branch Model Test', () => {
  it('should throw validation error when email is missing', async () => {
    const branch = new Branch({ email: '' });

    try {
      await branch.validate();
    } catch (error: any) {
      expect(error.errors.branchEmail).toBeDefined();
      expect(error.errors.branchEmail.message).toMatch(
        /Branch email is required/,
      );
    }
  });
  it('should throw validation error when email is not valid', async () => {
    const branch = new Branch({
      id: '68d3d624eb3b2060dcc384f8',
      branchName: 'Test Branch',
      branchEmail: 'test email',
      mainContactName: 'test contact',
      phoneNumber: '123-456-7890',
      address: '123 Test St, Test City, TX 12345',
      mainContactPhoneNumber: '123-456-7891',
      mainContactEmail: 'maintest.contact@gmail.com',
      yearsActive: 0,
      suppliers: [],
      createdAt: '2025-09-24T11:29:40.851Z',
      updatedAt: '2025-09-24T11:36:17.456Z',
    });

    try {
      await branch.validate();
    } catch (error: any) {
      expect(error.errors.branchEmail).toBeDefined();
      expect(error.errors.branchEmail.message).toMatch(
        /Please fill a valid email address/,
      );
    }
  });
  it('should throw validation error when branch name is missing', async () => {
    const branch = new Branch({ branchName: '' });

    try {
      await branch.validate();
    } catch (error: any) {
      expect(error.errors.branchName).toBeDefined();
      expect(error.errors.branchName.message).toMatch(
        'Branch name is required',
      );
    }
  });
});
