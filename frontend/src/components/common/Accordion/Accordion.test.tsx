import { render, screen, fireEvent } from '@testing-library/react';
import { Accordion } from './Accordion';
import { vi } from 'vitest';

describe('Accordion', () => {
  const mockOnClick = vi.fn();
  const defaultProps = {
    isOpen: false,
    onClick: mockOnClick,
    headerContent: <div>Header</div>,
    content: <div>Content</div>,
  };

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders header content', () => {
    render(<Accordion {...defaultProps} />);
    expect(screen.getByText('Header')).toBeInTheDocument();
  });

  it('renders content when isOpen is true', () => {
    render(<Accordion {...defaultProps} isOpen={true} />);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('does not render content when isOpen is false', () => {
    render(<Accordion {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('calls onClick handler when button is clicked', () => {
    render(<Accordion {...defaultProps} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('applies rotate-180 class to chevron when isOpen is true', () => {
    const { rerender } = render(<Accordion {...defaultProps} isOpen={false} />);
    const image = screen.getByAltText('Expand');
    expect(image).toHaveClass('transition-transform');
    expect(image).not.toHaveClass('rotate-180');

    rerender(<Accordion {...defaultProps} isOpen={true} />);
    expect(image).toHaveClass('rotate-180');
  });

  it('renders Pill component when status is provided', () => {
    render(<Accordion {...defaultProps} status="active" />);
    const container = screen.getByText('active');
    expect(container).toBeInTheDocument();
  });

  it('does not render Pill component when status is not provided', () => {
    const { container } = render(<Accordion {...defaultProps} />);
    const pills = container.querySelectorAll('[class*="pill"]');
    expect(pills.length).toBe(0);
  });

  it('renders with active status', () => {
    render(<Accordion {...defaultProps} status="active" />);
    expect(screen.getByAltText('Expand')).toBeInTheDocument();
  });

  it('renders with inactive status', () => {
    render(<Accordion {...defaultProps} status="inactive" />);
    expect(screen.getByAltText('Expand')).toBeInTheDocument();
  });

  it('renders with pending status', () => {
    render(<Accordion {...defaultProps} status="pending" />);
    expect(screen.getByAltText('Expand')).toBeInTheDocument();
  });

  it('renders chevron icon with correct alt text', () => {
    render(<Accordion {...defaultProps} />);
    expect(screen.getByAltText('Expand')).toBeInTheDocument();
  });

  it('has proper styling classes applied to container', () => {
    const { container } = render(<Accordion {...defaultProps} />);
    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveClass(
      'border-2',
      'border-blue-300',
      'rounded-md',
      'bg-blue-100',
    );
  });
});
