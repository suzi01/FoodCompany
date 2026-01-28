import { http, HttpResponse, HttpHandler } from 'msw';
import { Branch, GetBranchesResponse } from '@/models/Branch';

export const getBranches = ({
  branches,
}: {
  branches: Branch[];
}): HttpHandler => {
  return http.get(`${import.meta.env.VITE_URL}branches/search*`, () => {
    const body: GetBranchesResponse = {
      success: true,
      data: branches,
    };
    return HttpResponse.json(body, { status: 200 });
  });
};

export const getBranch = ({ branch }: { branch: Branch }): HttpHandler => {
  return http.get(
    `${import.meta.env.VITE_URL}branches/:id`,
    async ({ params }) => {

      if (params.id !== branch.id) {
        return HttpResponse.json(
          {
            success: false,
            message: `Branch with ID ${params.id} not found`,
          },
          { status: 404 },
        );
      }
      const body = {
        success: true,
        data: branch,
      };
      return HttpResponse.json(body, { status: 200 });
    },
  );
};

export const getBranchesError = (): HttpHandler => {
  return http.get(`${import.meta.env.VITE_URL}branches/search*`, () => {
    return HttpResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    );
  });
};
