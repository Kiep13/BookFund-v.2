import { IBook } from '@utils/interfaces';

import { PageViews } from '../../enums';

export interface IProps {
  book: IBook,
  pageView: PageViews,
  handlePageViewChange: Function
}
