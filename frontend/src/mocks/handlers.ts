import { HttpHandler } from 'msw';

import { Supplier } from '@/models/Supplier';
import { Product } from '@/models/Product';
import { Branch } from '@/models/Branch';
import { getSuppliers } from './endpoints/suppliers';
import { getProducts } from './endpoints/products';
import { getBranches } from './endpoints/branches';
import { createSuppliers } from '@/testUtils/dataFactories/Supplier/Supplier';
import { createProducts } from '@/testUtils/dataFactories/Product/Product';
import { createBranches } from '@/testUtils/dataFactories/Branch/Branch';

type Handler = ({
  suppliers,
  products,
  branches,
}?: {
  suppliers?: Supplier[];
  products?: Product[];
  branches?: Branch[];
}) => HttpHandler[];

const defaultSuppliers: Supplier[] = createSuppliers(5);
const defaultProducts: Product[] = createProducts(5);
const defaultBranches: Branch[] = createBranches(5);

export const testHandlers: Handler = ({
  suppliers = defaultSuppliers,
  products = defaultProducts,
  branches = defaultBranches,
} = {}) => [
  getSuppliers({ suppliers }),
  getProducts({ products }),
  getBranches({ branches }),
];
