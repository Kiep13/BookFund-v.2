import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { useState } from 'react';

import { API_TOOLTIP_ERROR } from '@utils/constants';
import { useAlerts, useApi } from '@utils/hooks';
import { IBook, IGenre, IListApiView, IOption, ISearchOptions } from '@utils/interfaces';
import { CardStates, PageSizes } from '@utils/enums';

import { FORM_INITIAL_VALUE } from './constants';
import { IGenrePageParams } from './interfaces';

export const useGenre = () => {
  const [pageState, setPageState] = useState<CardStates>(CardStates.LOADING);
  const [loadingBooks, setLoadingBooks] = useState<boolean>(true);
  const [books, setBooks] = useState<IBook[]>([]);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0);

  const params = useParams();

  const {getGenres, getBooks} = useApi();
  const {addError} = useAlerts();

  const formik = useFormik({
    initialValues: FORM_INITIAL_VALUE,
    onSubmit: () => {
    }
  });

  const initPage = async () => {
    const genreName = (params as IGenrePageParams).genreName;

    if (!genreName) {
      setPageState(CardStates.CONTENT);
      return;
    }

    const searchOptions: ISearchOptions = {
      pageSize: PageSizes.Fifty,
      searchTerm: genreName
    };

    getGenres(searchOptions)
      .then((searchResults: IGenre[]) => {
        if (searchResults.length === 0) {
          return;
        }

        formik.setFieldValue('genre', searchResults[0]);
        loadBooks({
          subKey: searchResults[0]?.id
        });
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
        setPageState(CardStates.ERROR);
      });
  };

  const handleSelecting = (value?: IOption): void => {
    if (!value) {
      return;
    }

    setPage(0);
    setBooks([]);

    setPageState(CardStates.LOADING);
    setLoadingBooks(true);
    loadBooks({
      subKey: value?.id,
      page: 0
    });
  };

  const loadBooks = (options?: ISearchOptions): void => {
    const searchOptions: ISearchOptions = {
      pageSize: PageSizes.Ten,
      page: options?.page || page,
      ...(options?.subKey || formik.values.genre?.id ? {
        subKey: options?.subKey || formik.values.genre?.id
      } : {})
    };

    getBooks(searchOptions)
      .then((response: IListApiView<IBook>) => {
        setCount(response.count);
        setBooks([
          ...(!options?.subKey ? books : []),
          ...response.data
        ]);

        setLoadingBooks(false);
        setPageState(CardStates.CONTENT);
      })
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
      });
  };

  const handleLoadMore = (): void => {
    setPage(page + 1);
    setLoadingBooks(true);

    const searchOptions: ISearchOptions = {
      page: page + 1
    }

    loadBooks(searchOptions);
  };

  return {
    pageState,
    formik,
    books,
    loadingBooks,
    count,
    initPage,
    handleSelecting,
    handleLoadMore
  };
};
