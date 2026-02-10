import { ProductDto } from '../../products/dtos/product.dto';
import { IProduct } from '../../products/product.model';

export const toProductResponseDTO = (product: IProduct): ProductDto => {
  return {
    id: product._id.toString(),
    name: product.name,
    idOrBarcode: product.idOrBarcode,
    category: product.category,
    supplier: product.supplier.toString(),
    price: product.price,
    description: product.description,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };
};
