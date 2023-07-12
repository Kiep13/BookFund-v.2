import { CardStates } from '@utils/enums';

export interface IProps {
  children: any;
  state?: CardStates;
  noContentMessage?: string;
  isNoContent?: boolean;
  isLoading?: boolean;
  isError?: boolean;
}
