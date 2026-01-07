export interface Product {
  id: string;
  name: string;
  category: string;
  idOrBarcode: string;
  supplier: string;
  price: number;
  quantityInStock: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetProductsResponse {
  success: boolean;
  data: Product[];
}
