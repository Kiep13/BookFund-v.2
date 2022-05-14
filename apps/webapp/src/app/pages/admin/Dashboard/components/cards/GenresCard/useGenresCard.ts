import moment from 'moment';
import { useState } from 'react';

import { API_TOOLTIP_ERROR, DATE_API_FORMAT } from '@utils/constants';
import { CardStates } from '@utils/enums';
import { IAdminDashboardSearchOptions, IDoughnutData, IGenreStatistic } from '@utils/interfaces';
import { useAlerts, useCharts } from '@utils/hooks';

import { GENRES_CARD_TITLE } from '../../../constants';
import { useDashboardApi } from '../../../hooks';

export const useGenresCard = (selectedMonth: Date) => {
  const [cardState, setCardState] = useState<CardStates>(CardStates.LOADING);
  const [chartData, setChartData] = useState<IDoughnutData>();

  const {getGenresStatistic} = useDashboardApi();
  const {addError} = useAlerts();
  const {transformToDoughnutData} = useCharts();

  const loadStatistic = () => {
    setCardState(CardStates.LOADING);
    const date = moment(selectedMonth).format(DATE_API_FORMAT);

    const searchOptions: IAdminDashboardSearchOptions = {
      date
    }

    getGenresStatistic(searchOptions)
      .then((response: IGenreStatistic[]) => {
        if (!response.length) {
          setCardState(CardStates.NO_CONTENT);
          return;
        }

        setChartData(transformToDoughnutData(GENRES_CARD_TITLE, response));
        setCardState(CardStates.CONTENT);
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
        setCardState(CardStates.ERROR);
      })
  }

  return {
    cardState,
    chartData,
    loadStatistic
  }
}
