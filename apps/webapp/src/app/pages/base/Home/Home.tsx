import { Box, CardActionArea, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { BookPromoCard } from '@components/cards/BookPromoCard';
import { CollectionCard } from '@components/cards/ColllectionCard';
import { StatefulCard } from '@components/cards/StatefulCard';
import { getIsAuthorized, getUser } from '@store/reducers';
import { API_TOOLTIP_ERROR } from '@utils/constants';
import { CardStates, SortDirections } from '@utils/enums';
import { IBook, ICollection, IListApiView, ISearchOptions } from '@utils/interfaces';
import { useAlerts, useApi, useBookActions, useCollectionActions } from '@utils/hooks';

import { STYLES } from './constants';

export const Home = () => {
  const [state, setState] = useState<CardStates>(CardStates.LOADING);
  const [books, setBooks] = useState<IBook[]>([]);

  const [collections, setCollections] = useState<ICollection[]>([]);
  const [countCollections, setCountCollections] = useState<number>(0);
  const [pageCollections, setPageCollections] = useState<number>(0);
  const [loadingCollections, setLoadingCollections] = useState<boolean>(true);

  const {navigateToBookPage} = useBookActions();
  const {navigateToCollectionPage} = useCollectionActions();
  const {getBooks, getCollections} = useApi();
  const {addError} = useAlerts();

  const isAuthorized = useSelector(getIsAuthorized);
  const user = useSelector(getUser);

  const loadBooks = () => {
    const searchOptions: ISearchOptions = {
      pageSize: 10,
      page: 0,
      order: SortDirections.Asc,
      orderBy: 'createdAt'
    }

    getBooks(searchOptions)
      .then((response: IListApiView<IBook>) => {
        setBooks(response.data);
        loadCollections();
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
        setState(CardStates.ERROR);
      })
  };

  const loadCollections = (page: number = pageCollections) => {
    setLoadingCollections(true);
    setPageCollections(page);

    const searchOptions: ISearchOptions = {
      pageSize: 12,
      page: page,
      order: SortDirections.Asc,
      orderBy: 'createdAt'
    }

    getCollections(searchOptions)
      .then((response: IListApiView<ICollection>) => {
        setCollections([
          ...collections,
          ...response.data
        ]);
        setCountCollections(response.count);
        setLoadingCollections(false);
        setState(CardStates.CONTENT);
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
        setState(CardStates.ERROR);
      })
  }

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <Box sx={STYLES.page}>
      {
        isAuthorized &&
        <Typography variant='h3' gutterBottom component='div' sx={STYLES.greeting}>
          Welcome back, {user?.name}
        </Typography>
      }

      <StatefulCard state={state}>
        <Typography variant='h4' gutterBottom component='div' sx={STYLES.booksHeading}>
          Top 10 new books
        </Typography>

        <Box sx={STYLES.booksWrapper}>
          {
            books.map((book: IBook) =>
              <Box key={book.id} sx={STYLES.book} onClick={() => navigateToBookPage(book.id)}>
                <BookPromoCard book={book}/>
              </Box>
            )
          }
        </Box>

        <Typography variant='h4' gutterBottom component='div' sx={STYLES.booksHeading}>
          Collections
        </Typography>

        <Box sx={STYLES.collectionsWrapper}>
          {
            collections.map((collection: ICollection) =>
              <CardActionArea key={collection.id} onClick={() => navigateToCollectionPage(collection.id)}>
                <CollectionCard
                  collection={collection}
                  isActionsAvailable={true}/>
              </CardActionArea>
            )
          }
        </Box>

        {
          countCollections > collections.length && (
            <Box sx={STYLES.loadMoreWrapper}>
              <LoadingButton
                loading={loadingCollections}
                sx={STYLES.loadMoreButton}
                variant='contained'
                onClick={() => loadCollections(pageCollections + 1)}>
                Load more
              </LoadingButton>
            </Box>
          )
        }

      </StatefulCard>
    </Box>
  )
}
