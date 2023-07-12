import { CardStates } from '@utils/enums';

export interface IProps {
  children: any;
  state: CardStates;
  noContentMessage?: string;
}
