import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Button } from './Button';

describe('Button Component', () => {
  const mockOnClick = vi.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders the button with a primary variant', () => {
    render(
      <Button variant="primary" onClick={mockOnClick}>
        Primary
      </Button>,
    );
    expect(screen.getByText('Primary')).toBeInTheDocument();
    expect(screen.getByText('Primary')).toHaveClass('bg-blue-500');
  });

  it('renders the button with correct text', () => {
    render(<Button onClick={mockOnClick}>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', async () => {
    render(<Button onClick={mockOnClick}>Click Me</Button>);
    await userEvent.click(screen.getByText('Click Me'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('applies additional class names', () => {
    render(
      <Button onClick={mockOnClick} className="extra-class">
        Click Me
      </Button>,
    );
    expect(screen.getByText('Click Me')).toHaveClass('extra-class');
  });
});
