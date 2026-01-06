import type { Meta, StoryObj } from '@storybook/react-vite';

import { Header } from '../Header';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;

export const BasicHeader: Story = {};
