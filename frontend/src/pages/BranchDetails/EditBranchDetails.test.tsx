import { getBranch } from '@/mocks/endpoints/branches';
import { server } from '@/mocks/node';
import { render, screen } from '@/testUtils';

import { EditBranchDetails } from './EditBranchDetails';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HttpResponse, delay, http } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';

describe('EditBranchDetails', () => {
  const mockBranchData = {
    id: '1',
    branchName: 'Test Branch',
    yearsActive: 10,
    phoneNumber: '123-456-7890',
    address: '123 Test St',
    branchEmail: 'testbranch@example.com',
    mainContactName: 'Test Doe',
    mainContactPhoneNumber: '098-765-4321',
    mainContactEmail: 'testdoe@example.com',
    suppliers: [],
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders loader while fetching branch details', () => {
    server.use(
      http.get(`${import.meta.env.VITE_URL}branches/:id`, async () => {
        await delay('infinite');
        return HttpResponse.json({});
      }),
    );

    render(
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter initialEntries={[`/branches/${mockBranchData.id}/edit`]}>
          <Routes>
            <Route path="/branches/:id/edit" element={<EditBranchDetails />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(document.querySelector('.mantine-Loader-root')).toBeInTheDocument();
  });

  it('renders EditBranchForm on successful fetch', async () => {
    server.use(getBranch({ branch: mockBranchData }));

    render(
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter initialEntries={[`/branches/${mockBranchData.id}/edit`]}>
          <Routes>
            <Route path="/branches/:id/edit" element={<EditBranchDetails />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(
      await screen.findByRole('textbox', { name: /Branch Name/i }),
    ).toHaveValue('Test Branch');
  });
});
