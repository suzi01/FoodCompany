import { faker } from '@faker-js/faker';
import { GetSuppliersResponse, Supplier } from '../../../models/Supplier';

const supplierStatusValues = ['Active', 'Inactive', 'Pending'] as const;

export const createSupplier = (overrides = {}) => {
  const randomNumber = Math.floor(Math.random() * 3) + 1;
  return {
    id: faker.string.uuid(),
    companyName: faker.company.name(),
    mainContactName: faker.person.fullName(),
    address: faker.location.streetAddress(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    status: supplierStatusValues[randomNumber],
    productsProvided: [],
    branches: [],
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    ...overrides,
  };
};

export const createSuppliers = (count: number): Supplier[] => {
  const newSuppliers: Supplier[] = [];
  for (let i = 0; i < count; i++) {
    newSuppliers.push(createSupplier());
  }
  return newSuppliers;
};

export const createGetSuppliersResponse = (
  count: number,
): GetSuppliersResponse => {
  const newSuppliers: Supplier[] = [];
  for (let i = 0; i < count; i++) {
    newSuppliers.push(createSupplier());
  }
  return {
    success: true,
    data: newSuppliers,
  };
};
