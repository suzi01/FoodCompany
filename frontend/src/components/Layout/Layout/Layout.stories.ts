import type { Meta, StoryObj } from '@storybook/react-vite';

import { Layout } from './Layout';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'Layout',
  component: Layout,
  tags: ['autodocs'],
} satisfies Meta<typeof Layout>;

export default meta;

export const BasicLayout: Story = {};
