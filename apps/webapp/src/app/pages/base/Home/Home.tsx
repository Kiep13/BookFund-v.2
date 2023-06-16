import { Box, CardActionArea, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { BookPromoCard } from '@components/cards/BookPromoCard';
import { CollectionCard } from '@components/cards/ColllectionCard';
import { StatefulCard } from '@components/cards/StatefulCard';
import { IBook, ICollection } from '@utils/interfaces';
import { useHome } from './useHome';

import { STYLES } from './constants';

export const Home = () => {
  const {
    booksData,
    isBooksLoading,
    isCollectionLoading,
    isBooksError,
    isCollectionsError,
    collectionsData,
    isAuthorized,
    user,
    isFetchingNextPage,
    loadMoreCollections,
    navigateToBookPage,
    navigateToCollectionPage
  } = useHome();

  return (
    <Box sx={STYLES.page}>
      {isAuthorized &&
        <Typography variant='h3' gutterBottom component='div' sx={STYLES.greeting}>
          Welcome back, {user?.name}
        </Typography>}

      <StatefulCard isNoContent={!(booksData && collectionsData)} isLoading={isBooksLoading && isCollectionLoading}
                    isError={isBooksError && isCollectionsError}>
        <Typography variant='h4' gutterBottom component='div' sx={STYLES.booksHeading}>
          Top 10 new books
        </Typography>

        <Box sx={STYLES.booksWrapper}>
          {booksData?.data.map((book: IBook) =>
            <Box key={book.id} sx={STYLES.book} onClick={() => navigateToBookPage(book.id)}>
              <BookPromoCard book={book}/>
            </Box>
          )}
        </Box>

        <Typography variant='h4' gutterBottom component='div' sx={STYLES.booksHeading}>
          Collections
        </Typography>

        <Box sx={STYLES.collectionsWrapper}>
          {collectionsData?.pages.map((item) => {
            return item.data.map((collection: ICollection) => {
              return (<CardActionArea key={collection.id} onClick={() => navigateToCollectionPage(collection.id)}>
                <CollectionCard collection={collection} isActionsAvailable={true}/>
                </CardActionArea>)
              })
            })
          }
        </Box>

        {collectionsData && (collectionsData?.pages[0].count > collectionsData?.pages.length * 12) && (
          <Box sx={STYLES.loadMoreWrapper}>
            <LoadingButton
              loading={isFetchingNextPage}
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
