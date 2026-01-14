import { toProductResponseDTO } from '../../../src/utils/mappers/product.mapper';
import { buildProduct } from '../../factories/domin/productFactory';

const mockProducts = buildProduct();
const mockProductsDTO = toProductResponseDTO(mockProducts);

describe('Product mapper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('toProductResponseDTO', () => {
    it('should map a product to DTO', async () => {
      const fakeProduct = mockProducts;
      const result = toProductResponseDTO(fakeProduct);
      expect(result).toEqual(mockProductsDTO);
    });
  });
});
