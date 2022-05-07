import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { pdfjs } from 'react-pdf';
import { useParams } from 'react-router-dom';
import worker from 'pdfjs-dist/build/pdf.worker.entry';

import { StatefulCard } from '@components/cards/StatefulCard';
import { CardStates } from '@utils/enums';
import { IFavorite, IFormPageParams } from '@utils/interfaces';
import { useAlerts, useApi } from '@utils/hooks';

import { Header, Viewer } from './components';
import { STYLES } from './constants';
import { PageViews } from './enums';

pdfjs.GlobalWorkerOptions.workerSrc = worker;

export const Reading = () => {
  const params = useParams();

  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [readingInfo, setReadingInfo] = useState<IFavorite>();
  const [pdfFile, setPdfFile] = useState<File>();
  const [pageView, setPageView] = useState(PageViews.SinglePage);

  const {getReadingInfo, getBookFile, updateReadingInfo} = useApi();
  const {addError} = useAlerts();

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

  const handleBookmarkChange = (value: number) => {
    if (!readingInfo) {
      return;
    }

    const newReadingInfo: IFavorite = {
      ...readingInfo,
      bookmarkPage: value
    }

    updateReadingInfo(newReadingInfo)
      .catch(() => {
        addError('Error due attempt to synchronize book');
      });
  }

  useEffect(() => {
    initReadingInfo();
  }, []);

  return (
    <Box sx={STYLES.page.wrapper}>
      <StatefulCard state={pageState}>
        {
          readingInfo &&
          <Header
            book={readingInfo?.book}
            pageView={pageView}
            handlePageViewChange={handlePageViewChange}
          />
        }
        <Box sx={STYLES.content}>
          {
            pdfFile &&
            <Viewer
              pageView={pageView}
              pdfDocument={pdfFile}
              bookmarkPage={readingInfo?.bookmarkPage || 1}
              handleBookmarkChange={handleBookmarkChange}
            />
          }
        </Box>
      </StatefulCard>
    </Box>
  );
}
