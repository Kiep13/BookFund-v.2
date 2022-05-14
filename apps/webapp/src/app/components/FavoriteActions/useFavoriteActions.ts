import { useState } from 'react';

import { API_OPERATION_ERROR } from '@utils/constants';
import { useAlerts, useApi } from '@utils/hooks';
import { IBook, IFavorite } from '@utils/interfaces';

import { SUCCESSFULLY_ADDED_TO_FAVORITE, SUCCESSFULLY_REMOVED_FROM_FAVORITE } from './constants';

export const useFavoriteActions = (book: IBook, handleAddedToFavorite?: Function, handleRemovedFromFavorite?: Function) => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const {addFavorite, deleteFavorite} = useApi();
  const {addError, addSuccess} = useAlerts();

  const handleAddToFavorite = (): void => {
    addFavorite(book)
      .then((favorite: IFavorite) => {
        handleAddedToFavorite && handleAddedToFavorite(favorite);
        addSuccess(SUCCESSFULLY_ADDED_TO_FAVORITE);
      })
      .catch(() => {
        addError(API_OPERATION_ERROR);
      })
  }

  const handleRemoveFromFavorite = (): void => {
    book?.favorite && book.favorite.id && deleteFavorite(book.favorite.id)
      .then(() => {
        handleRemovedFromFavorite && handleRemovedFromFavorite();
        addSuccess(SUCCESSFULLY_REMOVED_FROM_FAVORITE);
      })
      .catch(() => {
        addError(API_OPERATION_ERROR);
      });

    closeModal();
  }

  const openModal = (): void => {
    setIsModalOpened(true);
  }

  const closeModal = (): void => {
    setIsModalOpened(false);
  }

  return {
    isModalOpened,
    handleAddToFavorite,
    handleRemoveFromFavorite,
    openModal,
    closeModal
  }
}
