import { Box } from '@mui/material';

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
    headerActions,
    isModalOpened,
    navigateBack,
    handleHeaderIconClick,
    getAdminAuthorPageUrlWithoutId,
    handleConfirmDeletion,
    closeModal
  } = useBook();

  return (
    <>
      <EntityPageHeader
        title={PAGE_TITLE}
        actions={headerActions}
        handleBackClick={navigateBack}
        handleIconClick={handleHeaderIconClick}
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
