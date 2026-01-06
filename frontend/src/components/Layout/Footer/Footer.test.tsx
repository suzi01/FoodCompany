import React from 'react';
import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';

import { Footer } from './Footer';

describe('Footer.tsx', () => {
  it('renders Footer correctly', () => {
    render(<Footer />); 
    const companyName = screen.getByText('NaturalFoods');
    const privacyTag = screen.getByText('Privacy Policy');
    const contactTag = screen.getByText('Contact Us');
    const termsTag = screen.getByText('Terms of Service');

    const copyright = screen.getByText('@2024 NaturalFoods. All rights reserved.');

    expect(companyName).toBeInTheDocument();
    expect(privacyTag).toBeInTheDocument();
    expect(contactTag).toBeInTheDocument();
    expect(termsTag).toBeInTheDocument();
    expect(copyright).toBeInTheDocument();
  });
});
