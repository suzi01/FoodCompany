import { render, screen } from '@/testUtils';
import { EditBranchSupplier } from './EditBranchSupplier';
import { vi } from 'vitest';

const mockSuppliers = [
  { id: 'supplier-1', companyName: 'Supplier One', status: 'active' },
  { id: 'supplier-2', companyName: 'Supplier Two', status: 'inactive' },
];

describe('EditBranchSupplier Component', () => {
  const mockHandleSubmit = vi.fn();

  it.only('renders the EditBranchSupplier component with given suppliers', () => {
    render(
      <EditBranchSupplier
        supplier={mockSuppliers[0]}
        handleSubmit={mockHandleSubmit}
      />,
    );

    expect(
      screen.getByDisplayValue(mockSuppliers[0].companyName),
    ).toBeInTheDocument();
  });
});
