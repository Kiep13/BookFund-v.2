import { useParams } from 'react-router-dom';
import { useState } from 'react';

import { IBook, IFormPageParams, IListApiView, ISearchOptions } from '@utils/interfaces';
import { API_TOOLTIP_ERROR } from '@utils/constants';
import { useAlerts, useApi } from '@utils/hooks';
import { PageSizes } from '@utils/enums';

export const useAuthorContent = () => {
  const [count, setCount] = useState<number>(0);
  const [books, setBooks] = useState<IBook[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loadingBooks, setLoadingBooks] = useState<boolean>(true);

  const params = useParams();
  const {getBooks} = useApi();
  const {addError} = useAlerts();

  const loadBooks = (): void => {
    setLoadingBooks(true);
    const authorId = (params as IFormPageParams).id;

    const searchOptions: ISearchOptions = {
      pageSize: PageSizes.Ten,
      page: page,
      keyId: authorId
    };

    getBooks(searchOptions)
      .then((response: IListApiView<IBook>) => {
        setCount(response.count);
        setBooks((books) => {
          return [
            ...books,
            ...response.data
          ]
        });

        setLoadingBooks(false);
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
      });
  }

  const handleLoadMore = (): void => {
    setPage(page + 1);
  }

  return {
    books,
    count,
    loadingBooks,
    page,
    loadBooks,
    handleLoadMore
  }
}
