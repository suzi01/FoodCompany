import { Types } from 'mongoose';
import Product, { IProduct } from '../../../src/products/product.model';
import { faker } from '@faker-js/faker';

interface ProductProps {
  _id: Types.ObjectId;
  name: string;
  idOrBarcode: string;
  description: string;
  price: number;
  category: string;
  supplier: Types.ObjectId;
  quantityInStock: number;
  createdAt: Date;
  updatedAt: Date;
}

export function buildProduct(overrides: Partial<ProductProps> = {}): IProduct {
  const product = new Product({
    _id: new Types.ObjectId(),
    name: faker.food.fruit(),
    idOrBarcode: faker.commerce.isbn(),
    category: faker.food.ethnicCategory(),
    supplier: new Types.ObjectId(),
    price: parseFloat(faker.commerce.price({ min: 0.5, max: 100, dec: 2 })),
    quantityInStock: faker.number.int({ min: 0, max: 1000 }),
    description: faker.food.description(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    ...overrides,
  });

  return product.toObject() as IProduct;
}
