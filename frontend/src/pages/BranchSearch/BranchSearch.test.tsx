import { getBranchesError } from '@/mocks/endpoints/branches';
import { server } from '@/mocks/node';
import { render, screen, userEvent } from '@/testUtils';
import { SearchParamsCapture } from '@/testUtils/SearchParamsCapture';
import { BranchSearch } from './BranchSearch';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { delay, http, HttpResponse } from 'msw';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

describe('BranchSearch Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it.only('renders SearchBar and TableFilter components', () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter>
          <BranchSearch />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('updates search text on input change', async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter>
          <BranchSearch />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Main');

    expect(input).toHaveValue('Main');
  });

  it('submits search form and updates URL parameters', async () => {
    let capturedParams = '';

    render(
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter>
          <SearchParamsCapture
            onParamsChange={(params) => {
              capturedParams = params;
            }}
          />
          <BranchSearch />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Main{enter}');

    expect(capturedParams).toBe('branchName=Main');
  });

  it('shows loader while fetching data', async () => {
    server.use(
      http.get(`${import.meta.env.VITE_URL}branches/search*`, async () => {
        await delay('infinite');
        return HttpResponse.json({});
      }),
    );

    render(
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter>
          <BranchSearch />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(document.querySelector('.mantine-Loader-root')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('displays error message on fetch failure', async () => {
    server.use(getBranchesError());

    render(
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter>
          <BranchSearch />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const errorMessage = await screen.findByText(
      /An error occured while fetching branches. Please try again/i,
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('clears search text on clear button click', async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter>
          <BranchSearch />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Main');
    expect(input).toHaveValue('Main');

    const clearButton = screen.getByRole('button', { name: /reset-search/i });
    await userEvent.click(clearButton);
    expect(input).toHaveValue('');
  });
});
