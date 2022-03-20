import { useEffect, useState } from 'react';

import { ConfirmationPopup } from '@components/ConfirmationPopup';
import { DataTable } from '@components/dataTable';
import { IDataColumn } from '@components/dataTable/interfaces';
import { DELETE_AUTHOR_CONFIRMATION_POPUP } from '@utils/constants';
import { PageSizes, SortDirections, TableActions } from '@utils/enums';
import { IAuthor, ISearchOptions, ISortOptions, ITableItemAction } from '@utils/interfaces';
import { useAlerts, useApi, useAuthorActions } from '@utils/hooks';

import { COLUMNS, SUCCESSFULLY_DELETED } from '../../constants';

export const AuthorsTable = () => {
  const api = useApi();
  const { addSuccess } = useAlerts();
  const authorActions = useAuthorActions();

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

  const handleDeleteConfirmation = async (id: number) => {
    authorActions.deleteAuthor(id, () => {
      addSuccess(SUCCESSFULLY_DELETED)

      if(page !== 0 && data.length === 1) {
        setPage(page - 1);
        return;
      }

      getAuthors();
    });

    setIsModalOpened(false);
  }

  const handleClick = (tableItemAction: ITableItemAction): void => {
    switch(tableItemAction.actionType) {
      case TableActions.VIEW: {
        authorActions.navigateToAuthorPage(tableItemAction.id);
      } break;
      case TableActions.EDIT: {
        authorActions.navigateToEditForm(tableItemAction.id);
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

  return (
    <>
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

      <ConfirmationPopup
        info={DELETE_AUTHOR_CONFIRMATION_POPUP}
        isOpened={isModalOpened}
        handleConfirm={() => selectedId && handleDeleteConfirmation(selectedId)}
        handleClose={() => setIsModalOpened(false)}
      />
    </>
  );
}
