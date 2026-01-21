import { render, screen, userEvent } from '@/testUtils';
import { FilterAndSortForm } from './FilterAndSortForm';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import * as useUrlFiltersModule from '@/hooks/useUrlFilters/useUrlFilters';

describe('FilterAndSortForm', () => {
  const filterItems = ['Name', 'Location', 'Status'];

  test('renders filter inputs based on filterItems prop', () => {
    render(
      <MemoryRouter>
        <FilterAndSortForm filterItems={filterItems} />
      </MemoryRouter>,
    );

    filterItems.forEach((item) => {
      const input = screen.getByLabelText(item);
      expect(input).toBeInTheDocument();
    });
  });

  test('renders sort by select with correct options', () => {
    render(
      <MemoryRouter>
        <FilterAndSortForm filterItems={filterItems} />
      </MemoryRouter>,
    );

    const sortBySelect = screen.getByLabelText('Sort By');
    expect(sortBySelect).toBeInTheDocument();

    const options = ['A-Z', 'Z-A', 'Newest', 'Oldest'];
    options.forEach((option) => {
      expect(screen.getByRole('option', { name: option })).toBeInTheDocument();
    });
  });

  test('submits form and calls updateMultipleFilters with correct values', async () => {
    const mockUpdateMultipleFilters = vi.fn();

    vi.spyOn(useUrlFiltersModule, 'useUrlFilters').mockReturnValue({
      searchParams: new URLSearchParams(),
      updateFilter: vi.fn(),
      updateMultipleFilters: mockUpdateMultipleFilters,
    });

    render(
      <MemoryRouter>
        <FilterAndSortForm filterItems={filterItems} />
      </MemoryRouter>,
    );

    const nameInput = screen.getByLabelText('Name');
    const locationInput = screen.getByLabelText('Location');
    const statusInput = screen.getByLabelText('Status');
    const sortBySelect = screen.getByLabelText('Sort By');
    const orderSelect = screen.getByLabelText('Order');
    const submitButton = screen.getByRole('button', { name: /apply filters/i });

    await userEvent.type(nameInput, 'Test Name');
    await userEvent.type(locationInput, 'Test Location');
    await userEvent.type(statusInput, 'Active');
    await userEvent.selectOptions(sortBySelect, 'Email');
    await userEvent.selectOptions(orderSelect, 'A-Z');

    await userEvent.click(submitButton);

    expect(mockUpdateMultipleFilters).toHaveBeenCalledWith({
      name: 'Test Name',
      location: 'Test Location',
      status: 'Active',
      sortBy: 'email',
      order: 'a-z',
    });
  });
});
