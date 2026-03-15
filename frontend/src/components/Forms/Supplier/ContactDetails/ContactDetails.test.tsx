import { render, screen } from '@/testUtils';
import { ContactDetails } from './ContactDetails';
import { CreateSupplier } from '@/models/Supplier';
import { vi } from 'vitest';

const mockChangedData = vi.fn();

const mockData: CreateSupplier = {
  companyName: 'Test Supplier',
  status: 'Active',
  mainContactName: 'John Doe',
  address: '123 Main St',
  email: 'john.doe@example.com',
  phoneNumber: '123-456-7890',
};

describe('ContactDetails component', () => {
  test('renders the component with correct labels and inputs', () => {
    render(<ContactDetails data={mockData} changedData={mockChangedData} />);

    expect(screen.getByLabelText('Main Contact Name *')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();

    expect(
      screen.getByRole('textbox', { name: /Main Contact Name/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: /Email Address/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: /Phone Number/i }),
    ).toBeInTheDocument();
  });
});
