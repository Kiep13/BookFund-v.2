import axios, { AxiosResponse } from 'axios';
import queryString from 'query-string';

import { API_TOOLTIP_ERROR } from '@core/constants';
import { useAlerts } from '@features/alertsBlock/hooks';
import { environment } from '@environments/environment';
import { IAuthor, IGenre, IListApiView, ISearchOptions } from '@core/interfaces';
import { IAuthorForm } from '@pages/admin/authorForm/interfaces';
import { IBookForm } from '@pages/admin/bookForm/interfaces';
import { IGenreForm } from '@pages/admin/genreForm/interfaces';

export const useApi = () => {
  const { addError } = useAlerts();

  const saveImage = async (formData: FormData): Promise<string> => {
    return await axios.post<string>(`${environment.backEndUrl}/v1/image/save`, formData)
      .then((response: AxiosResponse) => response.data)
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
      });
  }

  const addAuthor = async (author: IAuthorForm): Promise<void> => {
    return await axios.post<void>(`${environment.backEndUrl}/v1/author/new`, author)
      .then((response: AxiosResponse) => response.data)
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
      });
  }

  const updateAuthor = async (id: number, author: IAuthorForm): Promise<void> => {
    return await axios.put(`${environment.backEndUrl}/v1/author/update/${id}`, author)
      .then((response: AxiosResponse) => response.data)
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
      });
  }

  const getAuthor = async (id: number): Promise<IAuthor>  => {
    return await axios.get(`${environment.backEndUrl}/v1/author/${id}`)
      .then((response: AxiosResponse) => response.data)
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
      });
  }

  const getAuthors = async (searchOptions: ISearchOptions): Promise<IListApiView<IAuthor>> => {
    const requestParams = queryString.stringify(searchOptions);

    return await axios.get(`${environment.backEndUrl}/v1/author/list/?${requestParams}`)
      .then((response: AxiosResponse) => response.data)
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
      });
  }

  const deleteAuthor = async (id: number): Promise<void> => {
    return axios.delete(`${environment.backEndUrl}/v1/author/delete/${id}`)
      .then((response: AxiosResponse) => response.data)
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
      });
  }

  const addGenre = async (genre: IGenreForm): Promise<void> => {
    return await axios.post(`${environment.backEndUrl}/v1/genre/new`, genre)
      .then((response: AxiosResponse) => response.data)
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
      });
  }

  const getGenres = async (searchOptions: ISearchOptions): Promise<IGenre[]> => {
    const requestParams = queryString.stringify(searchOptions);

    return await axios.get(`${environment.backEndUrl}/v1/genre/list/?${requestParams}`)
      .then((response: AxiosResponse) => response.data)
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
      });
  }

  const addBook = async (book: IBookForm): Promise<void> => {
    return await axios.post(`${environment.backEndUrl}/v1/book/new`, book)
      .then((response: AxiosResponse) => response.data)
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
      });
  }

  return {
    saveImage,
    addAuthor,
    updateAuthor,
    getAuthor,
    getAuthors,
    deleteAuthor,
    addGenre,
    getGenres,
    addBook
  }
}
