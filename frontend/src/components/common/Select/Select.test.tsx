import { render, screen, userEvent } from '@/testUtils';
import { Select } from './Select';
import { vi } from 'vitest';

describe('Select Component', () => {
  const options = ['Option 1', 'Option 2', 'Option 3'];
  const label = 'Test Select';
  const name = 'test-select';

  it('renders the select component with given options and label', () => {
    render(<Select options={options} label={label} name={name} />);

    expect(screen.getByText(label)).toBeInTheDocument();

    options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it('calls onChange handler when an option is selected', async () => {
    const handleChange = vi.fn();
    render(
      <Select
        options={options}
        label={label}
        name={name}
        onChange={handleChange}
      />,
    );

    const selectElement = screen.getByLabelText(label);
    await userEvent.selectOptions(selectElement, 'Option 2');

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(selectElement).toHaveValue('Option 2');
  });

  it('applies custom className if provided', () => {
    const customClass = 'custom-select-class';
    render(
      <Select
        options={options}
        label={label}
        name={name}
        className={customClass}
      />,
    );

    const containerDiv = screen.getByText(label).parentElement;
    expect(containerDiv).toHaveClass(customClass);
  });
});
