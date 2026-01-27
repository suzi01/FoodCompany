import type { Meta, StoryObj } from '@storybook/react-vite';
import { Drawer } from './Drawer';
import { useState } from 'react';

type Story = StoryObj<typeof Drawer>;

const meta: Meta<typeof Drawer> = {
  title: 'Drawer',
  component: Drawer,
  tags: ['autodocs'],
  render: () => <DrawerWithHooks />,
};

export default meta;

const DrawerWithHooks = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Drawer</button>
      <Drawer opened={isOpen} setOpened={setIsOpen}>
        <div>Drawer Content</div>
      </Drawer>
    </>
  );
};

export const BasicDrawer: Story = {
  args: {},
};
