import { useState } from 'react';

import { API_TOOLTIP_ERROR } from '@utils/constants';
import { BookStatuses, CardStates } from '@utils/enums';
import { useAlerts, useApi, useBookActions } from '@utils/hooks';
import { IFavorite, IListApiView, ISearchOptions } from '@utils/interfaces';

import {
  ALL_VALUE, NO_FAVORITES_ALL,
  NO_FAVORITES_WANT_DONE,
  NO_FAVORITES_WANT_IN_PROGRESS,
  NO_FAVORITES_WANT_TO_READ, PAGE_SIZE
} from './constants';

export const useFavorites = () => {
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

  const handleStatusValueChange = (value: string): void => {
    setPageState(CardStates.LOADING);
    setStatusValue(value);
    setPage(0);
    setNoContentMessage(solveNoContentMessage(value));
  }

  const loadFavorites = (): void => {
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
    switch (value) {
      case BookStatuses.WANT_TO_READ:
        return NO_FAVORITES_WANT_TO_READ;
      case BookStatuses.IN_PROGRESS:
        return NO_FAVORITES_WANT_IN_PROGRESS;
      case BookStatuses.DONE:
        return NO_FAVORITES_WANT_DONE;
      default:
        return NO_FAVORITES_ALL;
    }
  }

  const loadMore = (): void => {
    setPage(page + 1);
  }

  return {
    favorites,
    count,
    page,
    statusValue,
    pageState,
    loadingFavorites,
    noContentMessage,
    loadFavorites,
    loadMore,
    handleStatusValueChange,
    navigateToBookPage
  }
}
