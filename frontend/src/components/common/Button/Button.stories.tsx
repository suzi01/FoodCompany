import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './Button';

type Story = StoryObj<typeof Button>;

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: ({ ...args }) => <Button {...args} />,
};
export default meta;

export const PrimaryButton: Story = {
  args: {
    variant: 'primary',
    children: 'This is a primary button',
  },
};

export const SecondaryButton: Story = {
  args: {
    variant: 'secondary',
    children: 'This is a secondary button',
  },
};

export const TertiaryButton: Story = {
  args: {
    variant: 'tertiary',
    children: 'This is a tertiary button',
  },
};

export const CustomButton: Story = {
  args: {
    className: 'text-green-500 bg-yellow-200',
    children: 'This is a button link',
  },
};
