import type { Meta, StoryObj } from '@storybook/react-vite';

import { SearchBar } from './SearchBar';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  args: {
    onClear: () => {},
    onTextChange: () => {},
    className: '',
    text: 'This is an SearchBar',
  },
} satisfies Meta<typeof SearchBar>;

export default meta;

export const BasicSearchBar: Story = {
  args: {
    onTextChange: () => {},
    onClear: () => {},
    text: 'This is an SearchBar',
    handleSubmit: () => {},
  },
};

export const StyledSearchBar: Story = {
  args: {
    className: 'w-1/2 h-20 border-4 border-purple-200',
    onTextChange: () => {},
    onClear: () => {},
    text: 'This is a styled SearchBar',
    handleSubmit: () => {},
  },
};
