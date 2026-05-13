import type { Meta, StoryObj } from '@storybook/react-vite';

import { Header } from '.';
import { MemoryRouter } from 'react-router-dom';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'Header',
  component: Header,
  tags: ['autodocs'],
  render: () => (
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ),
} satisfies Meta<typeof Header>;

export default meta;

export const BasicHeader: Story = {};
