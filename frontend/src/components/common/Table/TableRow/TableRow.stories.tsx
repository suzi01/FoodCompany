import type { Meta, StoryObj } from '@storybook/react-vite';

import { TableRow, TableRowProps } from './TableRow';
import { MemoryRouter } from 'react-router-dom';

type Story = StoryObj<typeof TableRow>;

const meta: Meta<typeof TableRow> = {
  title: 'TableRow',
  component: TableRow,
  tags: ['autodocs'],
  render: ({ ...args }) => (
    <MemoryRouter>
      <TableRow {...args} />
    </MemoryRouter>
  ),
};

export default meta;

const args: TableRowProps = {
  rowItems: [
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
  headers: ['Name', 'Age', 'Status'],
};

export const BasicRow: Story = {
  args: {
    ...args,
  },
};

export const RowWithActions: Story = {
  args: {
    ...args,
    actions: true,
  },
};
