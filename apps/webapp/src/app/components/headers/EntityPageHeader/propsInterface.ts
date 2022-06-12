import { CardActions } from '@utils/enums';
import { ICardAction } from '@utils/interfaces';

export interface IProps {
  title: string;
  handleBackClick: () => void;
  actions?: ICardAction[];
  handleIconClick?: (actionType: CardActions) => void;
  children?: any;
}
