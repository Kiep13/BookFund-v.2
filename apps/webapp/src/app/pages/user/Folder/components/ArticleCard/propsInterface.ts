import { CardActions } from '@utils/enums';
import { IArticle, ICardAction } from '@utils/interfaces';

export interface IProps {
  article: IArticle;
  cardActions: ICardAction[];
  handleCardActionClick: (id: number, actionType: CardActions) => void;
}
