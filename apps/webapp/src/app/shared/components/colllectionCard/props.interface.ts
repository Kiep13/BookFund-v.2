import { ICardAction, ICollection } from '@core/interfaces';

export interface IProps {
  collection: ICollection,
  isActionsAvailable: boolean,
  actions?: ICardAction[],
  onActionClick?: Function
}
