import { Box, CardActionArea, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { HorizontalBookCard } from '@components/cards/HorizontalBookCard';
import { IBook } from '@utils/interfaces';

import { STYLES_BOOK_SEARCH_RESULTS } from '../../constants';
import { IProps } from './propsInterface';
import { useBooksSearchResults } from './useBooksSearchResults';

export const BooksSearchResults = ({searchResults, searchTerm}: IProps) => {
  const {
    books,
    count,
    loading,
    navigateToBookPage,
    loadMore
  } = useBooksSearchResults(searchResults, searchTerm);

  return (
    <Box sx={STYLES_BOOK_SEARCH_RESULTS.wrapper}>
      {books.map((book: IBook) =>
        <Box key={book.id} sx={STYLES_BOOK_SEARCH_RESULTS.book}>
          <CardActionArea key={book.id} onClick={() => navigateToBookPage(book.id)}>
            <HorizontalBookCard book={book}/>
          </CardActionArea>
        </Box>
      )}

      {count > books.length && (
        <Box sx={STYLES_BOOK_SEARCH_RESULTS.loadMoreWrapper}>
          <LoadingButton
            loading={loading}
            sx={STYLES_BOOK_SEARCH_RESULTS.loadMoreButton}
            variant='contained'
            onClick={loadMore}>
            Load more
          </LoadingButton>
        </Box>
      )}

      {books.length === 0 &&
      <Typography component='h3' sx={STYLES_BOOK_SEARCH_RESULTS.noBooks}>Don't find books</Typography>}
    </Box>
  )
}
