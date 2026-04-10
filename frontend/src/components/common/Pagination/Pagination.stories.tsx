import type { Meta, StoryObj } from '@storybook/react-vite';

import { Pagination } from './Pagination';
import { ComponentProps, useState } from 'react';

type Story = StoryObj<typeof Pagination>;

const meta: Meta<typeof Pagination> = {
  title: 'Pagination',
  component: Pagination,
  tags: ['autodocs'],
  render: (args: ComponentProps<typeof Pagination>) => <Template {...args} />,
};
export default meta;

const Template = (args: ComponentProps<typeof Pagination>) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage || 1);

  const handleSetCurrentPage = (page: number) => {
    setCurrentPage(page);
    if (args.setCurrentPage) {
      args.setCurrentPage(page);
    }
  };

  return (
    <Pagination
      {...args}
      currentPage={currentPage}
      setCurrentPage={handleSetCurrentPage}
    />
  );
};

export const BasicPagination: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    siblingCount: 1,
  },
};

export const PaginationWithMoreSiblings: Story = {
  args: {
    currentPage: 5,
    totalPages: 20,
    siblingCount: 2,
  },
};
