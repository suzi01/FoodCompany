import React from 'react';
import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';

import { HomePage } from './HomePage';
import { MemoryRouter } from 'react-router-dom';

describe('HomePage.tsx', () => {
  it('renders HomePage with expected content', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    const headerText = screen.getByText('Awards & Accomplishments');
    const branchLink = screen.getByText('Find a branch');
    const produceLink = screen.getByText('View all products');
    const supplerLink = screen.getByText('Discover our suppliers');

    expect(headerText).toBeInTheDocument();
    expect(produceLink).toBeInTheDocument();
    expect(branchLink).toBeInTheDocument();
    expect(supplerLink).toBeInTheDocument();
  });
});
