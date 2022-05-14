import { Box } from '@mui/material';
import { useEffect } from 'react';

import { ConfirmationPopup } from '@components/ConfirmationPopup';
import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { Card } from '@components/cards/Card';
import { StatefulCard } from '@components/cards/StatefulCard';
import { BookContent } from '@components/entityContents/BookContent';
import { DELETE_BOOK_CONFIRMATION_POPUP } from '@utils/constants';

import { PAGE_TITLE, STYLES } from './constants';
import { useBook } from './useBook';

export const Book = () => {
  const {
    book,
    pageState,
    isModalOpened,
    loadBook,
    navigateBack,
    navigateToEditPage,
    getAdminAuthorPageUrlWithoutId,
    handleConfirmDeletion,
    openModal,
    closeModal
  } = useBook();

  useEffect(() => {
    loadBook();
  }, []);

  return (
    <>
      <EntityPageHeader
        title={PAGE_TITLE}
        handleBackClick={navigateBack}
        handleEditClick={navigateToEditPage}
        handleDeleteClick={openModal}
      />

      <Card>
        <Box sx={STYLES.page}>
          <StatefulCard state={pageState}>
            <BookContent book={book} authorLink={getAdminAuthorPageUrlWithoutId()}/>
          </StatefulCard>
        </Box>
      </Card>

      <ConfirmationPopup
        info={DELETE_BOOK_CONFIRMATION_POPUP}
        isOpened={isModalOpened}
        handleConfirm={handleConfirmDeletion}
        handleClose={closeModal}
      />
    </>
  )
}
