// create tests for BasicInfo component
import { render, screen } from '@/testUtils';
import { BasicInfo } from './BasicInfo';
import { CreateSupplier } from '@/models/Supplier';
import { vi } from 'vitest';

const mockChangedData = vi.fn();

const mockData: CreateSupplier = {
  companyName: 'Test Supplier',
  status: 'Active',
  mainContactName: 'John Doe',
  address: '123 Main St',
  email: 'test@supplier.com',
  phoneNumber: '123-456-7890',
};

describe('BasicInfo component', () => {
  test('renders the component with correct labels and inputs', () => {
    render(<BasicInfo data={mockData} changedData={mockChangedData} />);

    expect(screen.getByLabelText('Supplier Name *')).toBeInTheDocument();
    expect(screen.getByText(/Status/i)).toBeInTheDocument();

    expect(
      screen.getByRole('textbox', { name: /Supplier Name/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Inactive')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /file icon upload file/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /camera icon use camera/i }),
    ).toBeInTheDocument();
  });
});
