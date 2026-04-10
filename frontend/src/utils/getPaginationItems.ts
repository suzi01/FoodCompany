export const getPaginationItems = (
  currentPage: number,
  totalPages: number,
  siblingCount: number,
) => {
  const pages: (number | string)[] = [];
  pages.push(1);

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  // Add left ellipsis if needed
  if (leftSibling > 2) {
    pages.push('...');
  }

  // Add pages around current page
  for (let i = leftSibling; i <= rightSibling; i++) {
    if (!pages.includes(i)) {
      pages.push(i);
    }
  }

  if (rightSibling < totalPages - 1) {
    pages.push('...');
  }

  if (totalPages > 1 && !pages.includes(totalPages)) {
    pages.push(totalPages);
  }
  return pages;
};
