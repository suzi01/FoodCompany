import React from 'react';
import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';

import { SearchBar } from './SearchBar';

const searchBarProps = {
  text: '',
  onTextChange: () => {},
  onClear: () => {},
};

describe('SearchBar.tsx', () => {
  it('renders SearchBar', () => {
    render(<SearchBar {...searchBarProps} />);
    const searchPlaceholder = screen.getByPlaceholderText('Search...');
    const searchIcon = screen.getByAltText('search-icon');
    expect(searchIcon).toBeInTheDocument();
    expect(searchPlaceholder).toBeInTheDocument();
  });

  it('renders SearchBar with text', () => {
    render(<SearchBar {...searchBarProps} text="some text" />);
    const searchPlaceholder = screen.queryByDisplayValue('Search...');
    const searchInput = screen.getByDisplayValue('some text');
    expect(searchPlaceholder).not.toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
  });

  it('renders styled SearchBar', () => {
    render(<SearchBar {...searchBarProps} className="border-pink-100" />);
    const labelContainer = screen.getByTestId('search-label');
    expect(labelContainer).toHaveClass('border-pink-100');
  });
});
