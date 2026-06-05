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

  it('renders sales overview graph with updated label', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    const salesOverviewHeading = screen.getByText(/Sales Overview/i);
    expect(salesOverviewHeading).toBeInTheDocument();
  });

  it('displays transaction table with correct columns', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    const transactionIdHeader = screen.getByText(/Transaction ID/i);
    const costHeader = screen.getByText(/Cost/i);
    const amountHeader = screen.getAllByText(/Amount/i)[0]; // First occurrence is column header
    const statusHeader = screen.getByText(/Status/i);

    expect(transactionIdHeader).toBeInTheDocument();
    expect(costHeader).toBeInTheDocument();
    expect(amountHeader).toBeInTheDocument();
    expect(statusHeader).toBeInTheDocument();
  });

  it('displays transactions with active status', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    const activeStatusElements = screen.getAllByText(/Active/i);
    expect(activeStatusElements.length).toBeGreaterThan(0);
  });

  it('displays multi-product transactions with ellipsis format', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    const multiProductIndicator = screen.getByText(/3 items\.\.\./i);
    expect(multiProductIndicator).toBeInTheDocument();
  });

  it('displays single product name without ellipsis', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    const singleProduct = screen.getByText(/^Apple$/);
    expect(singleProduct).toBeInTheDocument();
  });

  it('includes view all activity link', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    const viewAllLink = screen.getByText(/View All Activity/i);
    expect(viewAllLink).toBeInTheDocument();
    expect(viewAllLink).toHaveAttribute('href', '/transactions');
  });
});
