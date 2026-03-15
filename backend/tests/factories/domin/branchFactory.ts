import { faker } from '@faker-js/faker';
import { Types } from 'mongoose';

import Branch, { IBranch } from '../../../src/branches/branch.model';

export function buildBranch(overrides: Partial<IBranch> = {}): IBranch {
  const branch = new Branch({
    _id: new Types.ObjectId(),
    branchName: faker.company.name(),
    mainContactName: faker.person.fullName(),
    mainContactPhoneNumber: faker.phone.number({ style: 'national' }),
    mainContactEmail: faker.internet.email(),
    branchEmail: faker.internet.email(),
    phoneNumber: faker.phone.number({ style: 'national' }),
    address: faker.location.streetAddress(),
    yearsActive: faker.number.int({ min: 1, max: 50 }),
    suppliers: [new Types.ObjectId()],
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    inventory: [
      {
        product: new Types.ObjectId(),
        quantity: faker.number.int({ min: 0, max: 100 }),
        lastRestocked: faker.date.recent().toISOString(),
      },
    ],
    ...overrides,
  });

  return branch.toObject() as IBranch;
}
