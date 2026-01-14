import { http, HttpResponse, HttpHandler } from 'msw';
import { Branch, GetBranchesResponse } from '@/models/Branch';

export const getBranches = ({
  branches,
}: {
  branches: Branch[];
}): HttpHandler => {
  return http.get(`${process.env.URL}/branches`, () => {
    const body: GetBranchesResponse = {
      success: true,
      data: branches,
    };
    return HttpResponse.json(body, { status: 200 });
  });
};
