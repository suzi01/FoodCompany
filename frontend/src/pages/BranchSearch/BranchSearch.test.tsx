import { render, screen, userEvent } from '@/testUtils';
import { BranchSearch } from './BranchSearch';
import { MemoryRouter } from 'react-router-dom';

describe('BranchSearch Component', () => {
  it('renders SearchBar and TableFilter components', () => {
    render(
      <MemoryRouter>
        <BranchSearch />
      </MemoryRouter>,
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
  });

  it('updates search text on input change', async () => {
    render(
      <MemoryRouter>
        <BranchSearch />
      </MemoryRouter>,
    );

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Main');

    expect(input).toHaveValue('Main');
  });

  it('clears search text on clear button click', async () => {
    render(
      <MemoryRouter>
        <BranchSearch />
      </MemoryRouter>,
    );

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Main');
    expect(input).toHaveValue('Main');

    const clearButton = screen.getByRole('button', { name: /reset-search/i });
    await userEvent.click(clearButton);
    expect(input).toHaveValue('');
  });

  it('filters data based on status and search text', async () => {
    render(
      <MemoryRouter>
        <BranchSearch />
      </MemoryRouter>,
    );

    const inactiveStatusOption = screen.getByRole('button', {
      name: 'Inactive',
    });
    await userEvent.click(inactiveStatusOption);

    expect(screen.getByText('Uptown Branch')).toBeInTheDocument();
    expect(screen.getByText('Northside Branch')).toBeInTheDocument();
    expect(screen.queryByText('Downtown Branch')).not.toBeInTheDocument();

    const allStatusOption = screen.getByRole('button', { name: 'All' });
    await userEvent.click(allStatusOption);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Downtown');

    expect(screen.getByText('Downtown Branch')).toBeInTheDocument();
    expect(screen.queryByText('Uptown Branch')).not.toBeInTheDocument();
  });
});
