import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { API_TOOLTIP_ERROR } from '@core/constants';
import { AdminRoutePaths, PageSizes, SortDirections, TableActions } from '@core/enums';
import { IAuthor, ISearchOptions, ISortOptions, ITableItemAction } from '@core/interfaces';
import { DataTable } from '@features/dataTable';
import { IDataColumn } from '@features/dataTable/interfaces';
import { useAlerts } from '@features/alertsBlock/hooks';
import { useApi } from '@shared/hooks';

import { COLUMNS, SUCCESSFULLY_DELETED } from '../../constants';

export const AuthorsTable = () => {
  const history = useHistory();
  const api = useApi();
  const { addSuccess, addError } = useAlerts();

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
      order: sortOptions.order.toUpperCase(),
      orderBy: sortOptions.orderBy,
    }
    const response = await api.getAuthors(searchOptions);

    setData(response.data);
    setCount(response.count);
    setLoading(false);
  }

  useEffect(() => {
    getAuthors();
  }, [sortOptions, page, rowsPerPage]);

  const navigateToEditForm = (id: number): void => {
    history.push(`${AdminRoutePaths.ADMIN}${AdminRoutePaths.AUTHOR_EDIT}/${id}`, {
      editMode: true,
    });
  }

  const deleteAuthor = async (id: number) => {
    api.deleteAuthor(id)
      .then(() => {
        addSuccess(SUCCESSFULLY_DELETED)

        if(page !== 0 && data.length === 1) {
          setPage(page - 1);
          return;
        }

        getAuthors();
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
      })
  }

  const handleClick = (tableItemAction: ITableItemAction): void => {
    switch(tableItemAction.actionType) {
      case TableActions.EDIT: {
        navigateToEditForm(tableItemAction.id);
      } break;
      case TableActions.DELETE: {
        deleteAuthor(tableItemAction.id)
      } break;
    }
  };

  const handleRowsPerPageChanged = (newRowsPerPage: number): void => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handlePageChange = (newPage: number): void => {
    setPage(newPage);
  };

  const handleSortRequest = (newSortOptions: ISortOptions): void => {
    setSortOptions(newSortOptions);
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      count={count}
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
