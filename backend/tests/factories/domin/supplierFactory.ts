import { Types } from 'mongoose';
import { faker } from '@faker-js/faker';

import Supplier, { ISupplier } from '../../../src/suppliers/supplier.model';

export function buildSupplier(overrides: Partial<ISupplier> = {}): ISupplier {
  const supplier = new Supplier({
    _id: new Types.ObjectId(),
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
  });

  return supplier.toObject() as ISupplier;
}
