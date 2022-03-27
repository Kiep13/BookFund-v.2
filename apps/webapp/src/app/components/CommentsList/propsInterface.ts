import { IComment } from '@utils/interfaces';

export interface IProps {
  comments: IComment[],
  count: number,
  loadingComments: boolean,
  loadNextPage: Function
}
