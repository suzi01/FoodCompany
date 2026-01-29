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
    ...overrides,
  };
}
