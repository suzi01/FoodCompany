import type { Meta, StoryObj } from '@storybook/react-vite';

import { TableHeader } from './TableHeader';

type Story = StoryObj<typeof TableHeader>;

const meta: Meta<typeof TableHeader> = {
  title: 'TableHeader',
  component: TableHeader,
  tags: ['autodocs'],
};
export default meta;

export const BasicTableHeader: Story = {
  args: {
    headers: ['Name', 'Age', 'Status'],
  },
};

export const TableHeaderWithAction: Story = {
  args: {
    headers: ['Name', 'Age', 'Status'],
    actions: true,
  },
};
