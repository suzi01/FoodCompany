// generate tests for Drawer compontent
import React from 'react';
import { render, screen } from '@/testUtils';
import { Drawer } from './Drawer';

import { vi } from 'vitest';

describe('Drawer Component', () => {
  const mockSetOpened = vi.fn();

  test('renders Drawer when opened is true', () => {
    render(
      <Drawer opened={true} setOpened={mockSetOpened}>
        <div>Drawer Content</div>
      </Drawer>,
    );

    expect(screen.getByText('Drawer Content')).toBeInTheDocument();
  });

  test('does not render Drawer when opened is false', () => {
    render(
      <Drawer opened={false} setOpened={mockSetOpened}>
        <div>Drawer Content</div>
      </Drawer>,
    );

    expect(screen.queryByText('Drawer Content')).not.toBeInTheDocument();
  });
});
