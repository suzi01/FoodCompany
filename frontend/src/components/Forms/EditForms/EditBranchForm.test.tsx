import { render, screen, userEvent } from '@/testUtils';
import { vi } from 'vitest';
import { EditBranchForm } from './EditBranchForm';
import { IFormInput } from './IFormInput';

describe('EditBranchForm', () => {
  const mockBranch: IFormInput = {
    branchName: 'Main Branch',
    yearsActive: '10',
    phoneNumber: '123-456-7890',
    address: '123 Main St',
    branchEmail: 'mainbranch@example.com',
    mainContactName: 'John Doe',
    mainContactPhoneNumber: '098-765-4321',
    mainContactEmail: 'johndoe@example.com',
  };

  const handleSubmit = vi.fn();

  it('renders form with branch data', () => {
    render(<EditBranchForm branch={mockBranch} onSubmit={handleSubmit} />);

    expect(screen.getByRole('textbox', { name: /Branch Name/i })).toHaveValue(
      'Main Branch',
    );
    expect(screen.getByRole('textbox', { name: /Years Active/i })).toHaveValue(
      '10',
    );
    expect(screen.getByRole('textbox', { name: /Phone Number/i })).toHaveValue(
      '123-456-7890',
    );
    expect(screen.getByRole('textbox', { name: /Address/i })).toHaveValue(
      '123 Main St',
    );
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveValue(
      'mainbranch@example.com',
    );
    expect(screen.getByRole('textbox', { name: /Contact Name/i })).toHaveValue(
      'John Doe',
    );
    expect(
      screen.getByRole('textbox', { name: /Contact Number/i }),
    ).toHaveValue('098-765-4321');
    expect(screen.getByRole('textbox', { name: /Contact Email/i })).toHaveValue(
      'johndoe@example.com',
    );
  });

  it('calls onSubmit with updated data', async () => {
    render(<EditBranchForm branch={mockBranch} onSubmit={handleSubmit} />);

    await userEvent.type(
      screen.getByLabelText(/Branch Name/i),
      'Updated Branch',
    );
    await userEvent.type(screen.getByLabelText(/Address/i), 'Gotham');

    await userEvent.click(screen.getByText(/Save/i));

    expect(handleSubmit).toHaveBeenCalled();
  });
});
