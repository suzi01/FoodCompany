import { render, screen, userEvent } from '@/testUtils';
import { Pagination } from './Pagination';
import { vi } from 'vitest';

describe('Pagination Component', () => {
  const mockSetCurrentPage = vi.fn();

  beforeEach(() => {
    mockSetCurrentPage.mockClear();
  });

  it('renders pagination buttons correctly', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        setCurrentPage={mockSetCurrentPage}
        siblingCount={1}
      />,
    );

    // Check if the correct page numbers are rendered
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('disables Previous and First buttons on first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        setCurrentPage={mockSetCurrentPage}
        siblingCount={1}
      />,
    );

    expect(screen.getByText('<< First')).toBeDisabled();
    expect(screen.getByText('< Previous')).toBeDisabled();
  });

  it('disables Next and Last buttons on last page', () => {
    render(
      <Pagination
        currentPage={10}
        totalPages={10}
        setCurrentPage={mockSetCurrentPage}
        siblingCount={1}
      />,
    );

    expect(screen.getByText('Next >')).toBeDisabled();
    expect(screen.getByText('Last >>')).toBeDisabled();
  });

    it('calls setCurrentPage with correct page number when a page button is clicked', async () => {
      render(
        <Pagination
          currentPage={3}
          totalPages={10}
          setCurrentPage={mockSetCurrentPage}
          siblingCount={1}
        />,
      );

      await userEvent.click(screen.getByText('4'));
      expect(mockSetCurrentPage).toHaveBeenCalledWith(4);

      await userEvent.click(screen.getByText('< Previous'));
      expect(mockSetCurrentPage).toHaveBeenCalledWith(2);

      await userEvent.click(screen.getByText('Next >'));
      expect(mockSetCurrentPage).toHaveBeenCalledWith(4);
    });
});
