import React from 'react';
import '@testing-library/jest-dom';

import { render, screen } from '@/testUtils';

import { Header } from './Header';

describe('Header.tsx', () => {
  it('renders Header correctly', () => {
    render(<Header />);

    const mainTitle = screen.getByText('NaturalFoods');
    const userName = screen.getByText('Janine Wilson');
    const userEmail = screen.getByText('Janine.wilson@food.com');

    expect(mainTitle).toBeInTheDocument();
    expect(userName).toBeInTheDocument();
    expect(userEmail).toBeInTheDocument();
  });
});
