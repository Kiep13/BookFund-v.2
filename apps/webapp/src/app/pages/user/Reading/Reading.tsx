import worker from 'pdfjs-dist/build/pdf.worker.entry';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { pdfjs } from 'react-pdf';
import { useParams } from 'react-router-dom';

import { StatefulCard } from '@components/cards/StatefulCard';
import { BookStatuses, CardStates } from '@utils/enums';
import { useAlerts, useApi } from '@utils/hooks';
import { IFavorite, IFormPageParams } from '@utils/interfaces';

import { CongratulationsMessage, Header, Viewer } from './components';
import { ERROR_SYNCHRONIZE_BOOK, MARK_AS_DONE_TOOLTIP_MESSAGE, STYLES } from './constants';
import { PageViews } from './enums';

pdfjs.GlobalWorkerOptions.workerSrc = worker;

export const Reading = () => {
  const params = useParams();

  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [readingInfo, setReadingInfo] = useState<IFavorite>();
  const [pdfFile, setPdfFile] = useState<File>();
  const [pageView, setPageView] = useState(PageViews.SinglePage);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  const {getReadingInfo, getBookFile, updateReadingInfo} = useApi();
  const {addSuccess, addError} = useAlerts();

  const initReadingInfo = (): void => {
    const bookId = (params as IFormPageParams).id;

    getReadingInfo(bookId)
      .then((response: IFavorite) => {
        setReadingInfo(response);

        const bookFileUrl = response.book.fileUrl || '';

        return getBookFile(bookFileUrl);
      })
      .then((response: File) => {
        setPdfFile(response);
        setPageState(CardStates.CONTENT);
      })
      .catch(() => {
        setPageState(CardStates.ERROR);
      })
  }

  const handlePageViewChange = (value: PageViews): void => {
    setPageView(value);
  };

  const handleBookmarkChange = (value: number, isLastPage: boolean = false) => {
    if (!readingInfo) {
      return;
    }

    handleIsLastPage(isLastPage);

    const newReadingInfo: IFavorite = {
      ...readingInfo,
      bookmarkPage: value
    }

    updateReadingInfo(newReadingInfo)
      .catch(() => {
        addError(ERROR_SYNCHRONIZE_BOOK);
      });
  }

  const handleIsLastPage = (isLastPage: boolean) => {
    setIsLastPage(isLastPage);

    if (isLastPage) {
      addSuccess(MARK_AS_DONE_TOOLTIP_MESSAGE);
    }
  }

  const handleMarkAsDone = () => {
    if (!readingInfo) {
      return;
    }

    setPageState(CardStates.LOADING);
    setIsLastPage(false);

    const newReadingInfo: IFavorite = {
      ...readingInfo,
      status: BookStatuses.DONE
    }

    updateReadingInfo(newReadingInfo)
      .then(() => {
        setIsDone(true);
        setPageState(CardStates.CONTENT);
      })
      .catch(() => {
        addError(ERROR_SYNCHRONIZE_BOOK);
        setPageState(CardStates.ERROR);
      });
  }

  useEffect(() => {
    initReadingInfo();
  }, []);

  const pageCongratulationsMessage = <CongratulationsMessage/>;

  const pageReadContent = <>
    {
      pdfFile &&
      <Viewer
        pageView={pageView}
        pdfDocument={pdfFile}
        bookmarkPage={readingInfo?.bookmarkPage || 1}
        handleBookmarkChange={handleBookmarkChange}
      />
    }
  </>

  return (
    <Box sx={STYLES.page.wrapper}>
      <StatefulCard state={pageState}>
        {
          readingInfo &&
          <Header
            book={readingInfo?.book}
            isLastPageOpened={isLastPage}
            pageView={pageView}
            handlePageViewChange={handlePageViewChange}
            handleMarkAsDone={handleMarkAsDone}
          />
        }

        <Box sx={STYLES.content}>
          {
            isDone ? pageCongratulationsMessage : pageReadContent
          }
        </Box>
      </StatefulCard>
    </Box>
  );
}
