import { Box } from '@mui/material';
import { Document, Page } from 'react-pdf';
import { useEffect, useState } from 'react';

import { STYLES } from '../../constants';
import { PageViews } from '../../enums';
import { ActionButtons } from '../ActionButtons';
import { IProps } from './propsInterface';
import './Viewer.scss';

export const Viewer = ({ bookmarkPage, pageView, pdfDocument }: IProps) => {
  const [amountPages, setAmountPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);

  const handleDocumentLoadSuccess = ({numPages}) => {
    setAmountPages(numPages);
    setPageNumber(bookmarkPage);
  }

  const handlePageChange = (value: number) => {
    setPageNumber(value);
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
