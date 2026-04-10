import type { Meta, StoryObj } from '@storybook/react-vite';

import { TableRow, TableRowProps } from './TableRow';
import { MemoryRouter } from 'react-router-dom';

type RowType = { id: number; name: string; age: number; city: string };

type Story = StoryObj<typeof TableRow<RowType>>;

const headers = ['name', 'age', 'city'] as (keyof RowType)[];

const data: RowType[] = [
  { id: 1, name: 'Alice', age: 30, city: 'New York' },
  { id: 2, name: 'Bob', age: 25, city: 'Los Angeles' },
  { id: 3, name: 'Charlie', age: 35, city: 'Chicago' },
];

const meta: Meta<typeof TableRow<RowType>> = {
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

const args: TableRowProps<RowType> = {
  rowItems: data,
  columns: headers.map((header) => ({ key: header, label: header })),
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
