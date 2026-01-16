import Supplier from '../../../src/suppliers/supplier.model';
import { toSupplierResponseDTO } from '../../../src/utils/mappers/supplier.mapper';
import { buildSupplier } from '../../factories/domin/supplierFactory';

const mockSupplier = buildSupplier();
const mockSupplierDto = toSupplierResponseDTO(mockSupplier);

describe('Supplier mappers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('supplierMapper', () => {
    it('should map a supplier to DTO', async () => {
      const fakeSupplier = new Supplier({ ...mockSupplier });
      const result = toSupplierResponseDTO(fakeSupplier);
      expect(result).toEqual(mockSupplierDto);
    });
  });
});
