import { getBranch } from '@/mocks/endpoints/branches';
import { server } from '@/mocks/node';
import { render, screen, userEvent } from '@/testUtils';

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

  const mockBranchWithSuppliers = {
    ...mockBranchData,
    suppliers: [
      {
        id: 'supplier-1',
        companyName: 'Supplier One',
        status: 'active',
      },
    ],
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

  it('does not render Accordion when branch has no suppliers', async () => {
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

    await screen.findByRole('textbox', { name: /Branch Name/i });
    expect(screen.queryByText(/Supplier One/)).not.toBeInTheDocument();
  });

  it('renders Accordion with supplier when branch has suppliers', async () => {
    server.use(getBranch({ branch: mockBranchWithSuppliers }));

    render(
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter initialEntries={[`/branches/${mockBranchData.id}/edit`]}>
          <Routes>
            <Route path="/branches/:id/edit" element={<EditBranchDetails />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(await screen.findByText('Supplier One')).toBeInTheDocument();
  });

  it('toggles Accordion open and closed on click', async () => {
    server.use(getBranch({ branch: mockBranchWithSuppliers }));

    render(
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter initialEntries={[`/branches/${mockBranchData.id}/edit`]}>
          <Routes>
            <Route path="/branches/:id/edit" element={<EditBranchDetails />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await screen.findByText('Supplier One');
    const expandButton = screen.getByAltText('Expand');

    expect(expandButton).not.toHaveClass('rotate-180');
    await userEvent.click(expandButton);
    expect(expandButton).toHaveClass('rotate-180');
  });

  it('renders "Add another supplier" section', async () => {
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
      await screen.findByText('Add another supplier?'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Connecting more suppliers allows/),
    ).toBeInTheDocument();
  });

  it('renders "Add a new supplier" link with correct href', async () => {
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

    const link = await screen.findByRole('link', {
      name: /Add a new supplier/i,
    });
    expect(link).toHaveAttribute('href', '/branches/add-supplier');
  });

  it('displays all form fields with correct branch data', async () => {
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
    expect(screen.getByRole('textbox', { name: /^Email$/i })).toHaveValue(
      'testbranch@example.com',
    );
  });

  it('renders branch details form only after successful fetch', async () => {
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
    ).toBeInTheDocument();
  });
});
