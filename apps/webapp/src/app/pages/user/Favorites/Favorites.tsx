import { Box, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect } from 'react';

import { BookPromoCard } from '@components/cards/BookPromoCard';
import { StatefulCard } from '@components/cards/StatefulCard';
import { IFavorite } from '@utils/interfaces';

import { StatusSelector } from './components/StatusSelector';
import { STYLES } from './constants';
import { useFavorites } from './useFavorites';

export const Favorites = () => {
  const {
    favorites,
    count,
    page,
    statusValue,
    pageState,
    loadingFavorites,
    loadMore,
    noContentMessage,
    loadFavorites,
    handleStatusValueChange,
    navigateToBookPage
  } = useFavorites();

  useEffect(() => {
    loadFavorites();
  }, [page, statusValue]);

  return (
    <Box sx={STYLES.page}>
      <Typography variant='h3' gutterBottom component='div' sx={STYLES.greeting}>
        Your favorites
      </Typography>

      <Box sx={STYLES.statusSelector}>
        <StatusSelector value={statusValue} setValue={handleStatusValueChange}/>
      </Box>

      <StatefulCard state={pageState} noContentMessage={noContentMessage}>
        <Box sx={STYLES.favoriteBooks}>
          {favorites.map(({book}: IFavorite) =>
            <Box key={book.id} sx={STYLES.book} onClick={() => navigateToBookPage(book.id)}>
              <BookPromoCard book={book}/>
            </Box>
          )}
        </Box>

        {count > favorites.length && (
          <Box sx={STYLES.loadMoreWrapper}>
            <LoadingButton
              loading={loadingFavorites}
              sx={STYLES.loadMoreButton}
              variant='contained'
              onClick={loadMore}>
              Load more
            </LoadingButton>
          </Box>
        )}
      </StatefulCard>
    </Box>
  )
}
