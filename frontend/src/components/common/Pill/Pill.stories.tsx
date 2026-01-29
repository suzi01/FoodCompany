import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pill } from './Pill';

type Story = StoryObj<typeof Pill>;

const meta: Meta<typeof Pill> = {
  title: 'Pill',
  component: Pill,
  tags: ['autodocs'],
  args: {
    status: 'active',
  },
};

export default meta;

export const ActivePill: Story = {
  args: {
    status: 'active',
  },
};

export const InactivePill: Story = {
  args: {
    status: 'inactive',
  },
};

export const PendingPill: Story = {
  args: {
    status: 'pending',
  },
};
