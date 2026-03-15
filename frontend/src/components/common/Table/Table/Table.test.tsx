import React from 'react';
import { render, screen } from '@/testUtils';
import { Table } from './Table';
import { MemoryRouter } from 'react-router-dom';

type RowType = { id: number; name: string; age: number; city: string };

describe('Table', () => {
  const headers = ['name', 'age', 'city'] as (keyof RowType)[];
  const rows: RowType[] = [
    { id: 1, name: 'Alice', age: 30, city: 'New York' },
    { id: 2, name: 'Bob', age: 25, city: 'Los Angeles' },
  ];

  it('renders table with headers and rows correctly without actions', () => {
    render(<Table headers={headers} rows={rows} actions={false} />);

    headers.forEach((header) => {
      expect(
        screen.getByRole('columnheader', { name: header }),
      ).toBeInTheDocument();
    });

    rows.forEach((row) => {
      Object.values(row).forEach((value) => {
        expect(screen.getByText(value as string)).toBeInTheDocument();
      });
    });

    expect(screen.queryByTitle('Actions')).not.toBeInTheDocument();
  });

  it('renders table with headers and rows correctly with actions', () => {
    render(
      <MemoryRouter>
        <Table headers={headers} rows={rows} actions={true} />
      </MemoryRouter>,
    );

    headers.forEach((header) => {
      expect(
        screen.getByRole('columnheader', { name: header }),
      ).toBeInTheDocument();
    });

    rows.forEach((row) => {
      Object.values(row).forEach((value) => {
        expect(screen.getByText(value as string)).toBeInTheDocument();
      });
    });

    expect(screen.getByTitle('Actions')).toBeInTheDocument();
  });
});
