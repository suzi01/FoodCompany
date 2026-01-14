import { http, HttpResponse, HttpHandler } from 'msw';
import { GetSuppliersResponse, Supplier } from '@/models/Supplier';

export const getSuppliers = ({
  suppliers,
}: {
  suppliers: Supplier[];
}): HttpHandler => {
  return http.get(`${process.env.URL}/suppliers`, () => {
    const body: GetSuppliersResponse = {
      success: true,
      data: suppliers,
    };
    return HttpResponse.json(body, { status: 200 });
  });
};
