import axios, { AxiosResponse } from 'axios';
import queryString from 'query-string';

import { environment } from '@environments/environment';
import { IAuthor, IGenre, IListApiView, ISearchOptions } from '@core/interfaces';
import { IAuthorForm } from '@pages/admin/author-form/interfaces';
import { IBookForm } from '@pages/admin/book-form/interfaces';
import { IGenreForm } from '@pages/admin/genre-form/interfaces';

class ApiService {
  public async saveImage(formData: FormData): Promise<string> {
    return await axios.post(`${environment.backEndUrl}/v1/image/save`, formData)
      .then((response: AxiosResponse) => response.data);
  }

  public async addAuthor(author: IAuthorForm): Promise<void> {
    return await axios.post(`${environment.backEndUrl}/v1/author/new`, author);
  }

  public async updateAuthor(id: number, author: IAuthorForm): Promise<void> {
    return await axios.put(`${environment.backEndUrl}/v1/author/update/${id}`, author);
  }

  public async getAuthor(id: number): Promise<IAuthor> {
    return await axios.get(`${environment.backEndUrl}/v1/author/${id}`)
      .then((response: AxiosResponse) => response.data);
  }

  public async getAuthors(searchOptions: ISearchOptions): Promise<IListApiView<IAuthor>> {
    const requestParams = queryString.stringify(searchOptions);

    return await axios.get(`${environment.backEndUrl}/v1/author/list/?${requestParams}`)
      .then((response: AxiosResponse) => response.data);
  }

  public async deleteAuthor(id: number): Promise<void> {
    return axios.delete(`${environment.backEndUrl}/v1/author/delete/${id}`)
  }

  public async addGenre(genre: IGenreForm): Promise<void> {
    return await axios.post(`${environment.backEndUrl}/v1/genre/new`, genre);
  }

  public async getGenres(searchOptions: ISearchOptions): Promise<IGenre[]> {
    const requestParams = queryString.stringify(searchOptions);

    return await axios.get(`${environment.backEndUrl}/v1/genre/list/?${requestParams}`)
      .then((response: AxiosResponse) => response.data);
  }

  public async addBook(book: IBookForm): Promise<void> {
    return await axios.post(`${environment.backEndUrl}/v1/book/new`, book);
  }
}

export const apiService = new ApiService();
