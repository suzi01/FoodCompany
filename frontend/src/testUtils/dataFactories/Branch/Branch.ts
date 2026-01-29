import { faker } from '@faker-js/faker';
import { Branch, GetBranchesResponse } from '@/models/Branch';

export const createBranch = (overrides = {}) => {
  return {
    id: faker.string.uuid(),
    branchName: faker.company.name(),
    mainContactName: faker.person.fullName(),
    mainContactPhoneNumber: faker.phone.number(),
    mainContactEmail: faker.internet.email(),
    branchEmail: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    address: faker.location.streetAddress(),
    yearsActive: faker.number.int({ min: 0, max: 100 }),
    suppliers: [],
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    ...overrides,
  };
};

export const createBranchWithSupplier = (overrides = {}) => {
  return {
    id: faker.string.uuid(),
    branchName: faker.company.name(),
    mainContactName: faker.person.fullName(),
    mainContactPhoneNumber: faker.phone.number(),
    mainContactEmail: faker.internet.email(),
    branchEmail: faker.internet.email(),
    phoneNumber: faker.phone.number(),
    address: faker.location.streetAddress(),
    yearsActive: faker.number.int({ min: 0, max: 100 }),
    suppliers: [
      {
        id: faker.string.uuid(),
        companyName: faker.company.name(),
        status: faker.helpers.arrayElement(['active', 'inactive', 'pending']),
      },
    ],
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    ...overrides,
  };
};

export const createBranches = (count: number): Branch[] => {
  const newBranches: Branch[] = [];
  for (let i = 0; i < count; i++) {
    newBranches.push(createBranch());
  }
  return newBranches;
};

export const createGetBranchesResponse = (
  count: number,
): GetBranchesResponse => {
  const newBranches: Branch[] = [];
  for (let i = 0; i < count; i++) {
    newBranches.push(createBranch());
  }
  return {
    success: true,
    data: newBranches,
  };
};
