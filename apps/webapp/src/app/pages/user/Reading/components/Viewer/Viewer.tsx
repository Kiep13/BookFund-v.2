import { Box } from '@mui/material';
import { useEffect } from 'react';
import { Document, Page } from 'react-pdf';

import { STYLES } from '../../constants';
import { PageViews } from '../../enums';
import { ActionButtons } from '../ActionButtons';
import { IProps } from './propsInterface';
import { useViewer } from './useViewer';
import './Viewer.scss';

export const Viewer = ({ bookmarkPage, pageView, pdfDocument, handleBookmarkChange }: IProps) => {
  const {
    amountPages,
    pageNumber,
    setPageNumber,
    handlePageChange,
    handleDocumentLoadSuccess
  } = useViewer(bookmarkPage, pageView, handleBookmarkChange);

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
            size='A4'
            renderMode='svg'
            height={window.innerHeight - 135}
          />
          {pageView == PageViews.TwoPage && pageNumber + 1 <= amountPages && (
            <Page
              pageNumber={pageNumber + 1}
              size='A4'
              renderMode='svg'
              height={window.innerHeight - 135}
            />
          )}
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
