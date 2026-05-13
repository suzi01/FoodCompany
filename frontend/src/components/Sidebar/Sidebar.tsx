import { Burger, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';

interface SidebarProps {
  pages: { name: string; path: string }[];
}

export const Sidebar = ({ pages }: SidebarProps) => {
  const [opened, { toggle }] = useDisclosure();
  return (
    <div>
      <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" />
      <Drawer
        position="left"
        size="md"
        opened={opened}
        onClose={toggle}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <div>
          {pages.map((page) => (
            <Link
              key={`menu-item-${page.name.toLowerCase()}`}
              to={page.path}
              onClick={toggle}
              className="block text-xl px-4 py-2 text-gray-700 hover:bg-blue-400 rounded hover:text-white"
            >
              {page.name}
            </Link>
          ))}
        </div>
      </Drawer>
    </div>
  );
};
