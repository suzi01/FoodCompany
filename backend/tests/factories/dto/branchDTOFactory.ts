import { faker } from '@faker-js/faker';
import { Types } from 'mongoose';

import { CreateBranchDto } from '../../../src/branches/dtos/create-branch.dto';

export function buildBranchDTO(
  overrides: Partial<CreateBranchDto> = {},
): CreateBranchDto {
  return {
    branchName: faker.company.name(),
    mainContactName: faker.person.fullName(),
    mainContactPhoneNumber: faker.phone.number(),
    mainContactEmail: faker.internet.email(),
    branchEmail: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    address: faker.location.streetAddress(),
    suppliers: [],
    yearsActive: faker.number.int({ min: 0, max: 50 }),
    inventory: [
      {
        product: new Types.ObjectId().toString(),
        quantity: faker.number.int({ min: 0, max: 100 }),
        lastRestocked: faker.date.recent().toISOString(),
      },
    ],
    ...overrides,
  };
}
