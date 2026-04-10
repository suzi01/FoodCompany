import { getPaginationItems } from '@/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  siblingCount?: number;
}

export const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
  siblingCount = 1,
}: PaginationProps) => {
  const paginationItems = getPaginationItems(
    currentPage,
    totalPages,
    siblingCount,
  );
  return (
    <div>
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(1)}
        className="px-3 py-2 m-2 rounded-md hover:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        &lt;&lt; First
      </button>
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="px-3 py-2 m-2 rounded-md hover:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        &lt; Previous
      </button>

      {paginationItems.map((item, index) => {
        if (item === '...') {
          return (
            <span key={`ellipsis-${index}`} className="px-2 py-2 m-1">
              ...
            </span>
          );
        }
        return (
          <button
            key={item}
            onClick={() => setCurrentPage(item as number)}
            disabled={typeof item === 'string'}
            className={`px-4 py-2 m-1 rounded-md hover:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed ${
              currentPage === item ? 'bg-blue-600 border text-white' : ''
            }`}
          >
            {item}
          </button>
        );
      })}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="px-3 py-2 m-2 rounded-md hover:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        Next &gt;
      </button>
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(totalPages)}
        className="px-3 py-2 m-2 rounded-md hover:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        Last &gt;&gt;
      </button>
    </div>
  );
};
