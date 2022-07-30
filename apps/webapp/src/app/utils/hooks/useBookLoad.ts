import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { API_TOOLTIP_ERROR } from '@utils/constants';
import { CardStates } from '@utils/enums';
import { useAlerts, useApi } from '@utils/hooks';
import { IBook, IFormPageParams } from '@utils/interfaces';

export const useBookLoad = () => {
  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [book, setBook] = useState<IBook>();

  const params = useParams();

  const {getBook} = useApi();
  const {addError} = useAlerts();

  const loadBook = useCallback((): void => {
    const bookId = (params as IFormPageParams).id;

    getBook(bookId)
      .then((response: IBook) => {
        setBook(response);
        setPageState(CardStates.CONTENT);
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
        setPageState(CardStates.ERROR);
      })
  }, []);

  const handleBookChange = useCallback((updatedBook: IBook) => {
    setBook({
      ...book,
      ...updatedBook
    })
  }, [book]);

  useEffect(() => {
    loadBook();
  }, []);

  return {
    pageState,
    book,
    loadBook,
    handleBookChange
  }
}

