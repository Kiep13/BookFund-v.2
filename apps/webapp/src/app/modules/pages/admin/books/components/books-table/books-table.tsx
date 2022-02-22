import { useState } from 'react';

import { SortDirections } from '@core/enums';
import { IBook, ISortOptions } from '@core/interfaces';
import { DataTable } from '@features/data-table';
import { IDataColumn } from '@features/data-table/interfaces';
import { BOOKS_MOCK } from '@mocks/books.mock';

import { COLUMNS } from '../../constants';

export const BooksTable = () => {
  const [sortOptions, setSortOptions] = useState<ISortOptions>({
    order: SortDirections.Asc,
    orderBy: COLUMNS[0].id
  });

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
      onHandleClick={handleClick}
      onHandleRowsPerPageChanged={handleRowsPerPageChanged}
      onHandlePageChange={handlePageChange}
      onHandleSortRequest={handleSortRequest}
    />
  );
}
