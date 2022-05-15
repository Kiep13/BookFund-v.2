import { IBook } from '@utils/interfaces';

import { PageViews } from '../../enums';

export interface IProps {
  book: IBook;
  pageView: PageViews;
  isLastPageOpened: boolean;
  handlePageViewChange: Function;
  handleMarkAsDone: Function;
}
