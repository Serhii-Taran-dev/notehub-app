'use client';

import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (selectedPage: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const currentPage = Math.min(Math.max(page, 1), totalPages);

  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={currentPage - 1}
      onPageChange={(event) => onPageChange(event.selected + 1)}
      disableInitialCallback
      containerClassName={css.pagination}
      activeClassName={css.active}
      pageClassName={css.page}
      previousLabel="←"
      nextLabel="→"
      previousAriaLabel="Go to previous page"
      nextAriaLabel="Go to next page"
      ariaLabelBuilder={(pageNumber) => `Go to page ${pageNumber}`}
      breakLabel="…"
    />
  );
}
