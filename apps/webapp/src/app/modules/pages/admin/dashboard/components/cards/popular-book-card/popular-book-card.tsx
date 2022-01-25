import React from 'react';
import { Box } from '@mui/material';

import { IBook } from '@core/interfaces';
import { BOOKS_MOCK } from '@mocks/books.mock';
import BookPromoCard from '@shared/components/book-promo-card';

import DashboardCardWrapper from '../../shared/dashboard-card-wrapper';

export default function PopularBookCard() {
  const book: IBook = BOOKS_MOCK[0];

  return (
    <DashboardCardWrapper title={'Wost popular book'}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        p: 2
      }}>
        <BookPromoCard book={book}/>
      </Box>
    </DashboardCardWrapper>
  )
}
