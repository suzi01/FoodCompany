// generate stories for MultiSelect component
import React, { ComponentProps, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MultiSelect } from './MultiSelect';

type Story = StoryObj<typeof MultiSelect>;

const meta: Meta<typeof MultiSelect> = {
  title: 'MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  render: (args: ComponentProps<typeof MultiSelect>) => <Template {...args} />,
};

export default meta;

const Template = (args) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    args.selectedIds || [],
  );

  return (
    <MultiSelect
      {...args}
      selectedIds={selectedIds}
      setSelectedIds={setSelectedIds}
    />
  );
};

export const Default: Story = {
  args: {
    options: [
      { id: '1', label: 'Option 1' },
      { id: '2', label: 'Option 2' },
      { id: '3', label: 'Option 3' },
    ],
    addButtonLabel: 'Add Options',
  },
};

export const WithPreselectedOptions: Story = {
  args: {
    options: [
      { id: '1', label: 'Option 1' },
      { id: '2', label: 'Option 2' },
      { id: '3', label: 'Option 3' },
    ],
    addButtonLabel: 'Add Options',
    selectedIds: ['1', '3'],
  },
};

export const CustomClassName: Story = {
  args: {
    options: [
      { id: '1', label: 'Option 1' },
      { id: '2', label: 'Option 2' },
      { id: '3', label: 'Option 3' },
    ],
    addButtonLabel: 'Add Options',
    className: 'custom-multiselect-class',
  },
};
