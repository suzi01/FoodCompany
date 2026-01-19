import React from 'react';

import { render, screen } from '@/testUtils';

import { ButtonLink } from './ButtonLink';
import { MemoryRouter } from 'react-router-dom';

describe('ButtonLink.tsx', () => {
  it('renders ButtonLink', () => {
    render(
      <MemoryRouter>
        <ButtonLink to="/suppliers">
          <p>Test text</p>
        </ButtonLink>
      </MemoryRouter>,
    );
    const testText = screen.getByText('Test text');
    expect(testText).toBeInTheDocument();
  });

  it('renders ButtonLink with pink border', () => {
    render(
      <MemoryRouter>
        <ButtonLink to="/suppliers" className="text-pink-500">
          <p>Test text</p>
        </ButtonLink>
      </MemoryRouter>,
    );

    const testText = screen.getByText('Test text');
    expect(testText.parentElement).toHaveClass('text-pink-500');
  });
});
