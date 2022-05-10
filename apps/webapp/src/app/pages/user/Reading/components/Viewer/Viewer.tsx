import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';

import { STYLES } from '../../constants';
import { PageViews } from '../../enums';
import { ActionButtons } from '../ActionButtons';
import { IProps } from './propsInterface';
import './Viewer.scss';

export const Viewer = ({ bookmarkPage, pageView, pdfDocument, handleBookmarkChange }: IProps) => {
  const [amountPages, setAmountPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(bookmarkPage);

  const handleDocumentLoadSuccess = ({numPages}) => {
    setAmountPages(numPages);

    //this method call is needed because mock books from seed doesn't have actual amount of pages
    handlePageChange(bookmarkPage, numPages);
  }

  const handlePageChange = (value: number, currentAmountPages: number = amountPages) => {
    setPageNumber(value);

    const isLastPage = (pageView === PageViews.SinglePage && value === currentAmountPages)
      || (pageView === PageViews.TwoPage &&
        ((currentAmountPages % 2 === 1 && value === currentAmountPages)
          || (currentAmountPages % 2 === 0 && value === currentAmountPages - 1) ));

    handleBookmarkChange(value, isLastPage);
  }

  useEffect(() => {
    if(pageView === PageViews.TwoPage && pageNumber % 2 === 0) {
      setPageNumber(pageNumber - 1);
    }
  }, [pageView])

  return (
    <>
      <Box sx={STYLES.document.content}>
        <Document
          file={pdfDocument}
          options={{workerSrc: '/pdf.worker.js'}}
          onLoadSuccess={handleDocumentLoadSuccess}
        >
          <Page
            pageNumber={pageNumber}
            size={'A4'}
            height={window.innerHeight - 135}
            renderMode={'svg'}
          />
          {
            pageView == PageViews.TwoPage &&
            pageNumber + 1 <= amountPages &&
            <Page
              pageNumber={pageNumber + 1}
              size={'A4'}
              height={window.innerHeight - 135}
              renderMode={'svg'}
            />
          }
        </Document>
      </Box>

      <ActionButtons
        pageView={pageView}
        pageNumber={pageNumber}
        amountPages={amountPages}
        handlePageChange={handlePageChange}
      />
    </>
  );
}
