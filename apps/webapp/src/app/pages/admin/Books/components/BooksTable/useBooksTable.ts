import { useState } from 'react';

import { API_TOOLTIP_ERROR } from '@utils/constants';
import { PageSizes, SortDirections, TableActions } from '@utils/enums';
import { IBook, IDataColumn, IListApiView, ISearchOptions, ISortOptions, ITableItemAction } from '@utils/interfaces';
import { useApi, useAlerts, useBookActions } from '@utils/hooks';

import { COLUMNS, SUCCESSFULLY_DELETED } from '../../constants';

export const useBooksTable = () => {
  const api = useApi();
  const {addError, addSuccess} = useAlerts();
  const {deleteBook, navigateToAdminBookPage, navigateToEditForm} = useBookActions();

  const [data, setData] = useState<IBook[]>([]);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOptions, setSortOptions] = useState<ISortOptions>({
    order: SortDirections.Asc,
    orderBy: COLUMNS[0].id
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(PageSizes.Ten);

  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>();

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

  const handleDeleteConfirmation = async (id: number) => {
    deleteBook(id, () => {
      addSuccess(SUCCESSFULLY_DELETED);

      if(page !== 0 && data.length === 1) {
        setPage(page - 1);
        return;
      }

      getBooks();
    });

    setIsModalOpened(false)
  }

  const handleClick = (tableItemAction: ITableItemAction): void => {
    switch(tableItemAction.actionType) {
      case TableActions.VIEW: {
        navigateToAdminBookPage(tableItemAction.id);
      } break;
      case TableActions.EDIT: {
        navigateToEditForm(tableItemAction.id);
      } break;
      case TableActions.DELETE: {
        setSelectedId(tableItemAction.id);
        setIsModalOpened(true);
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

  const handleConfirm = (): void => {
    selectedId && handleDeleteConfirmation(selectedId);
  };

  const handleClose = (): void => {
    setIsModalOpened(false);
  }

  return {
    data,
    columns,
    count,
    loading,
    rowsPerPage,
    page,
    sortOptions,
    isModalOpened,
    getBooks,
    handleClick,
    handleRowsPerPageChanged,
    handlePageChange,
    handleSortRequest,
    handleConfirm,
    handleClose
  }
}
