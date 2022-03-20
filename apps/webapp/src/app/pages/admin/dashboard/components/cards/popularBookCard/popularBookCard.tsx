import { Box } from '@mui/material';

import { BookPromoCard } from '@components/BookPromoCard';
import { BOOKS_MOCK } from '@mocks/books.mock';
import { IBook } from '@utils/interfaces';

import { POPULAR_BOOK_CARD_TITLE } from '../../../constants';
import { DashboardCardWrapper } from '../../shared';
import { STYLES } from './constants';

export const PopularBookCard = () => {
  const book: IBook = BOOKS_MOCK[0];

  return (
    <DashboardCardWrapper title={POPULAR_BOOK_CARD_TITLE}>
      <Box sx={STYLES.boxWrapper}>
        <BookPromoCard book={book}/>
      </Box>
    </DashboardCardWrapper>
  )
}
