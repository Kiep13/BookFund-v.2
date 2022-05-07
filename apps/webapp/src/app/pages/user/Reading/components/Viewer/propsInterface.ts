import { PageViews } from '../../enums';

export interface IProps {
  bookmarkPage: number,
  pdfDocument: File,
  pageView: PageViews,
  handleBookmarkChange: Function
}
