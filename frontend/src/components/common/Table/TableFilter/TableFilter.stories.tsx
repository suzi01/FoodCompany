import type { Meta, StoryObj } from '@storybook/react-vite';

import { TableFilter } from './TableFilter';
import { MemoryRouter } from 'react-router-dom';
import { useState } from 'react';

type Story = StoryObj<typeof TableFilter>;

const meta: Meta<typeof TableFilter> = {
  title: 'TableFilter',
  component: TableFilter,
  tags: ['autodocs'],
  render: () => (
    <MemoryRouter>
      <TableFilterWithHooks />
    </MemoryRouter>
  ),
};

export default meta;

const TableFilterWithHooks = () => {
  const [selectedState, setSelectedState] = useState('All');
  const filterItems = ['Price', 'Date', 'Category'];

  const onStateChange = (state: string) => {
    setSelectedState(state);
  };

  return (
    <TableFilter
      filterStatus={selectedState}
      setFilterStatus={onStateChange}
      filterItems={filterItems}
    />
  );
};

export const BasicTableFilter: Story = {
  args: {},
};
