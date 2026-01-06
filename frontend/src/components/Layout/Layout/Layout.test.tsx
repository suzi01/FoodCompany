import React from 'react';
import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';

import { Layout } from './Layout';

describe('Layout.tsx', () => {
  it('renders Layout correctly', () => {
    render(<Layout />);
    const mainTitle = screen.getAllByText(/naturalfoods/i);
    const headerUserName = screen.getByText('Janine Wilson');
    const contactTag = screen.getByText('Contact Us');

    expect(headerUserName).toBeInTheDocument();
    expect(contactTag).toBeInTheDocument();
    expect(mainTitle.length).toBe(3);
  });
});
