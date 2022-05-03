import React, { useEffect, useState } from 'react';
import { pdfjs } from 'react-pdf';
import worker from 'pdfjs-dist/build/pdf.worker.entry';

import { StatefulCard } from '@components/cards/StatefulCard';
import { CardStates } from '@utils/enums';
import { useApi } from '@utils/hooks';

import { SinglePage } from './components/SinglePage';
import './Reading.scss';

pdfjs.GlobalWorkerOptions.workerSrc = worker;

export const Reading = () => {
  const [pageState, setPageState] = useState(CardStates.LOADING);
  const [pdfFile, setPdfFile] = useState();
  const { getBookFile } = useApi();

  useEffect(() => {
    getBookFile()
      .then((response) => {
        setPdfFile(response);
        setPageState(CardStates.CONTENT);
      })
      .catch((error) => {
        console.log(error);
        setPageState(CardStates.ERROR);
      })
  }, []);

  return (
    <StatefulCard state={pageState}>
      <div className="App">
        <h4>Single Page</h4>
        <SinglePage pdf={pdfFile} />

        <hr />
      </div>
    </StatefulCard>

  );
}
