import { http, HttpResponse, HttpHandler } from 'msw';
import { GetProductsResponse, Product } from '@/models/Product';

export const getProducts = ({
  products,
}: {
  products: Product[];
}): HttpHandler => {
  return http.get(`${process.env.URL}/products`, () => {
    const body: GetProductsResponse = {
      success: true,
      data: products,
    };
    return HttpResponse.json(body, { status: 200 });
  });
};
