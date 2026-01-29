import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilterAndSortForm } from './FilterAndSortForm';
import { MemoryRouter } from 'react-router-dom';

type Story = StoryObj<typeof FilterAndSortForm>;

const meta: Meta<typeof FilterAndSortForm> = {
  title: 'Forms/FilterAndSortForm',
  component: FilterAndSortForm,
  tags: ['autodocs'],
  render: ({ ...args }) => (
    <MemoryRouter>
      <FilterAndSortForm {...args} />
    </MemoryRouter>
  ),
};

export default meta;

export const BasicFilterSortForm: Story = {
  args: {
    filterItems: ['Name', 'Location', 'Status'],
  },
};
