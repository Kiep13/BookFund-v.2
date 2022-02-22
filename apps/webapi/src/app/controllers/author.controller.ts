import { Request, Response } from 'express';
import { ILike } from 'typeorm';

import { ResponseStatuses, SortDirections } from '@core/enums';
import { IListApiView } from '@core/interfaces';
import { connection } from '@core/connection';
import { AuthorEntity } from '@entities/author.entity';

class AuthorController {
  public async createAuthor(request: Request, response: Response, next: Function): Response {
    const author: AuthorEntity = new AuthorEntity();

    author.name = request.body.name;
    author.surname = request.body.surname;
    author.image = request.body.imageUrl;
    author.biography = request.body.biography;

    if(request.body.imageUrl) {
      author.image = request.body.imageUrl;
    }

    await connection.manager.save(author);
    return response.status(ResponseStatuses.STATUS_CREATED).json(author);
  }

  public async getAuthors(request: Request, response: Response, next: Function): Response {
    const requestParams = request.query;

    const [authors, count] = await connection.getRepository(AuthorEntity).findAndCount({
      select: ['id', 'surname', 'name', 'createdAt', 'updatedAt'],
      order: {
        surname: SortDirections.ASC,
        name: SortDirections.ASC,
      },
      take: +requestParams.pageSize,
      where: [
        { surname: ILike(`%${requestParams.searchTerm || ''}%`) },
        { name: ILike(`%${requestParams.searchTerm || ''}%`) },
      ]
    });

    const result: IListApiView<AuthorEntity> = {
      data: authors,
      count: count
    }

    return response.status(ResponseStatuses.STATUS_OK).json(result);
  }
}

export const authorController = new AuthorController();
