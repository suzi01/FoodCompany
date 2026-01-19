import React from 'react';

import { render, screen } from '@/testUtils';

import { Image } from './Image';

describe('Image.tsx', () => {
  it('renders Image with src and alt', () => {
    render(<Image src="test.jpg" alt="test image" />);
    const testImage = screen.getByAltText('test image');
    expect(testImage).toBeInTheDocument();
  });

  it('renders Image with custom style', () => {
    render(
      <Image
        src="test.jpg"
        alt="test image"
        className="w-32 h-32 border-orange-200"
      />,
    );

    const testImage = screen.getByAltText('test image');
    expect(testImage).toHaveClass('border-orange-200');
  });
});
