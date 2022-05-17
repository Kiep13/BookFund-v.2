import { AxiosResponse } from 'axios';
import queryString from 'query-string';

import { environment } from '@environments/environment';
import { IAuthorForm } from '@pages/admin/AuthorForm/interfaces';
import { IBookForm } from '@pages/admin/BookForm/interfaces';
import { ICollectionForm } from '@pages/admin/CollectionForm/interfaces';
import { IGenreForm } from '@pages/admin/GenreForm/interfaces';
import { axiosInstance as axios, API_TOOLTIP_ERROR } from '@utils/constants';
import { useAlerts } from '@utils/hooks';
import {
  IArticle,
  IAuthor,
  IAuthResponse,
  IBook,
  ICollection,
  IComment,
  IGenre,
  IFavorite,
  IListApiView,
  ISearchOptions,
  ISearchResults
} from '@utils/interfaces';

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
      .then((response: AxiosResponse) => response.data);
  }

  const saveFile = async (formData: FormData): Promise<string> => {
    return await axios.post<string>(`${environment.backEndUrl}/v1/book/file/save`, formData)
      .then((response: AxiosResponse) => response.data);
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

  const getComments = async (searchOptions: ISearchOptions): Promise<IListApiView<IComment>> => {
    const requestParams = queryString.stringify(searchOptions);

    return await axios.get<IListApiView<IComment>>(`${environment.backEndUrl}/v1/comment/list/?${requestParams}`)
      .then((response: AxiosResponse) => response.data)
  }

  const addComment = async (comment: IComment): Promise<IComment> => {
    return await axios.post<IComment>(`${environment.backEndUrl}/v1/comment/new`, comment)
      .then((response: AxiosResponse<IComment>) => response.data);
  }

  const getFavorites = async (searchOptions: ISearchOptions): Promise<IListApiView<IFavorite>> => {
    const requestParams = queryString.stringify(searchOptions);

    return await axios.get<IListApiView<IFavorite>>(`${environment.backEndUrl}/v1/favorite/list/?${requestParams}`)
      .then((response: AxiosResponse) => response.data)
  }

  const addFavorite = async (book: IBook): Promise<IFavorite> => {
    return await axios.post<IFavorite>(`${environment.backEndUrl}/v1/favorite/new`, book)
      .then((response: AxiosResponse<IFavorite>) => response.data);
  }

  const deleteFavorite = async (id: number): Promise<AxiosResponse<void>> => {
    return axios.delete<void>(`${environment.backEndUrl}/v1/favorite/delete/${id}`);
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

  const search = async (searchOptions: ISearchOptions): Promise<ISearchResults> => {
    const requestParams = queryString.stringify(searchOptions);

    return await axios.get<ISearchResults>(`${environment.backEndUrl}/v1/search/?${requestParams}`)
      .then((response: AxiosResponse) => response.data)
  }

  const getReadingInfo = async (id: number): Promise<IFavorite> => {
    return await axios.get<IFavorite>(`${environment.backEndUrl}/v1/read/${id}`)
      .then((response: AxiosResponse) => response.data);
  }

  const updateReadingInfo = async (favorite: IFavorite): Promise<void> => {
    return await axios.post<void>(`${environment.backEndUrl}/v1/read/update`, favorite)
      .then((response: AxiosResponse) => response.data);
  }

  const getBookFile = async (bookFileUrl: string): Promise<any> => {
    return await axios.get(`${environment.backEndUrl}${bookFileUrl}`, { responseType: 'arraybuffer' });
  }

  const getArticle = async (url: string): Promise<IArticle>  => {
    return await axios.post<IArticle>(`${environment.backEndUrl}/v1/article/new`, {
      url
    })
      .then((response: AxiosResponse) => response.data);
  }

  return {
    login,
    refresh,
    logout,
    saveImage,
    saveFile,
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
    getComments,
    addComment,
    getFavorites,
    addFavorite,
    deleteFavorite,
    addCollection,
    updateCollection,
    getCollection,
    getCollections,
    deleteCollection,
    search,
    getReadingInfo,
    updateReadingInfo,
    getBookFile,
    getArticle
  }
}
