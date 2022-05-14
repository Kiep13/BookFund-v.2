import {  useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAlerts, useBookActions, useCollectionActions, useCollectionLoad } from '@utils/hooks';

import { SUCCESSFULLY_DELETED } from './constants';

export const useCollection = () => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const history = useHistory();

  const {collection, pageState, loadCollection} = useCollectionLoad();
  const {addSuccess} = useAlerts();
  const {getAdminBookPageUrlWithoutId} = useBookActions();
  const {navigateToEditForm, deleteCollection, navigateToAdminCollectionsPage} = useCollectionActions();

  const navigateToEditPage = (): void => {
    collection && navigateToEditForm(collection.id);
  }

  const handleConfirmDeletion = (): void => {
    collection && deleteCollection(collection.id, () => {
      addSuccess(SUCCESSFULLY_DELETED);
      navigateToAdminCollectionsPage();
    });

    setIsModalOpened(false);
  }
  const navigateBack = (): void => {
    history.goBack();
  }

  const openModal = (): void => {
    setIsModalOpened(true);
  }

  const closeModal = (): void => {
    setIsModalOpened(false);
  }

  return {
    collection,
    pageState,
    isModalOpened,
    loadCollection,
    navigateBack,
    navigateToEditPage,
    getAdminBookPageUrlWithoutId,
    handleConfirmDeletion,
    openModal,
    closeModal
  }
}
