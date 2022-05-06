import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { pdfjs } from 'react-pdf';
import { useParams } from 'react-router-dom';
import worker from 'pdfjs-dist/build/pdf.worker.entry';

import { StatefulCard } from '@components/cards/StatefulCard';
import { CardStates } from '@utils/enums';
import { IFavorite, IFormPageParams } from '@utils/interfaces';
import { useApi } from '@utils/hooks';

import { Header, Viewer } from './components';
import { STYLES } from './constants';

pdfjs.GlobalWorkerOptions.workerSrc = worker;

export const Reading = () => {
  const params = useParams();

  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [readingInfo, setReadingInfo] = useState<IFavorite>();
  const [pdfFile, setPdfFile] = useState<File>();

  const { getReadingInfo, getBookFile } = useApi();

  const initReadingInfo = () => {
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

  useEffect(() => {
    initReadingInfo();
  }, []);

  return (
    <StatefulCard state={pageState}>
      <Box sx={STYLES.page.wrapper}>
        {
          readingInfo && <Header book={readingInfo?.book}/>
        }
        <Box sx={STYLES.content}>
          {
            pdfFile &&
            <Viewer
              pdfDocument={pdfFile}
              bookmarkPage={readingInfo?.bookmarkPage || 1}
            />
          }
        </Box>
      </Box>
    </StatefulCard>
  );
}
