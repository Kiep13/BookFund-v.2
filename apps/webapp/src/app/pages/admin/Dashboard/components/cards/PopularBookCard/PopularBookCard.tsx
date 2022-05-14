import { Box } from '@mui/material';
import { useEffect } from 'react';

import { BookPromoCard } from '@components/cards/BookPromoCard';
import { StatefulCard } from '@components/cards/StatefulCard';
import { CardStates } from '@utils/enums';

import { NO_DATA_TEXT, POPULAR_BOOK_CARD_TITLE } from '../../../constants';
import { DashboardCardWrapper } from '../../shared';
import { HEIGHT_CONTENT, HEIGHT_NO_CONTENT, STYLES } from './constants';
import { IProps } from './propsInterface';
import { usePopularBookCard } from './usePopularBookCard';

export const PopularBookCard = ({selectedMonth}: IProps) => {
  const {
    cardState,
    book,
    loadStatistic
  } = usePopularBookCard(selectedMonth);

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
          {book && <BookPromoCard book={book}/>}
        </StatefulCard>
      </Box>
    </DashboardCardWrapper>
  )
}
