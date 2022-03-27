import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { ConfirmationPopup } from '@components/ConfirmationPopup';
import { StatefulCard } from '@components/cards/StatefulCard';
import { CollectionContent } from '@components/entityContents/CollectionContent';
import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { DELETE_COLLECTION_CONFIRMATION_POPUP } from '@utils/constants';
import { useAlerts, useBookActions, useCollectionActions, useCollectionLoad } from '@utils/hooks';

import { SUCCESSFULLY_DELETED, STYLES, PAGE_TITLE } from './constants';

export const Collection = () => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const history = useHistory();

  const { collection, pageState, loadCollection } = useCollectionLoad();
  const { addSuccess } = useAlerts();
  const { getAdminBookPageUrlWithoutId } = useBookActions();
  const collectionActions = useCollectionActions();

  const navigateToEditPage = () => {
    collection && collectionActions.navigateToEditForm(collection.id);
  }

  const handleConfirmDeletion = () => {
    collection && collectionActions.deleteCollection(collection.id, () => {
      addSuccess(SUCCESSFULLY_DELETED);
      collectionActions.navigateToAdminCollectionsPage();
    });

    setIsModalOpened(false);
  }

  useEffect(() => {
    loadCollection();
  }, []);

  return (
    <>
      <EntityPageHeader
        title={PAGE_TITLE}
        handleBackClick={() => history.goBack()}
        handleEditClick={navigateToEditPage}
        handleDeleteClick={() => setIsModalOpened(true)}/>

      <Box sx={STYLES.page}>
        <StatefulCard state={pageState}>
          <CollectionContent collection={collection} bookLink={getAdminBookPageUrlWithoutId()}/>
        </StatefulCard>
      </Box>

      <ConfirmationPopup
        info={DELETE_COLLECTION_CONFIRMATION_POPUP}
        isOpened={isModalOpened}
        handleConfirm={() => handleConfirmDeletion()}
        handleClose={() => setIsModalOpened(false)}
      />
    </>
  )
}
