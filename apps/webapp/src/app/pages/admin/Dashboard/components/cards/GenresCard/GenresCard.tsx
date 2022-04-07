import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import moment from 'moment';
import { Doughnut } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

import { StatefulCard } from '@components/cards/StatefulCard';
import { API_TOOLTIP_ERROR, DATE_API_FORMAT } from '@utils/constants';
import { CardStates } from '@utils/enums';
import { IAdminDashboardSearchOptions, IDoughnutData, IGenreStatistic } from '@utils/interfaces';
import { useAlerts, useApi, useCharts } from '@utils/hooks';

import { GENRES_CARD_TITLE, NO_DATA_TEXT } from '../../../constants';
import { DashboardCardWrapper } from '../../shared';
import { IProps } from './propsInterface';

ChartJS.register(ArcElement, Tooltip, Legend);

export const GenresCard = ({selectedMonth}: IProps) => {
  const [cardState, setCardState] = useState<CardStates>(CardStates.LOADING);
  const [chartData, setChartData] = useState<IDoughnutData>();

  const { getGenresStatistic } = useApi();
  const { addError } = useAlerts();
  const { transformToDoughnutData } = useCharts();

  const loadStatistic = () => {
    setCardState(CardStates.LOADING);
    const date = moment(selectedMonth).format(DATE_API_FORMAT);

    const searchOptions: IAdminDashboardSearchOptions = {
      date
    }

    getGenresStatistic(searchOptions)
      .then((response: IGenreStatistic[]) => {
        if(!response.length) {
          setCardState(CardStates.NO_CONTENT);
          return;
        }

        setChartData(transformToDoughnutData(GENRES_CARD_TITLE , response));
        setCardState(CardStates.CONTENT);
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
        setCardState(CardStates.ERROR);
      })
  }

  useEffect(() => {
    loadStatistic();
  }, [selectedMonth]);

  return (
    <DashboardCardWrapper title={GENRES_CARD_TITLE}>
      <StatefulCard state={cardState} noContentMessage={NO_DATA_TEXT}>
        { chartData && <Doughnut data={chartData}/> }
      </StatefulCard>
    </DashboardCardWrapper>
  )
}

