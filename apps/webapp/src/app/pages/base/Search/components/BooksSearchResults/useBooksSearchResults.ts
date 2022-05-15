import { useState } from 'react';

import { API_TOOLTIP_ERROR } from '@utils/constants';
import { DodecagonPageSizes } from '@utils/enums';
import { useAlerts, useApi, useBookActions } from '@utils/hooks';
import { IBook, IListApiView, ISearchOptions } from '@utils/interfaces';

export const useBooksSearchResults = (searchResults: IListApiView<IBook>, searchTerm: string) => {
  const [books, setBooks] = useState<IBook[]>(searchResults.data);
  const [count, setCount] = useState<number>(searchResults.count);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const {getBooks} = useApi();
  const {addError} = useAlerts();
  const {navigateToBookPage} = useBookActions();

  const loadData = (pageValue: number): void => {
    setLoading(true);
    setPage(pageValue);

    const searchOptions: ISearchOptions = {
      page: pageValue,
      pageSize: DodecagonPageSizes.Twelve,
      searchTerm
    }

    getBooks(searchOptions)
      .then((response: IListApiView<IBook>) => {
        setBooks([
          ...books,
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
    books,
    count,
    loading,
    navigateToBookPage,
    loadMore
  }
}
