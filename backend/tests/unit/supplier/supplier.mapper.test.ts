import { ISupplier } from "../../../src/suppliers/supplier.model";
import { toSupplierResponseDTO } from "../../../src/utils/mappers/supplier.mapper";

describe('Supplier Service', () => {
  const mockSupplier = {
    _id: '507f1f77bcf86cd799439011',
    companyName: 'Acme Corp',
    mainContactName: 'John Doe',
    email: 'test@example.com',
    phoneNumber: '123-456-7890',
    status: 'Active',
    productsProvided: [],
    branches: [],
    createdAt: new Date('2025-09-24T11:29:40.851Z'),
    updatedAt: new Date('2025-09-24T11:36:17.456Z'),
  };

  const mockSupplierDto = {
      id: '507f1f77bcf86cd799439011',
      companyName: 'Acme Corp',
      mainContactName: 'John Doe',
      email: 'test@example.com',
      phoneNumber: '123-456-7890',
      status: 'Active',
      productsProvided: [],
      branches: [],
      createdAt: new Date('2025-09-24T11:29:40.851Z').toISOString(),
      updatedAt: new Date('2025-09-24T11:36:17.456Z').toISOString(),
  } as unknown as ISupplier;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('supplierMapper', () => {
    it('should map a supplier to DTO', async () => {
      const result = toSupplierResponseDTO(mockSupplier);
      expect(result).toEqual(mockSupplierDto);
    });
  });

  
 

});