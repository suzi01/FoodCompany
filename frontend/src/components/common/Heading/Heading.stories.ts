import type { Meta, StoryObj } from '@storybook/react-vite';

import { Heading } from './Heading';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'Heading',
  component: Heading,
  tags: ['autodocs'],
  args: {
    level: 1,
    className: '',
    children: 'This is a heading',
  },
} satisfies Meta<typeof Heading>;

export default meta;

export const BasicHeading: Story = {
  args: {
    level: 2,
    children: 'This is a H2 heading and large text',
    className: 'text-lg semibold',
  },
};

export const DefaultHeading: Story = {
  args: {
    children: 'This is a heading',
  },
};

export const StyledHeading: Story = {
  args: {
    level: 4,
    className: 'text-purple-200',
    children: 'This is a styled heading',
  },
};
