import axios, { AxiosResponse } from 'axios';

import { environment } from '@environments/environment';
import { IAuthorForm } from '@pages/admin/author-form/interfaces';
import { IGenreForm } from '@pages/admin/genre-form/interfaces';

class ApiService {
  public async saveImage(formData: FormData): Promise<string> {
    return await axios.post(`${environment.backEndUrl}/v1/image/save`, formData)
      .then((response: AxiosResponse) => response.data);
  }

  public async addAuthor(author: IAuthorForm): Promise<void> {
    return await axios.post(`${environment.backEndUrl}/v1/author/new`, author);
  }

  public async addGenre(genre: IGenreForm): Promise<void> {
    return await axios.post(`${environment.backEndUrl}/v1/genre/new`, genre);
  }
}

export const apiService = new ApiService();
