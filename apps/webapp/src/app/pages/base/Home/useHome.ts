import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { getIsAuthorized, getUser } from '@store/reducers';
import { API_TOOLTIP_ERROR } from '@utils/constants';
import { CardStates, SortDirections } from '@utils/enums';
import { IBook, ICollection, IListApiView, ISearchOptions } from '@utils/interfaces';
import { useAlerts, useApi, useBookActions, useCollectionActions } from '@utils/hooks';

export const useHome = () => {
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

  const loadBooks = useCallback((): void => {
    const searchOptions: ISearchOptions = {
      pageSize: 10,
      page: 0,
      order: SortDirections.Desc,
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
  }, []);

  const loadCollections =  useCallback((page: number = pageCollections): void => {
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
        setCollections((collections) => {
          return [
            ...collections,
            ...response.data
          ];
        });

        setCountCollections(response.count);
        setLoadingCollections(false);
        setState(CardStates.CONTENT);
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
        setState(CardStates.ERROR);
      })
  }, [collections, pageCollections]);

  const loadMoreCollections = useCallback((): void => {
    loadCollections(pageCollections + 1);
  }, [pageCollections]);

  useEffect(() => {
    loadBooks();
  }, []);

  return {
    books,
    collections,
    isAuthorized,
    user,
    state,
    pageCollections,
    countCollections,
    loadingCollections,
    loadCollections,
    loadMoreCollections,
    navigateToBookPage,
    navigateToCollectionPage
  }
}

