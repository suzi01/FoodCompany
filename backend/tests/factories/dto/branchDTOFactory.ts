import { faker } from '@faker-js/faker';

import { BranchDto } from '../../../src/branches/dtos/branch.dto';

export function buildBranchDTO(overrides: Partial<BranchDto> = {}): BranchDto {
  return {
    id: faker.string.uuid(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    branchName: faker.company.name(),
    mainContactName: faker.person.fullName(),
    mainContactPhoneNumber: faker.phone.number(),
    mainContactEmail: faker.internet.email(),
    branchEmail: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    address: faker.location.streetAddress(),
    yearsActive: faker.number.int({ min: 0, max: 100 }),
    suppliers: [],
    ...overrides,
  };
}
