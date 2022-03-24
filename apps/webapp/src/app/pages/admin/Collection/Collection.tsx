import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { ConfirmationPopup } from '@components/ConfirmationPopup';
import { StatefulCard } from '@components/cards/StatefulCard';
import { CollectionContent } from '@components/entityContents/CollectionContent';
import { EntityPageHeader } from '@components/headers/EntityPageHeader';
import { API_TOOLTIP_ERROR, DELETE_COLLECTION_CONFIRMATION_POPUP } from '@utils/constants';
import { AdminRoutePaths, CardStates } from '@utils/enums';
import { ICollection, IFormPageParams } from '@utils/interfaces';
import { useAlerts, useApi, useBookActions, useCollectionActions } from '@utils/hooks';

import { SUCCESSFULLY_DELETED, STYLES, PAGE_TITLE } from './constants';

export const Collection = () => {
  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [collection, setCollection] = useState<ICollection>();

  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const history = useHistory();
  const params = useParams();
  const alerts = useAlerts();
  const api = useApi();
  const bookActions = useBookActions();
  const collectionActions = useCollectionActions();

  const navigateToEditPage = () => {
    collection && collectionActions.navigateToEditForm(collection.id);
  }

  const handleConfirmDeletion = () => {
    collection && collectionActions.deleteCollection(collection.id, () => {
      alerts.addSuccess(SUCCESSFULLY_DELETED);
      collectionActions.navigateToCollectionsPage();
    });

    setIsModalOpened(false);
  }

  const loadCollection = () => {
    const collectionId = (params as IFormPageParams).id;

    api.getCollection(collectionId)
      .then((response: ICollection) => {
        setCollection(response);
        setPageState(CardStates.CONTENT);
      })
      .catch(() => {
        alerts.addError(API_TOOLTIP_ERROR);
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
          <CollectionContent collection={collection} bookLink={`${AdminRoutePaths.ADMIN}/${AdminRoutePaths.BOOK}`}/>
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
