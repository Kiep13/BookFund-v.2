import { Box } from '@mui/material';
import { useEffect } from 'react';

import { ConfirmationPopup } from '@components/ConfirmationPopup';
import { StatefulCard } from '@components/cards/StatefulCard';
import { CollectionContent } from '@components/entityContents/CollectionContent';
import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { DELETE_COLLECTION_CONFIRMATION_POPUP } from '@utils/constants';

import { STYLES, PAGE_TITLE } from './constants';
import { useCollection } from './useCollection';

export const Collection = () => {
  const {
    collection,
    pageState,
    headerActions,
    isModalOpened,
    loadCollection,
    navigateBack,
    handleHeaderIconClick,
    getAdminBookPageUrlWithoutId,
    handleConfirmDeletion,
    closeModal
  } = useCollection();

  useEffect(() => {
    loadCollection();
  }, []);

  return (
    <>
      <EntityPageHeader
        title={PAGE_TITLE}
        actions={headerActions}
        handleBackClick={navigateBack}
        handleIconClick={handleHeaderIconClick}
      />

      <Box sx={STYLES.page}>
        <StatefulCard state={pageState}>
          <CollectionContent collection={collection} bookLink={getAdminBookPageUrlWithoutId()}/>
        </StatefulCard>
      </Box>

      <ConfirmationPopup
        info={DELETE_COLLECTION_CONFIRMATION_POPUP}
        isOpened={isModalOpened}
        handleConfirm={handleConfirmDeletion}
        handleClose={closeModal}
      />
    </>
  )
}
