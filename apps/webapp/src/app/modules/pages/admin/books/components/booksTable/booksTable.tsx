import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { API_TOOLTIP_ERROR } from '@core/constants';
import { AdminRoutePaths, PageSizes, SortDirections, TableActions } from '@core/enums';
import { IBook, IListApiView, ISearchOptions, ISortOptions, ITableItemAction } from '@core/interfaces';
import { useAlerts } from '@features/alertsBlock/hooks';
import { DataTable } from '@features/dataTable';
import { IDataColumn } from '@features/dataTable/interfaces';
import { useApi } from '@shared/hooks';

import { COLUMNS, SUCCESSFULLY_DELETED } from '../../constants';

export const BooksTable = () => {
  const history = useHistory();
  const api = useApi();
  const { addSuccess, addError } = useAlerts();

  const [data, setData] = useState<IBook[]>([]);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOptions, setSortOptions] = useState<ISortOptions>({
    order: SortDirections.Asc,
    orderBy: COLUMNS[0].id
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(PageSizes.Ten);

  const columns: IDataColumn[] = COLUMNS;

  const getBooks = async () => {
    setLoading(true);

    const searchOptions: ISearchOptions = {
      pageSize: rowsPerPage,
      page: page,
      order: sortOptions.order.toUpperCase(),
      orderBy: sortOptions.orderBy,
    }

    await api.getBooks(searchOptions)
      .then((response: IListApiView<IBook>) => {
        setCount(response.count);
        setData(response.data.map((book: IBook) => {
          return {
            ...book,
            avgRate: +book.avgRate.toFixed(1),
            authorFullName: `${book.author?.surname || ' '} ${book.author?.name || ' '}`
          }
        }));
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
      })
      .then(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getBooks();
  }, [sortOptions, page, rowsPerPage]);

  const navigateToEditForm = (id: number): void => {
    history.push(`${AdminRoutePaths.ADMIN}${AdminRoutePaths.BOOKS_EDIT}/${id}`);
  }

  const deleteBook = async (id: number) => {
    api.deleteBook(id)
      .then(() => {
        addSuccess(SUCCESSFULLY_DELETED);

        if(page !== 0 && data.length === 1) {
          setPage(page - 1);
          return;
        }

        getBooks();
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
      })
  }

  const handleClick = (tableItemAction: ITableItemAction) => {
    switch(tableItemAction.actionType) {
      case TableActions.EDIT: {
        navigateToEditForm(tableItemAction.id);
      } break;
      case TableActions.DELETE: {
        deleteBook(tableItemAction.id);
      } break;
    }
  };

  const handleRowsPerPageChanged = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSortRequest = (newSortOptions: ISortOptions) => {
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
