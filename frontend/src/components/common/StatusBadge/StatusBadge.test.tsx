// generate unit tests for status badge component
import { render, screen } from '@testing-library/react';
import { StatusBadge, StatusBadgeProps } from './StatusBadge';

describe('StatusBadge', () => {
  const renderStatusBadge = (props: StatusBadgeProps) => {
    render(<StatusBadge {...props} />);
  };

  it('applies the correct class for active status', () => {
    renderStatusBadge({ value: 'active' });
    screen.logTestingPlaygroundURL();
    const badge = screen.getByTestId('status-badge');
    expect(badge).toHaveClass('bg-green-500');
  });

  it('applies the correct class for inactive status', () => {
    renderStatusBadge({ value: 'inactive' });
    const badge = screen.getByTestId('status-badge');
    expect(badge).toHaveClass('bg-red-600');
  });
  it('applies the correct class for pending status', () => {
    renderStatusBadge({ value: 'pending' });
    const badge = screen.getByTestId('status-badge');
    expect(badge).toHaveClass('bg-yellow-400');
  });
});
