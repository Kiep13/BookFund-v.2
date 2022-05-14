import { useEffect } from 'react';

import { ConfirmationPopup } from '@components/ConfirmationPopup';
import { DataTable } from '@components/tables/DataTable';
import { DELETE_AUTHOR_CONFIRMATION_POPUP } from '@utils/constants';
import { useAuthorsTable } from './useAuthorsTable';

export const AuthorsTable = () => {
  const {
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
  } = useAuthorsTable();

  useEffect(() => {
    loadData();
  }, [sortOptions, page, rowsPerPage]);

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
        handleConfirm={handleModalConfirm}
        handleClose={handleModalClose}
      />
    </>
  );
}
