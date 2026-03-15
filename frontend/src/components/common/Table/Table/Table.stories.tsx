import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';

import { Table, TableProps } from './Table';

type RowType = { id: number; name: string; age: number; city: string };

const data: RowType[] = [
  { id: 1, name: 'Alice', age: 30, city: 'New York' },
  { id: 2, name: 'Bob', age: 25, city: 'Los Angeles' },
  { id: 3, name: 'Charlie', age: 35, city: 'Chicago' },
];

type Story = StoryObj<typeof Table<RowType>>;

const meta: Meta<typeof Table<RowType>> = {
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

const args: Partial<TableProps<RowType>> = {
  headers: ['name', 'age', 'city'],
  rows: data,
  actions: false,
};

export const BasicTable: Story = {
  args,
};

export const TableWithAction: Story = {
  args: {
    ...args,
    actions: true,
  },
};
