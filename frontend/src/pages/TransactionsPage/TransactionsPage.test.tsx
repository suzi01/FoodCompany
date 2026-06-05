import React from 'react';
import '@testing-library/jest-dom';

import { render, screen } from '@/testUtils';

import { TransactionsPage } from './TransactionsPage';
import { MemoryRouter } from 'react-router-dom';

describe('TransactionsPage.tsx', () => {
  it('renders TransactionsPage with heading', () => {
    render(
      <MemoryRouter>
        <TransactionsPage />
      </MemoryRouter>,
    );
    const heading = screen.getByRole('heading', {
      name: /All Transactions/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('displays transaction table with correct columns', () => {
    render(
      <MemoryRouter>
        <TransactionsPage />
      </MemoryRouter>,
    );
    const transactionIdHeader = screen.getByText(/Transaction ID/i);
    const costHeader = screen.getByText(/Cost/i);
    const amountHeader = screen.getAllByText(/Amount/i)[0];
    const statusHeader = screen.getByText(/Status/i);
    const dateHeader = screen.getByText(/Date/i);

    expect(transactionIdHeader).toBeInTheDocument();
    expect(costHeader).toBeInTheDocument();
    expect(amountHeader).toBeInTheDocument();
    expect(statusHeader).toBeInTheDocument();
    expect(dateHeader).toBeInTheDocument();
  });

  it('displays all transactions in the table', () => {
    render(
      <MemoryRouter>
        <TransactionsPage />
      </MemoryRouter>,
    );
    // Verify some transaction IDs are present
    const transactionId1 = screen.getByText(/123456789/);
    const transactionId2 = screen.getByText(/987654321/);

    expect(transactionId1).toBeInTheDocument();
    expect(transactionId2).toBeInTheDocument();
  });

  it('displays multi-product transactions with ellipsis format', () => {
    render(
      <MemoryRouter>
        <TransactionsPage />
      </MemoryRouter>,
    );
    const multiProductIndicator = screen.getByText(/3 items\.\.\./i);
    expect(multiProductIndicator).toBeInTheDocument();
  });

  it('includes back to home link', () => {
    render(
      <MemoryRouter>
        <TransactionsPage />
      </MemoryRouter>,
    );
    const backLink = screen.getByText(/Back to Home/i);
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/');
  });
});
