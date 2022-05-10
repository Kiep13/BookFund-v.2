import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import Button from '@mui/material/Button';
import { useState } from 'react';

import { ConfirmationPopup } from '@components/ConfirmationPopup';
import { API_OPERATION_ERROR, REMOVE_FROM_FAVORITES_CONFIRMATION_POPUP } from '@utils/constants';
import { useAlerts, useApi } from '@utils/hooks';
import { IFavorite } from '@utils/interfaces';

import { STYLES, SUCCESSFULLY_ADDED_TO_FAVORITE, SUCCESSFULLY_REMOVED_FROM_FAVORITE } from './constants';
import { IProps } from './propsInterface';

export const FavoriteActions = ({book, handleAddedToFavorite, handleRemovedFromFavorite}: IProps) => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const {addFavorite, deleteFavorite} = useApi();
  const {addError, addSuccess} = useAlerts();

  const handleAddToFavorite = () => {
    addFavorite(book)
      .then((favorite: IFavorite) => {
        handleAddedToFavorite && handleAddedToFavorite(favorite);
        addSuccess(SUCCESSFULLY_ADDED_TO_FAVORITE);
      })
      .catch(() => {
        addError(API_OPERATION_ERROR);
      })
  }

  const handleRemoveFromFavorite = () => {
    book?.favorite && book.favorite.id && deleteFavorite(book.favorite.id)
      .then(() => {
        handleRemovedFromFavorite && handleRemovedFromFavorite();
        addSuccess(SUCCESSFULLY_REMOVED_FROM_FAVORITE);
      })
      .catch(() => {
        addError(API_OPERATION_ERROR);
      });

    setIsModalOpened(false);
  }

  const buttonAddToFavorite = (
    <Button variant='outlined'
            size='medium'
            startIcon={<FavoriteBorderTwoToneIcon/>}
            sx={STYLES.button}
            onClick={() => handleAddToFavorite()}>
      Add to favorite
    </Button>
  );

  const buttonInFavorite = (
    <Button variant='outlined'
            size='medium'
            startIcon={<FavoriteTwoToneIcon/>}
            sx={STYLES.button}
            onClick={() => setIsModalOpened(true)}>
      In favorite
    </Button>
  )

  return (
    <>
      {
        book?.favorite ? buttonInFavorite : buttonAddToFavorite
      }
      <ConfirmationPopup
        info={REMOVE_FROM_FAVORITES_CONFIRMATION_POPUP}
        isOpened={isModalOpened}
        handleConfirm={() => handleRemoveFromFavorite()}
        handleClose={() => setIsModalOpened(false)}
      />
    </>
  )
}


