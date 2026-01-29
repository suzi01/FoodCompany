import { render, screen } from '@/testUtils';
import userEvent from '@testing-library/user-event';
import { TableFilter } from './TableFilter';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

describe('TableFilter Component', () => {
  const mockSetFilterStatus = vi.fn();
  const filterItems = ['View', 'Edit', 'Delete'];

  beforeEach(() => {
    mockSetFilterStatus.mockClear();
  });

  it('renders filter buttons correctly on desktop', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    render(
      <MemoryRouter>
        <TableFilter
          filteredStatus="All"
          hasStatusFilter={true}
          setFilterStatus={mockSetFilterStatus}
          filterItems={filterItems}
        />
      </MemoryRouter>,
    );

    const allButton = screen.getByRole('button', { name: 'All' });
    const pendingButton = screen.getByRole('button', { name: 'Pending' });
    const inactiveButton = screen.getByRole('button', { name: 'Inactive' });

    expect(allButton).toBeInTheDocument();
    expect(pendingButton).toBeInTheDocument();
    expect(inactiveButton).toBeInTheDocument();
  });

  it('renders filter select correctly on mobile', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 640,
    });

    render(
      <MemoryRouter>
        <TableFilter
          hasStatusFilter={true}
          filteredStatus="All"
          setFilterStatus={mockSetFilterStatus}
          filterItems={filterItems}
        />
      </MemoryRouter>,
    );

    const select = screen.getByDisplayValue('All');
    expect(select).toBeInTheDocument();

    expect(screen.getByRole('option', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Pending' })).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: 'Inactive' }),
    ).toBeInTheDocument();
  });

  it('calls setFilterStatus on button click', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    render(
      <MemoryRouter>
        <TableFilter
          hasStatusFilter={true}
          filteredStatus="All"
          setFilterStatus={mockSetFilterStatus}
          filterItems={filterItems}
        />
        ,
      </MemoryRouter>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Pending' }));
    expect(mockSetFilterStatus).toHaveBeenCalledWith('Pending');

    await userEvent.click(screen.getByRole('button', { name: 'Inactive' }));
    expect(mockSetFilterStatus).toHaveBeenCalledWith('Inactive');

    await userEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(mockSetFilterStatus).toHaveBeenCalledWith('All');
  });

  it('renders filter items in dropdown menu', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    render(
      <MemoryRouter>
        <TableFilter hasStatusFilter={false} filterItems={filterItems} />,
      </MemoryRouter>,
    );

    await userEvent.click(screen.getByText(/filter/i));

    filterItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('renders filter and sort button and export button', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    render(
      <MemoryRouter>
        <TableFilter hasStatusFilter={false} filterItems={filterItems} />
      </MemoryRouter>,
    );

    const filterButton = screen.getByText(/filter & sort/i);
    const exportButton = screen.getByText(/export/i);

    expect(filterButton).toBeInTheDocument();
    expect(exportButton).toBeInTheDocument();
  });
});
