import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';

import { ButtonLink } from './ButtonLink';

type Story = StoryObj<typeof ButtonLink>;

const meta: Meta<typeof ButtonLink> = {
  title: 'ButtonLink',
  component: ButtonLink,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: ({ ...args }) => (
    <MemoryRouter>
      <ButtonLink {...args} />
    </MemoryRouter>
  ),
};
export default meta;

export const BasicButtonLink: Story = {
  args: {
    to: '/example',
    children: 'This is a button link',
  },
};

export const StyledButtonLink: Story = {
  args: {
    to: '/example',
    className: 'text-orange-200',
    children: 'This is a styled button link',
  },
};
