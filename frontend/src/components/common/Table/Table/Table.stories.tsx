import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';

import { Table } from './Table';

type Story = StoryObj<typeof Table>;

const meta: Meta<typeof Table> = {
  title: 'Table',
  component: Table,
  tags: ['autodocs'],
  render: ({ ...args }) => (
    <MemoryRouter>
      <Table {...args} />
    </MemoryRouter>
  ),
};
export default meta;

const args = {
  headers: ['Name', 'Age', 'Status'],
  rows: [
    {
      Name: 'John Doe',
      Age: 28,
      Status: 'active',
    },
    {
      Name: 'Jane Smith',
      Age: 34,
      Status: 'inactive',
    },
  ],
};

export const BasicTable: Story = {
  args,
};

export const StyledTable: Story = {
  args: {
    ...args,
    actions: true,
  },
};
