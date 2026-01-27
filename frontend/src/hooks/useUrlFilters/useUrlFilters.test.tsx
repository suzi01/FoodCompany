// generate tests for useUrlFilters hook

import { renderHook, act } from '@/testUtils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useUrlFilters } from './useUrlFilters';

describe('useUrlFilters', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={['/test']}>
      <Routes>
        <Route path="/test" element={children} />
      </Routes>
    </MemoryRouter>
  );

  it('should update a single filter in the URL', () => {
    const { result } = renderHook(() => useUrlFilters(), { wrapper });

    act(() => {
      result.current.updateFilter('status', 'active');
    });

    expect(result.current.searchParams.get('status')).toBe('active');
  });

  it('should remove a filter from the URL when value is empty', () => {
    const { result } = renderHook(() => useUrlFilters(), { wrapper });

    act(() => {
      result.current.updateFilter('status', 'active');
    });

    expect(result.current.searchParams.get('status')).toBe('active');

    act(() => {
      result.current.updateFilter('status', '');
    });

    expect(result.current.searchParams.get('status')).toBeNull();
  });

  it('should update multiple filters in the URL', () => {
    const { result } = renderHook(() => useUrlFilters(), { wrapper });

    act(() => {
      result.current.updateMultipleFilters({
        status: 'inactive',
        category: 'retail',
      });
    });

    expect(result.current.searchParams.get('status')).toBe('inactive');
    expect(result.current.searchParams.get('category')).toBe('retail');
  });

  it('should remove multiple filters from the URL when values are empty', () => {
    const { result } = renderHook(() => useUrlFilters(), { wrapper });

    act(() => {
      result.current.updateMultipleFilters({
        status: 'inactive',
        category: 'retail',
      });
    });

    expect(result.current.searchParams.get('status')).toBe('inactive');
    expect(result.current.searchParams.get('category')).toBe('retail');

    act(() => {
      result.current.updateMultipleFilters({
        status: '',
        category: '',
      });
    });

    expect(result.current.searchParams.get('status')).toBeNull();
    expect(result.current.searchParams.get('category')).toBeNull();
  });
});
