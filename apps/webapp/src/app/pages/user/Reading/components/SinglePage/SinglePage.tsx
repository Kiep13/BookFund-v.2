import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

export function SinglePage(props) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(0); //setting 1 to show fisrt page

  function onDocumentLoadSuccess({numPages}) {
    setNumPages(numPages);
    setPageNumber(3);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const {pdf} = props;

  return (
    <>
      <Document
        file={pdf}
        options={{workerSrc: "/pdf.worker.js"}}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} size={'A4'}/>
      </Document>
      <div>
        <p>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </>
  );
}
