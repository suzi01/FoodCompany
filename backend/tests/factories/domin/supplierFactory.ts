import { Types } from 'mongoose';
import { faker } from '@faker-js/faker';

import Supplier, { ISupplier } from '../../../src/suppliers/supplier.model';

export function buildSupplier(overrides: Partial<ISupplier> = {}): ISupplier {
  return {
    _id: new Types.ObjectId(),
    companyName: faker.company.name(),
    mainContactName: faker.person.fullName(),
    address: faker.location.streetAddress(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    status: faker.helpers.arrayElement(['Active', 'Inactive', 'Pending']),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    ...overrides,
  } as ISupplier;
}
