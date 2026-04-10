import { render, screen } from '@/testUtils';
import { Table } from './Table';
import { MemoryRouter } from 'react-router-dom';

type RowType = { id: number; Name: string; Age: number; City: string };

describe('Table', () => {
  const headers = ['Name', 'Age', 'City'] as (keyof RowType)[];
  const rows: RowType[] = [
    { id: 1, Name: 'Alice', Age: 30, City: 'New York' },
    { id: 2, Name: 'Bob', Age: 25, City: 'Los Angeles' },
  ];

  it('renders table with headers and rows correctly without actions', () => {
    const columns = headers.map((header) => ({ key: header, label: header }));
    render(<Table columns={columns} rows={rows} actions={false} />);

    headers.forEach((header) => {
      expect(
        screen.getByRole('columnheader', { name: header }),
      ).toBeInTheDocument();
    });

    rows.forEach((row) => {
      headers.forEach((header) => {
        expect(screen.getByText(row[header] as string)).toBeInTheDocument();
      });
    });

    expect(screen.queryByTitle('Actions')).not.toBeInTheDocument();
  });

  it('renders table with headers and rows correctly with actions', () => {
    const columns = headers.map((header) => ({ key: header, label: header }));
    render(
      <MemoryRouter>
        <Table columns={columns} rows={rows} actions={true} />
      </MemoryRouter>,
    );

    headers.forEach((header) => {
      expect(
        screen.getByRole('columnheader', { name: header }),
      ).toBeInTheDocument();
    });

    expect(screen.getByTitle('Actions')).toBeInTheDocument();
  });
});
