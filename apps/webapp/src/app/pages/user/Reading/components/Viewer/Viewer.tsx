import { Box } from '@mui/material';
import { Document, Page } from 'react-pdf';
import { useState } from 'react';

import { ActionButtons } from '../ActionButtons';
import { STYLES } from '../../constants';
import { IProps } from './propsInterface';
import './Viewer.scss';

export const Viewer = ({ bookmarkPage, pdfDocument }: IProps) => {
  const [amountPages, setAmountPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);

  const handleDocumentLoadSuccess = ({numPages}) => {
    setAmountPages(numPages);
    setPageNumber(bookmarkPage);
  }

  const handlePageChange = (value: number) => {
    setPageNumber(value);
  }

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
        </Document>
      </Box>

      <ActionButtons
        pageNumber={pageNumber}
        amountPages={amountPages}
        handlePageChange={handlePageChange}
      />
    </>
  );
}
