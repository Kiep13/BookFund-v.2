import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { wrapUserPage } from '@components/PageWrapper';
import { BookPromoCard } from '@components/cards/BookPromoCard';
import { CollectionCard } from '@components/cards/ColllectionCard';
import { StatefulCard } from '@components/cards/StatefulCard';
import { getIsAuthorized, getUser } from '@store/reducers';
import { API_TOOLTIP_ERROR } from '@utils/constants';
import { CardStates, SortDirections } from '@utils/enums';
import { IBook, ICollection, IListApiView, ISearchOptions } from '@utils/interfaces';
import { compose } from '@utils/helpers';
import { useAlerts, useApi } from '@utils/hooks';

import { STYLES } from './constants';

const Page = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [state, setState] = useState<CardStates>(CardStates.LOADING);
  const { getBooks, getCollections } = useApi();
  const { addError } = useAlerts();

  const isAuthorized = useSelector(getIsAuthorized);
  const user = useSelector(getUser);

  const loadBooks = () => {
    const searchOptions: ISearchOptions =  {
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

  const loadCollections = () => {
    const searchOptions: ISearchOptions =  {
      pageSize: 10,
      page: 0,
      order: SortDirections.Asc,
      orderBy: 'createdAt'
    }

    getCollections(searchOptions)
      .then((response: IListApiView<ICollection>) => {
        setCollections(response.data);
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
              <Box key={book.id} sx={STYLES.book}>
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
              <Box key={collection.id}>
                <CollectionCard
                  collection={collection}
                  isActionsAvailable={true}/>
              </Box>
            )
          }
        </Box>
      </StatefulCard>
    </Box>
  )
}

export const Home = compose(
  wrapUserPage()
)(Page);
