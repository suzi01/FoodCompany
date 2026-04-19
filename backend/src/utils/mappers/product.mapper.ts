import { ProductDto } from '../../products/dtos/product.dto';
import { IProduct } from '../../products/product.model';

export const toProductResponseDTO = (product: IProduct): ProductDto => {
  const normalizeSupplier = (
    supplier: string | Object | null | undefined,
  ): string => {
    if (typeof supplier === 'string') return supplier;
    if (supplier && typeof supplier === 'object' && 'companyName' in supplier) {
      return supplier.companyName as string;
    }
    return '';
  };

  return {
    id: product._id.toString(),
    name: product.name,
    idOrBarcode: product.idOrBarcode,
    category: product.category,
    price: product.price,
    description: product.description,
    supplier: [normalizeSupplier(product.supplier)],
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };
};
