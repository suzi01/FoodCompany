import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentProps, useState } from 'react';
import { Accordion } from './Accordion';

type Story = StoryObj<typeof Accordion>;

const meta: Meta<typeof Accordion> = {
  title: 'Accordion',
  component: Accordion,
  tags: ['autodocs'],
  render: (args: ComponentProps<typeof Accordion>) => <Template {...args} />,
};

export default meta;

const Template = (args: ComponentProps<typeof Accordion>) => {
  const [isOpen, setIsOpen] = useState<boolean>(args.isOpen || false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return <Accordion {...args} isOpen={isOpen} onClick={handleClick} />;
};

export const Default: Story = {
  args: {
    headerContent: <h3 className="text-lg font-medium">Accordion Header</h3>,
    content: (
      <div className="p-4 border-t border-blue-300">
        <p>This is the content inside the accordion.</p>
      </div>
    ),
  },
};

export const WithStatusPill: Story = {
  args: {
    status: 'active',
    headerContent: <h3 className="text-lg font-medium">Accordion Header</h3>,
    content: (
      <div className="p-4 border-t border-blue-300">
        <p>This is the content inside the accordion.</p>
      </div>
    ),
  },
};

export const InitiallyOpen: Story = {
  args: {
    isOpen: true,
    headerContent: <h3 className="text-lg font-medium">Accordion Header</h3>,
    content: (
      <div className="p-4 border-t border-blue-300">
        <p>This is the content inside the accordion.</p>
      </div>
    ),
  },
};
