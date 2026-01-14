import { faker } from '@faker-js/faker';
import { GetProductsResponse, Product } from '../../../models/Product';

export const createProduct = (overrides = {}) => {
  return {
    id: faker.string.uuid(),
    name: faker.food.fruit(),
    idOrBarcode: faker.commerce.upc(),
    category: faker.food.ethnicCategory(),
    supplier: faker.string.uuid(),
    price: parseFloat(faker.commerce.price({ min: 0.5, max: 100, dec: 2 })),
    quantityInStock: faker.number.int({ min: 0, max: 1000 }),
    description: faker.food.description(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    ...overrides,
  };
};

export const createProducts = (count: number): Product[] => {
  const newProducts: Product[] = [];
  for (let i = 0; i < count; i++) {
    newProducts.push(createProduct());
  }
  return newProducts;
};

export const createGetProductsResponse = (
  count: number,
): GetProductsResponse => {
  const newProducts: Product[] = [];
  for (let i = 0; i < count; i++) {
    newProducts.push(createProduct());
  }
  return {
    success: true,
    data: newProducts,
  };
};
