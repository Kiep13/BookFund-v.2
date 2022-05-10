import { PageViews } from '../../enums';

export interface IProps {
  pageView: PageViews
  pageNumber: number,
  amountPages: number,
  handlePageChange: Function
}
