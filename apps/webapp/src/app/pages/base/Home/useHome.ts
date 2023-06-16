import { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { getIsAuthorized, getUser } from '@store/reducers';
import { SortDirections } from '@utils/enums';
import { IBook, ICollection, IListApiView, ISearchOptions } from '@utils/interfaces';
import { useApi, useBookActions, useCollectionActions } from '@utils/hooks';
import { useInfiniteQuery, useQuery } from 'react-query';

export const useHome = () => {
  const isAuthorized = useSelector(getIsAuthorized);
  const user = useSelector(getUser);

  const [pageCollections, setPageCollections] = useState<number>(0);

  const {navigateToBookPage} = useBookActions();
  const {navigateToCollectionPage} = useCollectionActions();
  const {getBooks, getCollections} = useApi();

  const {
    data: booksData,
    isLoading: isBooksLoading,
    isError: isBooksError
  } = useQuery<IListApiView<IBook>>(['books'], () => {
    const searchOptions: ISearchOptions = {
      pageSize: 10,
      page: 0,
      order: SortDirections.Desc,
      orderBy: 'createdAt'
    }

    return getBooks(searchOptions);
  });

  const {
    data: collectionsData,
    isLoading: isCollectionLoading,
    isError: isCollectionsError,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<IListApiView<ICollection>>(['collections'], ({ pageParam }) => {
    const searchOptions: ISearchOptions = {
      pageSize: 12,
      page: pageParam,
      order: SortDirections.Asc,
      orderBy: 'createdAt'
    }

    return getCollections(searchOptions);
  });

  const loadMoreCollections = useCallback((): void => {
    setPageCollections((currentValue: number) => {
      fetchNextPage({ pageParam: currentValue + 1 });
      return currentValue + 1;
    });
  }, [fetchNextPage]);

  return {
    booksData,
    isBooksLoading,
    isCollectionLoading,
    isBooksError,
    isCollectionsError,
    collectionsData,
    isAuthorized,
    user,
    pageCollections,
    isFetchingNextPage,
    loadMoreCollections,
    navigateToBookPage,
    navigateToCollectionPage
  }
}

