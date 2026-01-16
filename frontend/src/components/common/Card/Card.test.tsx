import React from 'react';

import { render, screen } from '@/testUtils';

import { Card } from './Card';

const borderColourCardProps = {
  borderColor: 'green',
};

describe('Card.tsx', () => {
  it('renders Card with normal grey border', () => {
    render(
      <Card>
        <p>hello</p>
      </Card>,
    );
    const helloText = screen.getByText('hello');

    expect(helloText).toBeInTheDocument();
    expect(helloText.parentElement).toHaveClass('border-t-gray-300');
  });

  it('renders Card with border top color green', () => {
    render(
      <Card {...borderColourCardProps}>
        <p>hello</p>
      </Card>,
    );

    const helloText = screen.getByText('hello');
    expect(helloText.parentElement).toHaveClass('border-t-green-300');
  });
});
