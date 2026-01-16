import type { Meta, StoryObj } from '@storybook/react-vite';

import { Layout } from './Layout';
import { MemoryRouter } from 'react-router-dom';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'Layout',
  component: Layout,
  tags: ['autodocs'],
  render: () => (
    <MemoryRouter>
      <Layout />
    </MemoryRouter>
  ),
} satisfies Meta<typeof Layout>;

export default meta;

export const BasicLayout: Story = {};
