import type { Meta, StoryObj } from '@storybook/react-vite';

import { Card } from './Card';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'Card',
  component: Card,
  tags: ['autodocs'],
  args: {
    borderColor: '',
    children: 'This is a card',
  },
  
} satisfies Meta<typeof Card>;

export default meta;

export const BasicCard: Story = {
  args: {
    children: 'This is a card',
  },
};

export const BorderTopColouredCard: Story = {
  args: {
    borderColor: 'green',
    children: 'This is a card',
  },
};
