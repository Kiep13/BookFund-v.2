import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DELETE_CARD_ACTION, EDIT_CARD_ACTION } from '@utils/constants';
import { CardActions } from '@utils/enums';
import { useAlerts, useAuthorActions, useBookActions, useBookLoad } from '@utils/hooks';
import { ICardAction } from '@utils/interfaces';

import { SUCCESSFULLY_DELETED } from './constants';

export const useBook = () => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    book,
    pageState,
    loadBook
  } = useBookLoad();

  const {addSuccess} = useAlerts();
  const {deleteBook, navigateToAdminBooksPage, navigateToEditForm} = useBookActions();
  const {getAdminAuthorPageUrlWithoutId} = useAuthorActions();

  const headerActions: ICardAction[] = [EDIT_CARD_ACTION, DELETE_CARD_ACTION];

  const navigateBack = (): void => {
    navigate(-1);
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

  const handleHeaderIconClick = (actionType: CardActions): void => {
    switch(actionType) {
      case CardActions.EDIT: navigateToEditPage(); break;
      case CardActions.DELETE: openModal(); break;
    }
  }

  const closeModal = (): void => {
    setIsModalOpened(false);
  }

  return {
    book,
    pageState,
    headerActions,
    isModalOpened,
    navigateBack,
    handleHeaderIconClick,
    getAdminAuthorPageUrlWithoutId,
    handleConfirmDeletion,
    closeModal
  }
}
