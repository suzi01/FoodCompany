import Product from '../../../src/products/product.model';

describe('Product Model test', () => {
  it('should throw validation error when email is missing', async () => {
    const product = new Product({ name: '' });

    await expect(product.validate()).rejects.toMatchObject({
      name: 'ValidationError',
      errors: expect.objectContaining({
        name: expect.objectContaining({
          message: expect.stringMatching(/Product name is required/),
        }),
      }),
    });
  });
  it('should throw validation error when price is not valid', async () => {
    const product = new Product({
      name: 'Test Product',
      description: 'Test Description',
      category: 'Test Category',
      idOrBarcode: 'TEST123',
      quantityInStock: 10,
      supplier: '507f1f77bcf86cd799439011',
      price: 'invalid price',
    });

    await expect(product.validate()).rejects.toMatchObject({
      name: 'ValidationError',
      errors: expect.objectContaining({
        price: expect.objectContaining({
          message: expect.stringMatching(
            /Cast to Number failed for value "invalid price"/,
          ),
        }),
      }),
    });
  });
  it('should throw validation error when company name is missing', async () => {
    const product = new Product({
      name: '',
      description: 'Test Description',
      category: 'Test Category',
      idOrBarcode: 'TEST123',
      quantityInStock: 10,
      supplier: '507f1f77bcf86cd799439011',
      price: 'invalid price',
    });

    await expect(product.validate()).rejects.toMatchObject({
      name: 'ValidationError',
      errors: expect.objectContaining({
        name: expect.objectContaining({
          message: expect.stringMatching(/Product name is required/),
        }),
      }),
    });
  });
});
