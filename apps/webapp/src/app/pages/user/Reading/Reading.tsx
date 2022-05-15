import worker from 'pdfjs-dist/build/pdf.worker.entry';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { pdfjs } from 'react-pdf';

import { StatefulCard } from '@components/cards/StatefulCard';

import { CongratulationsMessage, Header, Viewer } from './components';
import { STYLES } from './constants';
import { useReading } from './useReading';

pdfjs.GlobalWorkerOptions.workerSrc = worker;

export const Reading = () => {
  const {
    pdfFile,
    pageView,
    readingInfo,
    isLastPage,
    isDone,
    pageState,
    initReadingInfo,
    handleBookmarkChange,
    handlePageViewChange,
    handleMarkAsDone
  } = useReading();

  useEffect(() => {
    initReadingInfo();
  }, []);

  const pageCongratulationsMessage = <CongratulationsMessage/>;

  const pageReadContent = <>
    {pdfFile && (
      <Viewer
        pageView={pageView}
        pdfDocument={pdfFile}
        bookmarkPage={readingInfo?.bookmarkPage || 1}
        handleBookmarkChange={handleBookmarkChange}
      />
    )}
  </>

  return (
    <Box sx={STYLES.page.wrapper}>
      <StatefulCard state={pageState}>
        {readingInfo && (
          <Header
            book={readingInfo?.book}
            isLastPageOpened={isLastPage}
            pageView={pageView}
            handlePageViewChange={handlePageViewChange}
            handleMarkAsDone={handleMarkAsDone}
          />
        )}

        <Box sx={STYLES.content}>
          {isDone ? pageCongratulationsMessage : pageReadContent}
        </Box>
      </StatefulCard>
    </Box>
  );
}
