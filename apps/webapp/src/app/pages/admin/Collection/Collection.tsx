import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { ConfirmationPopup } from '@components/ConfirmationPopup';
import { StatefulCard } from '@components/cards/StatefulCard';
import { CollectionContent } from '@components/entityContents/CollectionContent';
import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { API_TOOLTIP_ERROR, DELETE_COLLECTION_CONFIRMATION_POPUP } from '@utils/constants';
import { CardStates } from '@utils/enums';
import { ICollection, IFormPageParams } from '@utils/interfaces';
import { useAlerts, useApi, useBookActions, useCollectionActions } from '@utils/hooks';

import { SUCCESSFULLY_DELETED, STYLES, PAGE_TITLE } from './constants';

export const Collection = () => {
  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [collection, setCollection] = useState<ICollection>();

  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const history = useHistory();
  const params = useParams();
  const { addSuccess, addError } = useAlerts();
  const { getCollection } = useApi();
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

  const loadCollection = () => {
    const collectionId = (params as IFormPageParams).id;

    getCollection(collectionId)
      .then((response: ICollection) => {
        setCollection(response);
        setPageState(CardStates.CONTENT);
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
        setPageState(CardStates.ERROR);
      })
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
