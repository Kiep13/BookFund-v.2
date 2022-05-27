import AddCircleOutlineTwoToneIcon from '@mui/icons-material/AddCircleOutlineTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';

import { CardActions } from '@utils/enums';
import { ICardAction } from '@utils/interfaces';

export const LIKE_CARD_ACTION: ICardAction = {
  ariLabel: 'Add to favorite',
  actionType: CardActions.LIKE,
  icon: FavoriteTwoToneIcon
};

export const SHARE_CARD_ACTION: ICardAction = {
  ariLabel: 'Share',
  actionType: CardActions.SHARE,
  icon: ShareTwoToneIcon
}

export const ADD_CARD_ACTION: ICardAction = {
  ariLabel: 'Add',
  actionType: CardActions.ADD,
  icon: AddCircleOutlineTwoToneIcon
}

export const VIEW_CARD_ACTION: ICardAction = {
  ariLabel: 'View',
  actionType: CardActions.VIEW,
  icon: VisibilityTwoToneIcon
}

export const EDIT_CARD_ACTION: ICardAction = {
  ariLabel: 'Edit collection',
  actionType: CardActions.EDIT,
  icon: EditTwoToneIcon
};

export const DELETE_CARD_ACTION: ICardAction = {
  ariLabel: 'Delete collection',
  actionType: CardActions.DELETE,
  icon: DeleteTwoToneIcon
};
