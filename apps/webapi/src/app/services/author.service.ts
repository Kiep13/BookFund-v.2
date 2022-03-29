import { ILike } from 'typeorm';

import { connection } from  '@core/connection';
import { SortDirections } from '@core/enums';
import { IAuthorForm, IListApiView, ISearchOptions } from '@core/interfaces';
import { AuthorEntity } from '@entities/author.entity';

class AuthorService {
  public buildAuthorFromBody(requestBody: IAuthorForm): AuthorEntity {
    const author: AuthorEntity = new AuthorEntity();

    author.name = requestBody.name;
    author.surname = requestBody.surname;
    author.biography = requestBody.biography;
    author.image = requestBody.imageUrl;

    return author;
  }

  public async getAuthors(requestParams: ISearchOptions): Promise<IListApiView<AuthorEntity>> {
    const [authors, count] = await connection.getRepository(AuthorEntity).findAndCount({
      select: ['id', 'surname', 'name', 'createdAt', 'updatedAt'],
      relations: ['books'],
      order: {
        ...(requestParams.orderBy && requestParams.orderBy !== 'fullName' ? {
          [requestParams.orderBy]: requestParams.order || SortDirections.ASC
        } : {
          surname: requestParams.order || SortDirections.ASC,
          name: requestParams.order || SortDirections.ASC,
        })
      },
      take: +requestParams.pageSize,
      skip: (+requestParams.pageSize * +requestParams.page),
      where: [
        {surname: ILike(`%${requestParams.searchTerm || ''}%`)},
        {name: ILike(`%${requestParams.searchTerm || ''}%`)},
      ]
    });

    authors.map((author: AuthorEntity) => {
      author.amountBooks = author.books.length;
      delete author.books;
      author.fullName = `${author.name || ''} ${author.surname || ''}`
    });

    return {
      data: authors,
      count: count
    }
  }
}

export const authorService = new AuthorService();
