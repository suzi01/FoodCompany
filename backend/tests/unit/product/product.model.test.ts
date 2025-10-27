import Product from '../../../src/products/product.model';

describe('Product Model test', () => {
  it('should throw validation error when email is missing', async () => {
    const product = new Product({ name: '' });

    try {
      await product.validate();
    } catch (error: any) {
      expect(error.errors.name).toBeDefined();
      expect(error.errors.name.message).toMatch('Product name is required');
    }
  });
  it('should throw validation error when price is not valid', async () => {
    const product = new Product({ price: 'invalid price' });

    try {
      await product.validate();
    } catch (error: any) {
      expect(error.errors.price).toBeDefined();
      expect(error.errors.price.message).toBe(
        'Cast to Number failed for value "invalid price" (type string) at path "price"',
      );
    }
  });
  it('should throw validation error when company name is missing', async () => {
    const product = new Product({ name: '' });

    try {
      await product.validate();
    } catch (error: any) {
      expect(error.errors.name).toBeDefined();
      expect(error.errors.name.message).toMatch('Product name is required');
    }
  });
});
