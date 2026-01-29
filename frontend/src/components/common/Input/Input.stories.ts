import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from './Input';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    label: 'Basic Input',
    name: 'inputName',
  },
} satisfies Meta<typeof Input>;

export default meta;

export const BasicInput: Story = {
  args: {},
};
