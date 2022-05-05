import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

import { IProps } from './propsInterface';

export function SinglePage({ bookmarkPage, pdfDocument }: IProps) {
  const [amountPages, setAmountPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);

  const handleDocumentLoadSuccess = ({numPages}) => {
    setAmountPages(numPages);
    setPageNumber(bookmarkPage);
  }

  const changePage = (offset) => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  const goPreviousPage = () => {
    changePage(-1);
  }

  const goNextPage = () => {
    changePage(1);
  }

  return (
    <>
      <Document
        file={pdfDocument}
        options={{workerSrc: '/pdf.worker.js'}}
        onLoadSuccess={handleDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} size={'A4'}/>
      </Document>
      <div>
        <p>
          Page {pageNumber || (amountPages ? 1 : "--")} of {amountPages || "--"}
        </p>
        <button type='button' disabled={pageNumber <= 1} onClick={goPreviousPage}>
          Previous
        </button>
        <button
          type='button'
          disabled={pageNumber >= amountPages}
          onClick={goNextPage}
        >
          Next
        </button>
      </div>
    </>
  );
}
