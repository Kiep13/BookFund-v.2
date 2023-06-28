import { Box } from '@mui/material';

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
    isLoading,
    isError,
    headerActions,
    isModalOpened,
    navigateBack,
    handleHeaderIconClick,
    getAdminBookPageUrlWithoutId,
    closeModal,
    handleConfirmDeletion
  } = useAuthor();

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
          <StatefulCard isNoContent={!author} isLoading={isLoading} isError={isError}>
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
