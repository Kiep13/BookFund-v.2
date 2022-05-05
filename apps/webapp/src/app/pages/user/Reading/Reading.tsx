import React, { useEffect, useState } from 'react';
import { pdfjs } from 'react-pdf';
import { useParams } from 'react-router-dom';
import worker from 'pdfjs-dist/build/pdf.worker.entry';

import { StatefulCard } from '@components/cards/StatefulCard';
import { CardStates } from '@utils/enums';
import { IFavorite, IFormPageParams } from '@utils/interfaces';
import { useApi } from '@utils/hooks';

import { SinglePage } from './components/SinglePage';
import './Reading.scss';

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
        setReadingInfo(readingInfo);

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
      <div className="App">
        <h4>Single Page</h4>
        {
          pdfFile &&
          <SinglePage
            pdfDocument={pdfFile}
            bookmarkPage={readingInfo?.bookmarkPage || 1}
          />
        }
        <hr />
      </div>
    </StatefulCard>
  );
}
