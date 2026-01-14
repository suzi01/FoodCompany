import { faker } from '@faker-js/faker';

import { SupplierDto } from '../../../src/suppliers/dtos/supplier.dto';

export function buildProductDTO(
  overrides: Partial<SupplierDto> = {},
): SupplierDto {
  return {
    id: faker.string.uuid(),
    companyName: faker.company.name(),
    mainContactName: faker.person.fullName(),
    address: faker.location.streetAddress(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    status: faker.helpers.arrayElement(['Active', 'Inactive', 'Pending']),
    productsProvided: [faker.food.fruit()],
    branches: [],
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    ...overrides,
  };
}
