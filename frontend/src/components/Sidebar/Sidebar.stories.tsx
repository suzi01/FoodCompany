import { Meta, StoryObj } from '@storybook/react/*';
import { MemoryRouter } from 'react-router-dom';
import { Sidebar } from './Sidebar';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  render: (args) => (
    <MemoryRouter>
      <Sidebar {...args} />
    </MemoryRouter>
  ),
} satisfies Meta<typeof Sidebar>;

export default meta;

export const Default: Story = {
  args: {
    pages: [
      { name: 'Home', path: '/' },
      { name: 'Suppliers', path: '/suppliers' },
      { name: 'Products', path: '/products' },
      { name: 'Branches', path: '/branches' },
    ],
  },
};

export const EmptySidebar: Story = {
  args: {
    pages: [],
  },
};

export const SinglePage: Story = {
  args: {
    pages: [{ name: 'Home', path: '/' }],
  },
};

export const ManyPages: Story = {
  args: {
    pages: [
      { name: 'Home', path: '/' },
      { name: 'Suppliers', path: '/suppliers' },
      { name: 'Products', path: '/products' },
      { name: 'Branches', path: '/branches' },
      { name: 'Orders', path: '/orders' },
      { name: 'Customers', path: '/customers' },
    ],
  },
};
