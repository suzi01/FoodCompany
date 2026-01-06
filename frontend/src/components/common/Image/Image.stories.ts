import type { Meta, StoryObj } from '@storybook/react-vite';

import { Image } from './Image';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'Image',
  component: Image,
  tags: ['autodocs'],
  args: {
    src: '/example',
    className: '',
    alt: 'This is an image',
  },
} satisfies Meta<typeof Image>;

export default meta;

export const BasicImage: Story = {
  args: {
    src: '/example',
    alt: 'This is an image',
  },
};

export const StyledImage: Story = {
  args: {
    src: '/example',
    className: 'w-32 h-32 border-4 border-purple-200',
    alt: 'This is a styled image',
  },
};
