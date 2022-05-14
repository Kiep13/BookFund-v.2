import moment from 'moment';
import { useState } from 'react';

import { API_TOOLTIP_ERROR, DATE_API_FORMAT } from '@utils/constants';
import { CardStates } from '@utils/enums';
import { IAdminDashboardSearchOptions, IBook } from '@utils/interfaces';
import { useAlerts } from '@utils/hooks';

import { useDashboardApi } from '../../../hooks';

export const usePopularBookCard = (selectedMonth: Date) => {
  const [cardState, setCardState] = useState<CardStates>(CardStates.LOADING);
  const [book, setBook] = useState<IBook>();

  const {getMostPopularBook} = useDashboardApi();
  const {addError} = useAlerts();

  const loadStatistic = () => {
    setCardState(CardStates.LOADING);
    const date = moment(selectedMonth).format(DATE_API_FORMAT);

    const searchOptions: IAdminDashboardSearchOptions = {
      date
    }

    getMostPopularBook(searchOptions)
      .then((response: IBook) => {
        if (!response) {
          setCardState(CardStates.NO_CONTENT);
          return;
        }

        setBook(response);
        setCardState(CardStates.CONTENT)
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
        setCardState(CardStates.ERROR);
      })
  }

  return {
    cardState,
    book,
    loadStatistic
  }
}
