import { render, screen, userEvent } from '@/testUtils';
import { MemoryRouter } from 'react-router-dom';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  const pages = [
    { name: 'Home', path: '/' },
    { name: 'Suppliers', path: '/suppliers' },
    { name: 'Products', path: '/products' },
    { name: 'Branches', path: '/branches' },
  ];

  test('renders sidebar with correct links', async () => {
    render(
      <MemoryRouter>
        <Sidebar pages={pages} />
      </MemoryRouter>,
    );

    await userEvent.click(
      screen.getByRole('button', { name: /toggle navigation/i }),
    );

    pages.forEach((page) => {
      const linkElement = screen.getByText(page.name);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement.closest('a')).toHaveAttribute('href', page.path);
    });
  });
});
