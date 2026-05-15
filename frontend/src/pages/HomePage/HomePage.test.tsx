import React from 'react';
import '@testing-library/jest-dom';

import { render, screen } from '@/testUtils';

import { HomePage } from './HomePage';
import { MemoryRouter } from 'react-router-dom';

describe('HomePage.tsx', () => {
  it('renders HomePage with expected content', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    const heading = screen.getByRole('heading', {
      name: /Welcome back Rivera!/i,
    });
    const revenueText = screen.getByText(/Total Revenue/i);
    const customersText = screen.getByText(/Total Customers/i);
    const transactionsText = screen.getByText(/Total Transactions/i);
    const productsText = screen.getByText(/Total Products/i);

    expect(revenueText).toBeInTheDocument();
    expect(customersText).toBeInTheDocument();
    expect(transactionsText).toBeInTheDocument();
    expect(productsText).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });
});
