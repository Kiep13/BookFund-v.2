import { Box } from '@mui/material';

import { IBook } from '@core/interfaces';
import { BOOKS_MOCK } from '@mocks/books.mock';
import { BookPromoCard } from '@shared/components/bookPromoCard';

import { DashboardCardWrapper } from '../../shared/dashboardСardWrapper';
import { STYLES } from './constants';

export const PopularBookCard = () => {
  const book: IBook = BOOKS_MOCK[0];

  return (
    <DashboardCardWrapper title={'Wost popular book'}>
      <Box sx={STYLES.boxWrapper}>
        <BookPromoCard book={book}/>
      </Box>
    </DashboardCardWrapper>
  )
}
