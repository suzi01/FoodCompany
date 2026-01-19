import { render, screen } from '@/testUtils';
import userEvent from '@testing-library/user-event';
import { TableFilter } from './TableFilter';
import { vi } from 'vitest';

describe('TableFilter Component', () => {
  const mockSetFilterStatus = vi.fn();
  const filterItems = ['View', 'Edit', 'Delete'];

  beforeEach(() => {
    mockSetFilterStatus.mockClear();
  });

  it('renders filter buttons correctly', () => {
    render(
      <TableFilter
        filterStatus="All"
        setFilterStatus={mockSetFilterStatus}
        filterItems={filterItems}
      />,
    );

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('Inactive')).toBeInTheDocument();
  });

  it('calls setFilterStatus on button click', async () => {
    render(
      <TableFilter
        filterStatus="All"
        setFilterStatus={mockSetFilterStatus}
        filterItems={filterItems}
      />,
    );

    await userEvent.click(screen.getByText('Pending'));
    expect(mockSetFilterStatus).toHaveBeenCalledWith('Pending');

    await userEvent.click(screen.getByText('Inactive'));
    expect(mockSetFilterStatus).toHaveBeenCalledWith('Inactive');

    await userEvent.click(screen.getByText('All'));
    expect(mockSetFilterStatus).toHaveBeenCalledWith('All');
  });

  it('renders filter items in dropdown menu', async () => {
    render(
      <TableFilter
        filterStatus="All"
        setFilterStatus={mockSetFilterStatus}
        filterItems={filterItems}
      />,
    );

    await userEvent.click(screen.getByText(/filter/i));

    filterItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });
});
