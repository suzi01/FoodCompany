import React from 'react';

import { Menu, MenuProps } from '@mantine/core';
import { Link } from 'react-router-dom';

interface BasicMenuProps extends MenuProps {
  target: React.ReactNode;
  items: {
    label: string;
    href?: string;
    onClick?: () => void;
    color?: string;
  }[];
}

export const BasicMenu = ({
  target,
  items,
  position = 'bottom-start',
  withArrow = true,
  ...menuProps
}: BasicMenuProps) => {
  return (
    <Menu withArrow={withArrow} position={position} {...menuProps}>
      <Menu.Target>{target}</Menu.Target>
      <Menu.Dropdown>
        {items.map((item, index) =>
          item.href ? (
            <Menu.Item
              key={`menu-item-${index}`}
              component={Link}
              to={item.href}
              color={item.color}
            >
              {item.label}
            </Menu.Item>
          ) : (
            <Menu.Item
              key={`menu-item-${index}`}
              onClick={item.onClick}
              color={item.color}
            >
              {item.label}
            </Menu.Item>
          ),
        )}
      </Menu.Dropdown>
    </Menu>
  );
};
