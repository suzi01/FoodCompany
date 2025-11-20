import type { Meta, StoryObj } from '@storybook/react-vite';

import { Footer } from './Footer';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'Footer',
  component: Footer,
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;

export const BasicFooter: Story = {};
