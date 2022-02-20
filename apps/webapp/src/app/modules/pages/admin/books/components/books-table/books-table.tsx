import { IBook } from '@core/interfaces';
import { DataTable } from '@features/data-table';
import { IDataColumn } from '@features/data-table/interfaces';
import { BOOKS_MOCK } from '@mocks/books.mock';

import { COLUMNS } from '../../constants';

export const BooksTable = () => {
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
      onHandleClick={handleClick}
      onHandleRowsPerPageChanged={handleRowsPerPageChanged}
      onHandlePageChange={handlePageChange}
      onHandleSortRequest={handleSortRequest}
    />
  );
}
