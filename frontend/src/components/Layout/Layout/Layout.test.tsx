import '@testing-library/jest-dom';

import { screen, render } from '@/testUtils';

import { MemoryRouter } from 'react-router-dom';
import { Layout } from './Layout';

describe('Layout.tsx', () => {
  it('renders Layout correctly', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Layout />
      </MemoryRouter>,
    );
    const mainTitle = screen.getAllByText(/naturalfoods/i);
    const headerUserName = screen.getByText('Janine Wilson');
    const contactTag = screen.getByText('Contact Us');

    expect(headerUserName).toBeInTheDocument();
    expect(contactTag).toBeInTheDocument();
    expect(mainTitle.length).toBe(3);
  });
});
