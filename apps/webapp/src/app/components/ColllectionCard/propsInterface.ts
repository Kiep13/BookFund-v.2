import { ICardAction, ICollection } from '@utils/interfaces';

export interface IProps {
  collection: ICollection,
  isActionsAvailable: boolean,
  actions?: ICardAction[],
  onActionClick?: Function
}
