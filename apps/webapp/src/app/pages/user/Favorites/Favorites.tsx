import { Box, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useState } from 'react';

import { BookPromoCard } from '@components/cards/BookPromoCard';
import { StatefulCard } from '@components/cards/StatefulCard';
import { wrapUserPage } from '@components/PageWrapper';
import { API_TOOLTIP_ERROR } from '@utils/constants';
import { BookStatuses, CardStates } from '@utils/enums';
import { compose } from '@utils/helpers';
import { useAlerts, useApi, useBookActions } from '@utils/hooks';
import { IFavorite, IListApiView, ISearchOptions } from '@utils/interfaces';

import { StatusSelector } from './components/StatusSelector';
import {
  ALL_VALUE, NO_FAVORITES_ALL,
  NO_FAVORITES_WANT_DONE,
  NO_FAVORITES_WANT_IN_PROGRESS,
  NO_FAVORITES_WANT_TO_READ, PAGE_SIZE,
  STYLES
} from './constants';

const Page = () => {
  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [statusValue, setStatusValue] = useState<string>(ALL_VALUE);
  const [count, setCount] = useState<number>(0);
  const [favorites, setFavorites] = useState<IFavorite[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loadingFavorites, setLoadingFavorites] = useState<boolean>(true);
  const [noContentMessage, setNoContentMessage] = useState<string>(NO_FAVORITES_ALL);

  const {getFavorites} = useApi();
  const {addError} = useAlerts();
  const {navigateToBookPage} = useBookActions();

  const handleStatusValueChange = (value: string) => {
    setPageState(CardStates.LOADING);
    setStatusValue(value);
    setPage(0);
    setNoContentMessage(solveNoContentMessage(value));
  }

  const loadFavorites = () => {
    setLoadingFavorites(true);

    const searchOptions: ISearchOptions = {
      pageSize: PAGE_SIZE,
      page: page,
      searchTerm: statusValue === ALL_VALUE ? '' : statusValue
    };

    getFavorites(searchOptions)
      .then((response: IListApiView<IFavorite>) => {
        setCount(response.count);

        if (page === 0 && response.data.length === 0) {
          setLoadingFavorites(false);
          setPageState(CardStates.NO_CONTENT);
          return;
        }

        if (page) {
          setFavorites([
            ...favorites,
            ...response.data
          ]);
        } else {
          setFavorites([
            ...response.data
          ]);
        }

        setLoadingFavorites(false);
        setPageState(CardStates.CONTENT);
      })
      .catch(() => {
        setPageState(CardStates.ERROR);
        addError(API_TOOLTIP_ERROR);
      });
  }

  const solveNoContentMessage = (value): string => {
    switch(value) {
      case BookStatuses.WANT_TO_READ: return NO_FAVORITES_WANT_TO_READ;
      case BookStatuses.IN_PROGRESS: return NO_FAVORITES_WANT_IN_PROGRESS;
      case BookStatuses.DONE: return NO_FAVORITES_WANT_DONE;
      default: return NO_FAVORITES_ALL;
    }
  }

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
          {
            favorites.map(({book}: IFavorite) =>
              <Box key={book.id} sx={STYLES.book} onClick={() => navigateToBookPage(book.id)}>
                <BookPromoCard book={book}/>
              </Box>
            )
          }
        </Box>

        {
          count > favorites.length && (
            <Box sx={STYLES.loadMoreWrapper}>
              <LoadingButton
                loading={loadingFavorites}
                sx={STYLES.loadMoreButton}
                variant='contained'
                onClick={() => setPage(page + 1)}>
                Load more
              </LoadingButton>
            </Box>
          )
        }
      </StatefulCard>
    </Box>
  )
}

export const Favorites = compose(
  wrapUserPage()
)(Page);
