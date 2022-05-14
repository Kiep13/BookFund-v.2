import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAlerts, useAuthorActions, useBookActions, useBookLoad } from '@utils/hooks';

import { SUCCESSFULLY_DELETED } from './constants';

export const useBook = () => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const history = useHistory();

  const {
    book,
    pageState,
    loadBook
  } = useBookLoad();

  const {addSuccess} = useAlerts();
  const {deleteBook, navigateToAdminBooksPage, navigateToEditForm} = useBookActions();
  const {getAdminAuthorPageUrlWithoutId} = useAuthorActions();

  const navigateBack = (): void => {
    history.goBack();
  }

  const navigateToEditPage = (): void => {
    book && navigateToEditForm(book?.id);
  }

  const handleConfirmDeletion = (): void => {
    book && deleteBook(book.id, () => {
      addSuccess(SUCCESSFULLY_DELETED);
      navigateToAdminBooksPage();
    });

    setIsModalOpened(false);
  }

  const openModal = (): void => {
    setIsModalOpened(true);
  }

  const closeModal = (): void => {
    setIsModalOpened(false);
  }

  return {
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
  }
}
