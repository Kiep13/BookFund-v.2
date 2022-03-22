import { AxiosResponse } from 'axios';
import queryString from 'query-string';

import { environment } from '@environments/environment';
import { IAuthorForm } from '@pages/admin/AuthorForm/interfaces';
import { IBookForm } from '@pages/admin/BookForm/interfaces';
import { ICollectionForm } from '@pages/admin/collectionForm/interfaces';
import { IGenreForm } from '@pages/admin/genreForm/interfaces';
import { axios, API_TOOLTIP_ERROR } from '@utils/constants';
import { useAlerts } from '@utils/hooks';
import { IAuthor, IAuthResponse, IBook, ICollection, IGenre, IListApiView, ISearchOptions } from '@utils/interfaces';

export const useApi = () => {
  const { addError } = useAlerts();

  const login = async (provider: string, code: string): Promise<IAuthResponse> => {
    return await axios.get(`${environment.backEndUrl}/v1/auth/${provider}`, {
      params: {
        code
      }
    })
      .then((response: AxiosResponse) => response.data);
  }

  const refresh = async (): Promise<IAuthResponse> => {
    return await axios.get(`${environment.backEndUrl}/v1/auth/refresh`)
      .then((response: AxiosResponse) => response.data);
  }

  const logout = async (): Promise<void> => {
    return await axios.get(`${environment.backEndUrl}/v1/auth/logout`);
  }

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
      .then((response: AxiosResponse) => response.data);
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
      .then((response: AxiosResponse) => response.data);
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
    return await axios.post(`${environment.backEndUrl}/v1/book/new`, book);
  }

  const updateBook = async (id: number, book: IBookForm): Promise<AxiosResponse<void>> => {
    return await axios.put(`${environment.backEndUrl}/v1/book/update/${id}`, book);
  }

  const getBook = async (id: number): Promise<IBook>  => {
    return await axios.get(`${environment.backEndUrl}/v1/book/${id}`)
      .then((response: AxiosResponse) => response.data);
  }

  const getBooks = async (searchOptions: ISearchOptions): Promise<IListApiView<IBook>> => {
    const requestParams = queryString.stringify(searchOptions);

    return await axios.get<IListApiView<IBook>>(`${environment.backEndUrl}/v1/book/list/?${requestParams}`)
      .then((response: AxiosResponse) => response.data)
  }

  const deleteBook = async (id: number): Promise<AxiosResponse<void>> => {
    return axios.delete<void>(`${environment.backEndUrl}/v1/book/delete/${id}`);
  }

  const addCollection = async (collection: ICollectionForm): Promise<AxiosResponse<void>> => {
    return await axios.post<void>(`${environment.backEndUrl}/v1/collection/new`, collection);
  }

  const updateCollection = async (id: number, collection: ICollectionForm): Promise<AxiosResponse<void>> => {
    return await axios.put(`${environment.backEndUrl}/v1/collection/update/${id}`, collection);
  }

  const getCollection = async (id: number): Promise<ICollection>  => {
    return await axios.get(`${environment.backEndUrl}/v1/collection/${id}`)
      .then((response: AxiosResponse<ICollection>) => response.data);
  }

  const getCollections = async (searchOptions: ISearchOptions): Promise<IListApiView<ICollection>> => {
    const requestParams = queryString.stringify(searchOptions);

    return await axios.get<ICollection[]>(`${environment.backEndUrl}/v1/collection/list/?${requestParams}`)
      .then((response: AxiosResponse) => response.data)
  }

  const deleteCollection = async (id: number): Promise<AxiosResponse<void>> => {
    return axios.delete<void>(`${environment.backEndUrl}/v1/collection/delete/${id}`);
  }

  return {
    login,
    refresh,
    logout,
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
    updateBook,
    getBook,
    getBooks,
    deleteBook,
    addCollection,
    updateCollection,
    getCollection,
    getCollections,
    deleteCollection
  }
}
