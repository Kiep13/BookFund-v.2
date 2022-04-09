import { Box } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';

import { BookPromoCard } from '@components/cards/BookPromoCard';
import { StatefulCard } from '@components/cards/StatefulCard';
import { API_TOOLTIP_ERROR, DATE_API_FORMAT } from '@utils/constants';
import { CardStates } from '@utils/enums';
import { IAdminDashboardSearchOptions, IBook } from '@utils/interfaces';
import { useAlerts } from '@utils/hooks';

import { NO_DATA_TEXT, POPULAR_BOOK_CARD_TITLE } from '../../../constants';
import { useDashboardApi } from '../../../hooks';
import { DashboardCardWrapper } from '../../shared';
import { HEIGHT_CONTENT, HEIGHT_NO_CONTENT, STYLES } from './constants';
import { IProps } from './propsInterface';

export const PopularBookCard = ({ selectedMonth }: IProps) => {
  const [cardState, setCardState] = useState<CardStates>(CardStates.LOADING);
  const [book, setBook] = useState<IBook>();

  const { getMostPopularBook } = useDashboardApi();
  const { addError } = useAlerts();

  const loadStatistic = () => {
    setCardState(CardStates.LOADING);
    const date = moment(selectedMonth).format(DATE_API_FORMAT);

    const searchOptions: IAdminDashboardSearchOptions = {
      date
    }

    getMostPopularBook(searchOptions)
      .then((response: IBook) => {
        if(!response) {
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

  useEffect(() => {
    loadStatistic();
  }, [selectedMonth]);

  return (
    <DashboardCardWrapper title={POPULAR_BOOK_CARD_TITLE}>
      <Box sx={{
        ...STYLES.boxWrapper,
        height: cardState === CardStates.NO_CONTENT ? HEIGHT_NO_CONTENT : HEIGHT_CONTENT
      }}>
        <StatefulCard state={cardState} noContentMessage={NO_DATA_TEXT}>
          { book && <BookPromoCard book={book}/> }
        </StatefulCard>
      </Box>
    </DashboardCardWrapper>
  )
}
