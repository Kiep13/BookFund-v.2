import { useState } from 'react';

import { API_TOOLTIP_ERROR } from '@utils/constants';
import { PageSizes, SortDirections, TableActions } from '@utils/enums';
import { IAuthor, IDataColumn, IListApiView, ISearchOptions, ISortOptions, ITableItemAction } from '@utils/interfaces';
import { useAlerts, useApi, useAuthorActions } from '@utils/hooks';

import { COLUMNS, SUCCESSFULLY_DELETED } from '../../constants';

export const useAuthorsTable = () => {
  const [data, setData] = useState<IAuthor[]>([]);
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

  const {getAuthors} = useApi();
  const {addSuccess, addError} = useAlerts();
  const {deleteAuthor, navigateToAdminAuthorPage, navigateToEditForm} = useAuthorActions();

  const columns: IDataColumn[] = COLUMNS;

  const loadData = async () => {
    setLoading(true);

    const searchOptions: ISearchOptions = {
      pageSize: rowsPerPage,
      page: page,
      order: sortOptions.order.toUpperCase(),
      orderBy: sortOptions.orderBy,
    }

    getAuthors(searchOptions)
      .then((response: IListApiView<IAuthor>) => {
        setData(response.data);
        setCount(response.count);
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR)
      })
      .finally(() => {
        setLoading(false);
      })
  }

  const handleDeleteConfirmation = async (id: number) => {
    deleteAuthor(id, () => {
      addSuccess(SUCCESSFULLY_DELETED)

      if (page !== 0 && data.length === 1) {
        setPage(page - 1);
        return;
      }

      loadData();
    });

    setIsModalOpened(false);
  }

  const handleClick = (tableItemAction: ITableItemAction): void => {
    switch (tableItemAction.actionType) {
      case TableActions.VIEW: {
        navigateToAdminAuthorPage(tableItemAction.id);
      }
        break;
      case TableActions.EDIT: {
        navigateToEditForm(tableItemAction.id);
      }
        break;
      case TableActions.DELETE: {
        setSelectedId(tableItemAction.id);
        setIsModalOpened(true);
      }
        break;
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

  const handleModalConfirm = (): void => {
    selectedId && handleDeleteConfirmation(selectedId);
  }

  const handleModalClose = (): void => {
    setIsModalOpened(false);
  }

  return {
    data,
    columns,
    count,
    page,
    sortOptions,
    rowsPerPage,
    loading,
    isModalOpened,
    loadData,
    handleClick,
    handleRowsPerPageChanged,
    handlePageChange,
    handleSortRequest,
    handleModalConfirm,
    handleModalClose
  }
}
