import { useState } from 'react';

import { PageSizes, SortDirections } from '@core/enums';
import { IBook, ISortOptions } from '@core/interfaces';
import { DataTable } from '@features/dataTable';
import { IDataColumn } from '@features/dataTable/interfaces';
import { BOOKS_MOCK } from '@mocks/books.mock';

import { COLUMNS } from '../../constants';

export const BooksTable = () => {
  const [sortOptions, setSortOptions] = useState<ISortOptions>({
    order: SortDirections.Asc,
    orderBy: COLUMNS[0].id
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(PageSizes.Ten);
  const [loading, setLoading] = useState<boolean>(true);

  const data: IBook[] = BOOKS_MOCK.map((book: IBook) => {
    book.authorFullName = `${book.author?.surname || ' '} ${book.author?.name || ' '}`;
    return book;
  });

  const columns: IDataColumn[] = COLUMNS;

  const handleClick = () => {};

  const handleRowsPerPageChanged = () => {};

  const handlePageChange = () => {};

  const handleSortRequest = () => {};

  return (
    <DataTable
      columns={columns}
      data={data}
      count={data.length}
      sortOptions={sortOptions}
      page={page}
      rowsPerPage={rowsPerPage}
      onHandleClick={handleClick}
      loading={loading}
      onHandleRowsPerPageChanged={handleRowsPerPageChanged}
      onHandlePageChange={handlePageChange}
      onHandleSortRequest={handleSortRequest}
    />
  );
}
