import { Box, CardActionArea, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect } from 'react';

import { BookPromoCard } from '@components/cards/BookPromoCard';
import { CollectionCard } from '@components/cards/ColllectionCard';
import { StatefulCard } from '@components/cards/StatefulCard';
import { IBook, ICollection } from '@utils/interfaces';
import { useHome } from './useHome';

import { STYLES } from './constants';

export const Home = () => {
  const {
    books,
    collections,
    isAuthorized,
    user,
    state,
    countCollections,
    loadMoreCollections,
    loadingCollections,
    loadBooks,
    navigateToBookPage,
    navigateToCollectionPage
  } = useHome();

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <Box sx={STYLES.page}>
      {isAuthorized &&
      <Typography variant='h3' gutterBottom component='div' sx={STYLES.greeting}>
        Welcome back, {user?.name}
      </Typography>}

      <StatefulCard state={state}>
        <Typography variant='h4' gutterBottom component='div' sx={STYLES.booksHeading}>
          Top 10 new books
        </Typography>

        <Box sx={STYLES.booksWrapper}>
          {books.map((book: IBook) =>
            <Box key={book.id} sx={STYLES.book} onClick={() => navigateToBookPage(book.id)}>
              <BookPromoCard book={book}/>
            </Box>
          )}
        </Box>

        <Typography variant='h4' gutterBottom component='div' sx={STYLES.booksHeading}>
          Collections
        </Typography>

        <Box sx={STYLES.collectionsWrapper}>
          {collections.map((collection: ICollection) =>
            <CardActionArea key={collection.id} onClick={() => navigateToCollectionPage(collection.id)}>
              <CollectionCard
                collection={collection}
                isActionsAvailable={true}/>
            </CardActionArea>
          )}
        </Box>

        {countCollections > collections.length && (
          <Box sx={STYLES.loadMoreWrapper}>
            <LoadingButton
              loading={loadingCollections}
              sx={STYLES.loadMoreButton}
              variant='contained'
              onClick={loadMoreCollections}>
              Load more
            </LoadingButton>
          </Box>
        )}

      </StatefulCard>
    </Box>
  )
}
