import { faker } from '@faker-js/faker';
import { ProductDto } from '../../../src/products/dtos/product.dto';

export function buildProductDTO(
  overrides: Partial<ProductDto> = {},
): ProductDto {
  return {
    id: faker.string.uuid(),
    name: faker.food.fruit(),
    idOrBarcode: faker.commerce.isbn(),
    category: faker.food.ethnicCategory(),
    supplier: faker.string.uuid(),
    price: parseFloat(faker.commerce.price({ min: 0.5, max: 100, dec: 2 })),
    quantityInStock: faker.number.int({ min: 0, max: 1000 }),
    description: faker.food.description(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    ...overrides,
  };
}
