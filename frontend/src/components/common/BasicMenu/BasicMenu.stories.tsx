import type { Meta, StoryObj } from '@storybook/react-vite';
import { BasicMenu } from './BasicMenu';
import { MemoryRouter } from 'react-router-dom';

type Story = StoryObj<typeof BasicMenu>;

const meta: Meta<typeof BasicMenu> = {
  title: 'BasicMenu',
  component: BasicMenu,
  tags: ['autodocs'],
  render: ({ ...args }) => (
    <MemoryRouter>
      <BasicMenu {...args} />
    </MemoryRouter>
  ),
};

export default meta;

export const Menu: Story = {
  args: {
    target: <button>Open Menu</button>,
    items: [
      { label: 'Home', href: '/' },
      { label: 'Profile', href: '/profile' },
      { label: 'Settings', onClick: () => alert('Settings clicked') },
    ],
  },
};
