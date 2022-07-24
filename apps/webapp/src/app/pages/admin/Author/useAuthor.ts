import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DELETE_CARD_ACTION, EDIT_CARD_ACTION } from '@utils/constants';
import { CardActions } from '@utils/enums';
import { useAlerts, useAuthorActions, useAuthorLoad, useBookActions } from '@utils/hooks';
import { ICardAction } from '@utils/interfaces';

import { SUCCESSFULLY_DELETED } from './constants';

export const useAuthor = () => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const navigate = useNavigate();

  const {
    author,
    pageState,
    loadAuthor
  } = useAuthorLoad();
  const {addSuccess} = useAlerts();
  const {navigateToEditForm, navigateToAdminAuthorsPage, deleteAuthor} = useAuthorActions();
  const {getAdminBookPageUrlWithoutId} = useBookActions();

  const headerActions: ICardAction[] = [EDIT_CARD_ACTION, DELETE_CARD_ACTION];

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
    navigate(-1);
  }

  const openModal = (): void => {
    setIsModalOpened(true);
  }

  const handleHeaderIconClick = (action: CardActions): void => {
    switch (action) {
      case CardActions.EDIT: navigateToEditPage(); break;
      case CardActions.DELETE: openModal(); break;
    }
  }

  const closeModal = (): void => {
    setIsModalOpened(false);
  }

  return {
    author,
    pageState,
    headerActions,
    isModalOpened,
    loadAuthor,
    navigateBack,
    handleHeaderIconClick,
    getAdminBookPageUrlWithoutId,
    closeModal,
    handleConfirmDeletion
  }
}
