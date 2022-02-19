import { Request, Response } from 'express';
import { ILike } from 'typeorm';

import { ResponseStatuses, SortDirections } from '@core/enums';
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

    const authors = await connection.getRepository(AuthorEntity).find({
      select: ['id', 'surname', 'name' ],
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

    return response.status(ResponseStatuses.STATUS_OK).json(authors);
  }
}

export const authorController = new AuthorController();
