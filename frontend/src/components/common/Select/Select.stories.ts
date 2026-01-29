import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

type Story = StoryObj<typeof Select>;

const meta: Meta<typeof Select> = {
  title: 'Select',
  component: Select,
  tags: ['autodocs'],
  args: {
    options: ['Option 1', 'Option 2', 'Option 3'],
    label: 'Sample Select',
    name: 'sample-select',
  },
};

export default meta;

export const DefaultSelect: Story = {
  args: {
    options: ['Option 1', 'Option 2', 'Option 3'],
    label: 'Sample Select',
    name: 'sample-select',
  },
};
