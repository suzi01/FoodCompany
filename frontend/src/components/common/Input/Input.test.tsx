import { render, screen, userEvent } from '@/testUtils';
import { vi } from 'vitest';
import { Input } from './Input';

describe('Input Component', () => {
  const handleChange = vi.fn();

  it('renders the Input component', () => {
    render(
      <Input
        label="Test Input"
        value=""
        name="test-input"
        onChange={handleChange}
        placeholder="Enter text"
      />,
    );

    expect(screen.getByText(/Test Input/i)).toBeInTheDocument();
  });

  it('calls onChange when text is entered', async () => {
    render(
      <Input
        label="Test Input"
        value=""
        onChange={handleChange}
        placeholder="Enter text"
      />,
    );

    const inputElement = screen.getByRole('textbox');
    await userEvent.type(inputElement, 'Hello');

    expect(handleChange).toHaveBeenCalledTimes(5);
  });

  it('displays the correct value', () => {
    render(
      <Input
        label="Test Input"
        value="Initial Value"
        onChange={handleChange}
        placeholder="Enter text"
      />,
    );

    const inputElement = screen.getAllByRole('textbox');
    expect(inputElement[0]).toHaveValue('Initial Value');
  });
});
