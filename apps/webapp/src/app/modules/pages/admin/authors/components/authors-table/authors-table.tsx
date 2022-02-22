import { useEffect, useState } from 'react';

import { PageSizes, SortDirections } from '@core/enums';
import { IAuthor, ISearchOptions, ISortOptions } from '@core/interfaces';
import { apiService } from '@shared/services';
import { DataTable } from '@features/data-table';
import { IDataColumn } from '@features/data-table/interfaces';

import { COLUMNS } from '../../constants';

export const AuthorsTable = () => {
  const [data, setData] = useState<IAuthor[]>([]);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOptions, setSortOptions] = useState<ISortOptions>({
    order: SortDirections.Asc,
    orderBy: COLUMNS[0].id
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(PageSizes.Ten);

  const columns: IDataColumn[] = COLUMNS;

  const getAuthors = async () => {
    setLoading(true);

    const searchOptions: ISearchOptions = {
      pageSize: rowsPerPage,
      page: page,
      order: sortOptions.order,
      orderBy: sortOptions.orderBy,
    }
    const response = await apiService.getAuthors(searchOptions);

    response.data.map((author: IAuthor) => {
      author.fullName = `${author.surname || ''} ${author.name || ''}`;
    });

    setData(response.data);
    setCount(response.count);
    setLoading(false);
  }

  useEffect(() => {
    getAuthors();
  }, [sortOptions, page, rowsPerPage])

  const handleClick = () => {};

  const handleRowsPerPageChanged = () => {};

  const handlePageChange = () => {};

  const handleSortRequest = (newSortOptions: ISortOptions) => {
    setSortOptions(newSortOptions);
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      count={count}
      sortOptions={sortOptions}
      onHandleClick={handleClick}
      onHandleRowsPerPageChanged={handleRowsPerPageChanged}
      onHandlePageChange={handlePageChange}
      onHandleSortRequest={handleSortRequest}
    />
  );
}
