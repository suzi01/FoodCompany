import Supplier from '../../../src/suppliers/supplier.model';

describe('Supplier Model Test', () => {
  it('should throw validation error when email is missing', async () => {
    const supplier = new Supplier({ email: '' });

    try {
      await supplier.validate();
    } catch (error: any) {
      expect(error.errors.email).toBeDefined();
      expect(error.errors.email.message).toMatch(/Company email is required/);
    }
  });
  it('should throw validation error when email is not valid', async () => {
    const supplier = new Supplier({ email: 'invalid email' });

    try {
      await supplier.validate();
    } catch (error: any) {
      expect(error.errors.email).toBeDefined();
      expect(error.errors.email.message).toMatch(
        /Please fill a valid email address/,
      );
    }
  });
  it.only('should throw validation error when company name is missing', async () => {
    const supplier = new Supplier({ companyName: '' });

    try {
      await supplier.validate();
    } catch (error: any) {
      expect(error.errors.companyName).toBeDefined();
      expect(error.errors.companyName.message).toMatch(
        'Company name is required',
      );
    }
  });
});
