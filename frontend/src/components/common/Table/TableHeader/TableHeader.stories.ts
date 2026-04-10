import type { Meta, StoryObj } from '@storybook/react-vite';

import { TableHeader } from './TableHeader';

interface MockPerson {
  name: string;
  age: number;
  status: string;
}

type Story = StoryObj<typeof TableHeader<MockPerson>>;

const meta: Meta<typeof TableHeader<MockPerson>> = {
  title: 'TableHeader',
  component: TableHeader,
  tags: ['autodocs'],
};
export default meta;

export const BasicTableHeader: Story = {
  args: {
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'age', label: 'Age' },
    ],
    actions: false,
  },
};

export const TableHeaderWithAction: Story = {
  args: {
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'age', label: 'Age' },
      { key: 'status', label: 'Status' },
    ],
    actions: true,
  },
};
