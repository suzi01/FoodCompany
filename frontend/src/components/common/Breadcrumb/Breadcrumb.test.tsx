import React from 'react';
import { render } from '@/testUtils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Breadcrumb } from './Breadcrumb';

describe('Breadcrumb Component', () => {
  const renderWithRouter = (initialEntries: string[]) => {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="*" element={<Breadcrumb />} />
        </Routes>
      </MemoryRouter>,
    );
  };

  it('renders Home only for root path', () => {
    const { queryByText } = renderWithRouter(['/']);
    expect(queryByText('Home')).not.toBeInTheDocument();
    expect(queryByText('>')).not.toBeInTheDocument();
  });
  it('renders correct breadcrumb for single level path', () => {
    const { getByText } = renderWithRouter(['/branches']);
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('branches')).toBeInTheDocument();
    expect(getByText('branches')).toHaveClass('text-blue-700 font-medium');
  });
  it('renders correct breadcrumb for multi-level path', () => {
    const { queryByText, getByText } = renderWithRouter(['/branches/attempt']);
    expect(queryByText('Home')).toBeInTheDocument();
    expect(getByText(/branches/)).toBeInTheDocument();
  });
});
