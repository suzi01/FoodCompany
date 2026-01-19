import React from 'react';
import { render, screen, userEvent } from '@/testUtils';
import { MemoryRouter } from 'react-router-dom';
import { BasicMenu } from './BasicMenu';
import { vi } from 'vitest';

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'Profile', href: '/profile' },
  { label: 'Settings', onClick: vi.fn() },
];

const targetButton = <button>Open Menu</button>;

describe('BasicMenu', () => {
  const renderMenu = () =>
    render(
      <MemoryRouter>
        <BasicMenu target={targetButton} items={menuItems} />
      </MemoryRouter>,
    );

  test('renders the target button', () => {
    renderMenu();
    expect(screen.getByText('Open Menu')).toBeInTheDocument();
  });

  test('opens the menu on target click', async () => {
    renderMenu();
    await userEvent.click(screen.getByText('Open Menu'));
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  test('navigates to href on menu item click', async () => {
    renderMenu();
    await userEvent.click(screen.getByText('Open Menu'));
    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toHaveAttribute('href', '/');
  });

  test('calls onClick handler on menu item click', async () => {
    renderMenu();
    await userEvent.click(screen.getByText('Open Menu'));
    await userEvent.click(screen.getByText('Settings'));
    expect(menuItems[2].onClick).toHaveBeenCalled();
  });
});
