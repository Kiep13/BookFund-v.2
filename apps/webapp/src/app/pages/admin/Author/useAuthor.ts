import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAlerts, useAuthorActions, useAuthorLoad, useBookActions } from '@utils/hooks';

import { SUCCESSFULLY_DELETED } from './constants';

export const useAuthor = () => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const history = useHistory();

  const {
    author,
    pageState,
    loadAuthor
  } = useAuthorLoad();
  const {addSuccess} = useAlerts();
  const {navigateToEditForm, navigateToAdminAuthorsPage, deleteAuthor} = useAuthorActions();
  const {getAdminBookPageUrlWithoutId} = useBookActions();

  const navigateToEditPage = (): void => {
    author && navigateToEditForm(author?.id);
  }

  const handleConfirmDeletion = (): void => {
    author && deleteAuthor(author.id, () => {
      addSuccess(SUCCESSFULLY_DELETED);
      navigateToAdminAuthorsPage();
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
  }
}
