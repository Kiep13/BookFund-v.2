import { useState } from 'react';
import { PageViews } from '../../enums';

export const useViewer = (bookmarkPage: number, pageView: PageViews, handleBookmarkChange: Function) => {
  const [amountPages, setAmountPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(bookmarkPage);

  const handleDocumentLoadSuccess = ({numPages}): void => {
    setAmountPages(numPages);

    //this method call is needed because mock books from seed doesn't have actual amount of pages
    handlePageChange(bookmarkPage, numPages);
  }

  const handlePageChange = (value: number, currentAmountPages: number = amountPages): void => {
    setPageNumber(value);

    const isLastPage = (pageView === PageViews.SinglePage && value === currentAmountPages)
      || (pageView === PageViews.TwoPage &&
        ((currentAmountPages % 2 === 1 && value === currentAmountPages)
          || (currentAmountPages % 2 === 0 && value === currentAmountPages - 1) ));

    handleBookmarkChange(value, isLastPage);
  }

  return {
    amountPages,
    pageNumber,
    setPageNumber,
    handlePageChange,
    handleDocumentLoadSuccess
  }
}
