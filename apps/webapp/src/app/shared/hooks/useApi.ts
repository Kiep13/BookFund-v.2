import axios, { AxiosResponse } from 'axios';
import queryString from 'query-string';

import { API_TOOLTIP_ERROR } from '@core/constants';
import { useAlerts } from '@features/alertsBlock/hooks';
import { environment } from '@environments/environment';
import { IAuthor, IBook, IGenre, IListApiView, ISearchOptions } from '@core/interfaces';
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

  const addAuthor = async (author: IAuthorForm): Promise<AxiosResponse<void>> => {
    return await axios.post<void>(`${environment.backEndUrl}/v1/author/new`, author);
  }

  const updateAuthor = async (id: number, author: IAuthorForm): Promise<AxiosResponse<void>> => {
    return await axios.put(`${environment.backEndUrl}/v1/author/update/${id}`, author);
  }

  const getAuthor = async (id: number): Promise<IAuthor>  => {
    return await axios.get(`${environment.backEndUrl}/v1/author/${id}`)
      .then((response: AxiosResponse<IAuthor>) => response.data);
  }

  const getAuthors = async (searchOptions: ISearchOptions): Promise<IListApiView<IAuthor>> => {
    const requestParams = queryString.stringify(searchOptions);

    return await axios.get(`${environment.backEndUrl}/v1/author/list/?${requestParams}`)
      .then((response: AxiosResponse) => response.data)
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
      });
  }

  const deleteAuthor = async (id: number): Promise<AxiosResponse<void>> => {
    return axios.delete(`${environment.backEndUrl}/v1/author/delete/${id}`);
  }

  const addGenre = async (genre: IGenreForm): Promise<void> => {
    return await axios.post(`${environment.backEndUrl}/v1/genre/new`, genre);
  }

  const updateGenre = async (id: number, author: IGenreForm): Promise<void> => {
    return await axios.put(`${environment.backEndUrl}/v1/genre/update/${id}`, author);
  }

  const getGenre = async (id: number): Promise<IGenre> => {
    return await axios.get(`${environment.backEndUrl}/v1/genre/${id}`)
      .then((response: AxiosResponse) => response.data)
  }

  const getGenres = async (searchOptions: ISearchOptions): Promise<IGenre[]> => {
    const requestParams = queryString.stringify(searchOptions);

    return await axios.get(`${environment.backEndUrl}/v1/genre/list/?${requestParams}`)
      .then((response: AxiosResponse) => response.data)
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
      });
  }

  const getGenresTree = async (): Promise<AxiosResponse<IGenre[]>> => {
    return await axios.get(`${environment.backEndUrl}/v1/genre/tree/`);
  }

  const deleteGenre = async (id: number): Promise<void> => {
    return axios.delete(`${environment.backEndUrl}/v1/genre/delete/${id}`);
  }

  const addBook = async (book: IBookForm): Promise<void> => {
    return await axios.post(`${environment.backEndUrl}/v1/book/new`, book)
      .then((response: AxiosResponse) => response.data)
      .catch(() => {
        addError(API_TOOLTIP_ERROR);
      });
  }

  const getBooks = async (searchOptions: ISearchOptions): Promise<IListApiView<IBook>> => {
    const requestParams = queryString.stringify(searchOptions);

    return await axios.get<IBook[]>(`${environment.backEndUrl}/v1/book/list/?${requestParams}`)
      .then((response: AxiosResponse) => response.data)
  }

  const deleteBook = async (id: number): Promise<AxiosResponse<void>> => {
    return axios.delete<void>(`${environment.backEndUrl}/v1/book/delete/${id}`);
  }

  return {
    saveImage,
    addAuthor,
    updateAuthor,
    getAuthor,
    getAuthors,
    deleteAuthor,
    addGenre,
    updateGenre,
    getGenre,
    getGenres,
    getGenresTree,
    deleteGenre,
    addBook,
    getBooks,
    deleteBook
  }
}
