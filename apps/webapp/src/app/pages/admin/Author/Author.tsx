import { Box } from '@mui/material';
import { useEffect } from 'react';

import { Card } from '@components/cards/Card';
import { AuthorContent } from '@components/entityContents/AuthorContent';
import { ConfirmationPopup } from '@components/ConfirmationPopup';
import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { StatefulCard } from '@components/cards/StatefulCard';
import { DELETE_AUTHOR_CONFIRMATION_POPUP } from '@utils/constants';

import { PAGE_TITLE, STYLES } from './constants';
import { useAuthor } from './useAuthor';

export const Author = () => {
  const {
    author,
    pageState,
    isModalOpened,
    loadAuthor,
    navigateBack,
    navigateToEditPage,
    getAdminBookPageUrlWithoutId,
    openModal,
    closeModal,
    handleConfirmDeletion
  } = useAuthor();

  useEffect(() => {
    loadAuthor();
  }, []);

  return (
    <>
      <EntityPageHeader
        title={PAGE_TITLE}
        handleBackClick={navigateBack}
        handleEditClick={navigateToEditPage}
        handleDeleteClick={openModal}/>

      <Card>
        <Box sx={STYLES.page}>
          <StatefulCard state={pageState}>
            <AuthorContent author={author} bookLink={getAdminBookPageUrlWithoutId()}/>
          </StatefulCard>
        </Box>
      </Card>

      <ConfirmationPopup
        info={DELETE_AUTHOR_CONFIRMATION_POPUP}
        isOpened={isModalOpened}
        handleConfirm={handleConfirmDeletion}
        handleClose={closeModal}
      />
    </>
  )
}
