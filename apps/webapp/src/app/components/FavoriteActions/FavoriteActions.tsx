import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import Button from '@mui/material/Button';

import { ConfirmationPopup } from '@components/ConfirmationPopup';
import { REMOVE_FROM_FAVORITES_CONFIRMATION_POPUP } from '@utils/constants';

import { STYLES } from './constants';
import { useFavoriteActions } from './useFavoriteActions';
import { IProps } from './propsInterface';

export const FavoriteActions = ({book, handleAddedToFavorite, handleRemovedFromFavorite}: IProps) => {
 const {
   isModalOpened,
   handleAddToFavorite,
   handleRemoveFromFavorite,
   openModal,
   closeModal
 } = useFavoriteActions(book, handleAddedToFavorite, handleRemovedFromFavorite);

  const buttonAddToFavorite = (
    <Button variant='outlined'
            size='medium'
            startIcon={<FavoriteBorderTwoToneIcon/>}
            sx={STYLES.button}
            onClick={handleAddToFavorite}>
      Add to favorite
    </Button>
  );

  const buttonInFavorite = (
    <Button variant='outlined'
            size='medium'
            startIcon={<FavoriteTwoToneIcon/>}
            sx={STYLES.button}
            onClick={openModal}>
      In favorite
    </Button>
  )

  return (
    <>
      {book?.favorite ? buttonInFavorite : buttonAddToFavorite}
      <ConfirmationPopup
        info={REMOVE_FROM_FAVORITES_CONFIRMATION_POPUP}
        isOpened={isModalOpened}
        handleConfirm={handleRemoveFromFavorite}
        handleClose={closeModal}
      />
    </>
  )
}


