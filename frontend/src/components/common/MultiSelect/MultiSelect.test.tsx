import { render, screen, userEvent } from '@/testUtils';
import { MultiSelect } from './MultiSelect';
import { vi } from 'vitest';

describe('MultiSelect Component', () => {
  const options = [
    { id: '1', label: 'Option 1' },
    { id: '2', label: 'Option 2' },
    { id: '3', label: 'Option 3' },
  ];
  const addButtonLabel = 'Add Option';

  it('renders the MultiSelect component with given options', async () => {
    render(
      <MultiSelect
        options={options}
        selectedIds={[]}
        setSelectedIds={() => {}}
        addButtonLabel={addButtonLabel}
      />,
    );

    const container = screen.getByText(addButtonLabel);
    await userEvent.click(container);

    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('toggles dropdown on click and selects/deselects options', async () => {
    const setSelectedIds = vi.fn();
    render(
      <MultiSelect
        options={options}
        selectedIds={[]}
        setSelectedIds={setSelectedIds}
        addButtonLabel={addButtonLabel}
      />,
    );

    const container = screen.getByText(addButtonLabel);
    await userEvent.click(container);

    const optionToSelect = screen.getByText('Option 1');
    await userEvent.click(optionToSelect);

    expect(setSelectedIds).toHaveBeenCalledWith(['1']);
  });

  it('removes selected option on remove button click', async () => {
    const setSelectedIds = vi.fn();
    render(
      <MultiSelect
        options={options}
        selectedIds={['1']}
        setSelectedIds={setSelectedIds}
        addButtonLabel={addButtonLabel}
      />,
    );

    // Find and click the X button in the tag
    const removeButtons = screen.getAllByRole('button');
    const xButton = removeButtons.find((btn) =>
      btn.className.includes('hover:bg-blue-200'),
    );
    await userEvent.click(xButton!);

    expect(setSelectedIds).toHaveBeenCalledWith([]);
  });

  it('clears all selected options when Clear All button is clicked', async () => {
    const setSelectedIds = vi.fn();
    render(
      <MultiSelect
        options={options}
        selectedIds={['1', '2']}
        setSelectedIds={setSelectedIds}
        addButtonLabel={addButtonLabel}
      />,
    );

    const container = screen.getByText(addButtonLabel);
    await userEvent.click(container);

    const clearAllButton = screen.getByText('Clear All');
    await userEvent.click(clearAllButton);

    expect(setSelectedIds).toHaveBeenCalledWith([]);
  });

  it('closes dropdown when Apply button is clicked', async () => {
    const setSelectedIds = vi.fn();
    render(
      <MultiSelect
        options={options}
        selectedIds={[]}
        setSelectedIds={setSelectedIds}
        addButtonLabel={addButtonLabel}
      />,
    );

    const container = screen.getByText(addButtonLabel);
    await userEvent.click(container);
    expect(screen.getByText('Clear All')).toBeInTheDocument();

    const applyButton = screen.getByText('Apply');
    await userEvent.click(applyButton);

    expect(screen.queryByText('Clear All')).not.toBeInTheDocument();
  });

  it('selects multiple options', async () => {
    const setSelectedIds = vi.fn();

    render(
      <MultiSelect
        options={options}
        selectedIds={[]}
        setSelectedIds={setSelectedIds}
        addButtonLabel={addButtonLabel}
      />,
    );

    const container = screen.getByText(addButtonLabel);
    await userEvent.click(container);

    const checkboxes = screen.getAllByRole('checkbox');

    await userEvent.click(checkboxes[0]);
    expect(setSelectedIds).toHaveBeenNthCalledWith(1, ['1']);

    await userEvent.click(checkboxes[1]);
    expect(setSelectedIds).toHaveBeenNthCalledWith(2, ['2']);
  });

  it('displays selected option labels as tags', () => {
    render(
      <MultiSelect
        options={options}
        selectedIds={['1', '3']}
        setSelectedIds={() => {}}
        addButtonLabel={addButtonLabel}
      />,
    );

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
  });

  it('checks the checkbox when option is selected', async () => {
    render(
      <MultiSelect
        options={options}
        selectedIds={['1']}
        setSelectedIds={() => {}}
        addButtonLabel={addButtonLabel}
      />,
    );

    const container = screen.getByText(addButtonLabel);
    await userEvent.click(container);

    const checkboxes = screen.getAllByRole('checkbox') as HTMLInputElement[];
    expect(checkboxes[0].checked).toBe(true);
    expect(checkboxes[1].checked).toBe(false);
  });
});
