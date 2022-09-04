import { useState } from 'react';

import { API_TOOLTIP_ERROR } from '@utils/constants';
import { DodecagonPageSizes } from '@utils/enums';
import { useAlerts, useApi, useCollectionActions } from '@utils/hooks';
import { ICollection, IListApiView, ISearchOptions } from '@utils/interfaces';

export const useCollectionsSearchResult = (searchResults: IListApiView<ICollection>, searchTerm: string) => {
  const [collections, setCollections] = useState<ICollection[]>(searchResults.data);
  const [count, setCount] = useState<number>(searchResults.count);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const {getCollections} = useApi();
  const {addError} = useAlerts();
  const {navigateToCollectionPage} = useCollectionActions();

  const loadData = (pageValue: number): void => {
    setLoading(true);
    setPage(pageValue);

    const searchOptions: ISearchOptions = {
      page: pageValue,
      pageSize: DodecagonPageSizes.Twelve,
      searchTerm
    }

    getCollections(searchOptions)
      .then((response: IListApiView<ICollection>) => {
        setCollections((collections) => {
          return [
            ...collections,
            ...response.data
          ];
        });
        setCount(response.count);
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  const loadMore = (): void => {
    loadData(page + 1);
  }

  return {
    collections,
    count,
    loading,
    navigateToCollectionPage,
    loadMore
  }
}
