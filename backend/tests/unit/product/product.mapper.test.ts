
import Product from '../../../src/products/product.model';
import { toProductResponseDTO } from '../../../src/utils/mappers/product.mapper';

jest.mock('../../../src/products/product.service');

const mockProducts = [
  {
    _id: '507f1f77bcf86cd799439011',
    name: 'Test Product',
    idOrBarcode: '123456789',
    category: 'Fruit',
    supplier: '507f191e810c19729de860ea',
    price: 2.99,
    quantityInStock: 100,
    description: 'A test product',
    createdAt: new Date('2025-09-24T11:29:40.851Z'),
    updatedAt: new Date('2025-09-24T11:36:17.456Z'),
  },
  {
    _id: '507f1f77bcf86cd799439012',
    name: 'Another Product',
    idOrBarcode: '987654321',
    category: 'Fruit',
    supplier: '507f191e810c19729de860eb',
    price: 5.99,
    quantityInStock: 50,
    description: 'Another test product',
    createdAt: new Date('2025-10-24T11:29:40.851Z'),
    updatedAt: new Date('2025-10-24T11:36:17.456Z'),
  },
];

const mockProductsDto = [
  {
    id: '507f1f77bcf86cd799439011',
    name: 'Test Product',
    idOrBarcode: '123456789',
    category: 'Fruit',
    supplier: '507f191e810c19729de860ea',
    price: 2.99,
    quantityInStock: 100,
    description: 'A test product',
    createdAt: '2025-09-24T11:29:40.851Z',
    updatedAt: '2025-09-24T11:36:17.456Z',
  },
  {
    id: '507f1f77bcf86cd799439012',
    name: 'Another Product',
    idOrBarcode: '987654321',
    category: 'Fruit',
    supplier: '507f191e810c19729de860eb',
    price: 5.99,
    quantityInStock: 50,
    description: 'Another test product',
    createdAt: '2025-10-24T11:29:40.851Z',
    updatedAt: '2025-10-24T11:36:17.456Z',
  },
];

describe('Product mapper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('toProductResponseDTO', () => {
    it('should map a product to DTO', async () => {
      const fakeProduct = new Product({ ...mockProducts[0] });
      const result = toProductResponseDTO(fakeProduct);
      expect(result).toEqual(mockProductsDto[0]);
    });
  });
});
