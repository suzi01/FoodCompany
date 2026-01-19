import React from 'react';
import { render, screen } from '@/testUtils';
import { Table } from './Table';
import { MemoryRouter } from 'react-router-dom';

describe('Table', () => {
  const headers = ['Name', 'Age', 'Status'];
  const rows = [
    { Name: 'Alice', Age: 30, Status: 'Active' },
    { Name: 'Bob', Age: 25, Status: 'Inactive' },
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
