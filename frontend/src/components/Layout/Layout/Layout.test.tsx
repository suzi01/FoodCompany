import '@testing-library/jest-dom';

import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';

import { Breadcrumb } from '@/components/common/Breadcrumb/Breadcrumb';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';

describe('Layout.tsx', () => {
  it('renders Layout correctly', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="*" element={<Breadcrumb />} />
          <Layout />
        </Routes>
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
