import React, { Dispatch } from 'react';
import { Drawer as MantineDrawer } from '@mantine/core';

interface DrawerProps {
  opened: boolean;
  setOpened: Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export const Drawer = ({ opened, setOpened, children }: DrawerProps) => {
  return (
    <MantineDrawer
      opened={opened}
      onClose={() => setOpened(false)}
      title="Filter Options"
      padding="xl"
      size="md"
    >
      {children}
    </MantineDrawer>
  );
};
