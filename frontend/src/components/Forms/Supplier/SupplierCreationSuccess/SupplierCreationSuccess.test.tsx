import { render, screen } from '@/testUtils';
import { SupplierCreationSuccess } from './SupplierCreationSuccess';
import { vi } from 'vitest';

const mockProps = {
  supplierName: 'Test Supplier',
  supplierId: 'SUP12345',
  contactName: 'John Doe',
  contactEmail: 'john.doe@example.com',
  onSkip: vi.fn(),
  onContinue: vi.fn(),
};

describe('SupplierCreationSuccess component', () => {
  test('renders the component with correct text and button', () => {
    render(<SupplierCreationSuccess {...mockProps} />);

    expect(screen.getByRole('heading', { name: `Supplier ${mockProps.supplierName} created successfully!` })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Add products now/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Add products now/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Skip for now/i }),
    ).toBeInTheDocument();
  });
});
