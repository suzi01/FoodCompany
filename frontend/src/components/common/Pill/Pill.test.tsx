import { render, screen } from '@/testUtils';
import { Pill } from './Pill';

describe('Pill Component', () => {
  it('renders with active status', () => {
    render(<Pill status="active" />);
    const pillElement = screen.getByText(/active/i);
    expect(pillElement).toBeInTheDocument();
    expect(pillElement.parentElement).toHaveClass('bg-green-600/10');
    expect(pillElement.parentElement).toHaveClass('text-green-600');
  });

  it('renders with inactive status', () => {
    render(<Pill status="inactive" />);
    const pillElement = screen.getByText(/inactive/i);
    expect(pillElement).toBeInTheDocument();
    expect(pillElement.parentElement).toHaveClass('bg-red-600/10');
    expect(pillElement.parentElement).toHaveClass('text-red-600');
  });

  it('renders with pending status', () => {
    render(<Pill status="pending" />);
    const pillElement = screen.getByText(/pending/i);
    expect(pillElement).toBeInTheDocument();
    expect(pillElement.parentElement).toHaveClass('bg-yellow-600/10');
    expect(pillElement.parentElement).toHaveClass('text-yellow-600');
  });
});
