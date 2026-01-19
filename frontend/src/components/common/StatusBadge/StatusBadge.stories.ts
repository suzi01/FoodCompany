import type { Meta, StoryObj } from '@storybook/react-vite';

import { StatusBadge } from './StatusBadge';

type Story = StoryObj<typeof StatusBadge>;

const meta: Meta<typeof StatusBadge> = {
  title: 'StatusBadge',
  component: StatusBadge,
  tags: ['autodocs'],
};
export default meta;

export const ActiveStatusBadge: Story = {
  args: {
    value: 'active',
  },
};

export const InactiveStatusBadge: Story = {
  args: {
    value: 'inactive',
  },
};

export const PendingStatusBadge: Story = {
  args: {
    value: 'pending',
  },
};
