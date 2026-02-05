import { render, screen } from '@/testUtils';
import { MemoryRouter } from 'react-router-dom';
import { TableRow } from './TableRow';

describe('TableRow', () => {
  it('renders a row with string, number, and array values', () => {
    const rowItems = [{ name: 'Apple', quantity: 5, tags: ['fruit', 'food'] }];
    render(
      <table>
        <tbody>
          <TableRow
            rowItems={rowItems}
            headers={['name', 'quantity', 'tags']}
          />
        </tbody>
      </table>,
    );
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('fruit, food')).toBeInTheDocument();
  });

  it('renders StatusBadge for status values', () => {
    const rowItems = [
      { status: 'active', name: 'Banana' },
      { status: 'pending', name: 'Orange' },
    ];
    render(
      <table>
        <tbody>
          <TableRow rowItems={rowItems} headers={['status', 'name']} />
        </tbody>
      </table>,
    );
    expect(screen.getByText('active')).toBeInTheDocument();
    expect(screen.getByText('pending')).toBeInTheDocument();
  });

  it('renders actions column when actions prop is true', async () => {
    const rowItems = [{ id: 1, name: 'Pear', status: 'inactive' }];
    render(
      <MemoryRouter>
        <table>
          <tbody>
            <TableRow
              rowItems={rowItems}
              actions
              headers={['status', 'name']}
            />
          </tbody>
        </table>
      </MemoryRouter>,
    );
    const actionButton = screen.getByText('•••');
    expect(actionButton).toBeInTheDocument();
  });

  it('does not render actions column when actions prop is false', () => {
    const rowItems = [{ id: 1, name: 'Pear', status: 'inactive' }];
    render(
      <table>
        <tbody>
          <TableRow rowItems={rowItems} headers={['status', 'name']} />
        </tbody>
      </table>,
    );
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('renders multiple rows', () => {
    const rowItems = [
      { id: 1, name: 'Apple', status: 'active' },
      { id: 2, name: 'Banana', status: 'inactive' },
    ];
    render(
      <table>
        <tbody>
          <TableRow rowItems={rowItems} headers={['name', 'status']} />
        </tbody>
      </table>,
    );
    expect(screen.getAllByRole('row')).toHaveLength(2);
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  it('renders unknown values as strings', () => {
    const rowItems = [{ value: null, another: undefined }];
    render(
      <table>
        <tbody>
          <TableRow rowItems={rowItems} headers={['value', 'another']} />
        </tbody>
      </table>,
    );
    expect(screen.getByText('null')).toBeInTheDocument();
    expect(screen.getByText('undefined')).toBeInTheDocument();
  });
});
