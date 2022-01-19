import * as React from 'react';

import { IAuthor } from '@core/interfaces';
import DataTable from '@features/data-table';
import { IDataColumn } from '@features/data-table/interfaces';
import { AUTHORS_MOCK } from '@mocks/authors.mock';
import { COLUMNS } from '@pages/admin/authors/constants/columns';

export default function AuthorsTable() {
  const data: IAuthor[] = AUTHORS_MOCK;
  const columns: IDataColumn[] = COLUMNS;

  const handleClick = () => {};

  const handleRowsPerPageChanged = () => {};

  const handlePageChange = () => {};

  const handleSortRequest = () => {};

  return (
    <DataTable columns={columns}
               data={data}
               count={data.length}
               onHandleClick={handleClick}
               onHandleRowsPerPageChanged={handleRowsPerPageChanged}
               onHandlePageChange={handlePageChange}
               onHandleSortRequest={handleSortRequest}
    />
  );
}
