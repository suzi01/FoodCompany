import React from 'react';
import { render, screen } from '@/testUtils';
import { TableHeader } from './TableHeader';

describe('TableHeader', () => {
  const headers = ['Name', 'Age', 'Status'];

  it('renders table headers correctly without actions', () => {
    const columns = headers.map((header) => ({ key: header, label: header }));
    render(<TableHeader columns={columns} actions={false} />);

    headers.forEach((header) => {
      expect(screen.getByTitle(header)).toBeInTheDocument();
    });

    expect(screen.queryByTitle('Actions')).not.toBeInTheDocument();
  });

  it('renders table headers correctly with actions', () => {
    const columns = headers.map((header) => ({ key: header, label: header }));
    render(<TableHeader columns={columns} actions={true} />);

    headers.forEach((header) => {
      expect(screen.getByTitle(header)).toBeInTheDocument();
    });

    expect(screen.getByTitle('Actions')).toBeInTheDocument();
  });
});
