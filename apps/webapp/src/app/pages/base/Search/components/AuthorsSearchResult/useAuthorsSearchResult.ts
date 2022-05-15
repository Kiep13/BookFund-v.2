import { useState } from 'react';

import { IAuthor, IListApiView, ISearchOptions } from '@utils/interfaces';
import { useAlerts, useApi, useAuthorActions } from '@utils/hooks';
import { DodecagonPageSizes } from '@utils/enums';
import { API_TOOLTIP_ERROR } from '@utils/constants';

export const useAuthorsSearchResult = (searchResults: IListApiView<IAuthor>, searchTerm: string) => {
  const [authors, setAuthors] = useState<IAuthor[]>(searchResults.data);
  const [count, setCount] = useState<number>(searchResults.count);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const {getAuthors} = useApi();
  const {addError} = useAlerts();
  const {navigateToAuthorPage} = useAuthorActions();

  const loadData = (pageValue: number): void => {
    setLoading(true);
    setPage(pageValue);

    const searchOptions: ISearchOptions = {
      page: pageValue,
      pageSize: DodecagonPageSizes.Twelve,
      searchTerm
    }

    getAuthors(searchOptions)
      .then((response: IListApiView<IAuthor>) => {
        setAuthors([
          ...authors,
          ...response.data
        ]);
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
    authors,
    count,
    loading,
    navigateToAuthorPage,
    loadMore
  }
}
