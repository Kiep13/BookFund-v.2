import { useEffect } from 'react';

import { DataTable } from '@components/tables/DataTable';
import { ConfirmationPopup } from '@components/ConfirmationPopup';
import { DELETE_BOOK_CONFIRMATION_POPUP } from '@utils/constants';

import { useBooksTable } from './useBooksTable';

export const BooksTable = () => {
  const {
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
  } = useBooksTable();

  useEffect(() => {
    getBooks();
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
        info={DELETE_BOOK_CONFIRMATION_POPUP}
        isOpened={isModalOpened}
        handleConfirm={handleConfirm}
        handleClose={handleClose}
      />
    </>
  );
}
