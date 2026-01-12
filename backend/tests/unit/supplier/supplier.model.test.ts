import Supplier from '../../../src/suppliers/supplier.model';

describe('Supplier Model Test', () => {
  it('should throw validation error when email is missing', async () => {
    const supplier = new Supplier({ email: '' });

    await expect(supplier.validate()).rejects.toMatchObject({
      name: 'ValidationError',
      errors: expect.objectContaining({
        email: expect.objectContaining({
          message: expect.stringMatching(/Company email is required/),
        }),
      }),
    });
  });
  it('should throw validation error when email is not valid', async () => {
    const supplier = new Supplier({ email: 'invalid email' });

    await expect(supplier.validate()).rejects.toMatchObject({
      name: 'ValidationError',
      errors: expect.objectContaining({
        email: expect.objectContaining({
          message: expect.stringMatching(/Please fill a valid email address/),
        }),
      }),
    });
  });
  it('should throw validation error when company name is missing', async () => {
    const supplier = new Supplier({ companyName: '' });

    await expect(supplier.validate()).rejects.toMatchObject({
      name: 'ValidationError',
      errors: expect.objectContaining({
        companyName: expect.objectContaining({
          message: expect.stringMatching(/Company name is required/),
        }),
      }),
    });
  });
});
