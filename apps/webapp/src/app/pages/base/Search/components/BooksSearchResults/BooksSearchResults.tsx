import { Box, CardActionArea, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';

import { HorizontalBookCard } from '@components/cards/HorizontalBookCard';
import { API_TOOLTIP_ERROR } from '@utils/constants';
import { DodecagonPageSizes } from '@utils/enums';
import { useAlerts, useApi, useBookActions } from '@utils/hooks';
import { IBook, IListApiView, ISearchOptions } from '@utils/interfaces';

import { STYLES_BOOK_SEARCH_RESULTS } from '../../constants';
import { IProps } from './propsInterface';

export const BooksSearchResults = ({searchResults, searchTerm}: IProps) => {
  const [books, setBooks] = useState<IBook[]>(searchResults.data);
  const [count, setCount] = useState<number>(searchResults.count);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const { getBooks } = useApi();
  const { addError } = useAlerts();
  const { navigateToBookPage } = useBookActions();

  const loadData = (pageValue: number) => {
    setLoading(true);
    setPage(pageValue);

    const searchOptions: ISearchOptions = {
      page: pageValue,
      pageSize: DodecagonPageSizes.Twelve,
      searchTerm
    }

    getBooks(searchOptions)
      .then((response: IListApiView<IBook>) => {
        setBooks([
          ...books,
          ...response.data
        ]);
        setCount(response.count);
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  return (
    <Box sx={STYLES_BOOK_SEARCH_RESULTS.wrapper}>
      {
        books.map((book: IBook) =>
          <Box key={book.id} sx={STYLES_BOOK_SEARCH_RESULTS.book}>
            <CardActionArea key={book.id} onClick={() => navigateToBookPage(book.id)}>
              <HorizontalBookCard book={book}/>
            </CardActionArea>
          </Box>
        )
      }

      {
        count > books.length && (
          <Box sx={STYLES_BOOK_SEARCH_RESULTS.loadMoreWrapper}>
            <LoadingButton
              loading={loading}
              sx={STYLES_BOOK_SEARCH_RESULTS.loadMoreButton}
              variant='contained'
              onClick={() => loadData(page + 1)}>
              Load more
            </LoadingButton>
          </Box>
        )
      }

      {
        books.length === 0 && <Typography component='h3' sx={STYLES_BOOK_SEARCH_RESULTS.noBooks}>Don't find books</Typography>
      }
    </Box>
  )
}
