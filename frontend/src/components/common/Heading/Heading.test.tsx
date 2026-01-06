import React from 'react';
import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';

import { Heading } from './Heading';

describe('Heading.tsx', () => {
  it('renders Heading with level and children', () => {
    render(<Heading level={1}>Test Heading</Heading>);
    const testHeading = screen.getByText('Test Heading');
    expect(testHeading).toBeInTheDocument();
  });

  it('renders Heading with default level of 1', () => {
    render(<Heading>Test Heading</Heading>);
    const testHeading = screen.getByText('Test Heading');
    expect(testHeading).toBeInTheDocument();
    expect(testHeading.tagName).toBe('H1');
  });

  it('renders Heading with styling', () => {
    render(
      <Heading level={1} className="text-orange-200">
        Test Heading
      </Heading>,
    );

    const testHeading = screen.getByText('Test Heading');
    expect(testHeading).toHaveClass('text-orange-200');
  });
});
