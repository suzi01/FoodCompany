import React from 'react';
import { render, screen } from '@testing-library/react';
import { TableHeader } from './TableHeader';

describe('TableHeader', () => {
  const headers = ['Name', 'Age', 'Status'];

  it('renders table headers correctly without actions', () => {
    render(<TableHeader headers={headers} actions={false} />);

    headers.forEach((header) => {
      expect(screen.getByTitle(header)).toBeInTheDocument();
    });

    expect(screen.queryByTitle('Actions')).not.toBeInTheDocument();
  });

  it('renders table headers correctly with actions', () => {
    render(<TableHeader headers={headers} actions={true} />);

    headers.forEach((header) => {
      expect(screen.getByTitle(header)).toBeInTheDocument();
    });

    expect(screen.getByTitle('Actions')).toBeInTheDocument();
  });
});
