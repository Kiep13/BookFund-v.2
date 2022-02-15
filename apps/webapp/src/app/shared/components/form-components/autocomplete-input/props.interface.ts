import { IOption } from '@core/interfaces';

export interface IProps {
  label: string,
  options: IOption[],
  loading: boolean;
}
