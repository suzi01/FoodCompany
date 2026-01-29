import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentProps } from 'react';
import { EditBranchSupplier } from './EditBranchSupplier';

type Story = StoryObj<typeof EditBranchSupplier>;

const meta: Meta<typeof EditBranchSupplier> = {
  title: 'Forms/EditBranchSupplier',
  component: EditBranchSupplier,
  tags: ['autodocs'],
  render: (args: ComponentProps<typeof EditBranchSupplier>) => (
    <EditBranchSupplier {...args} />
  ),
};

export default meta;

export const Default: Story = {
  args: {
    supplier: {
      id: 'supplier-1',
      companyName: 'Supplier One',
      status: 'active',
    },
    handleSubmit: (e) => {
      e.preventDefault();
      console.log('Form submitted');
    },
  },
};

export const WithDifferentSupplier: Story = {
  args: {
    supplier: {
      id: 'supplier-2',
      companyName: 'Supplier Two',
      status: 'inactive',
    },
    handleSubmit: (e) => {
      e.preventDefault();
      console.log('Form submitted with different supplier');
    },
  },
};
