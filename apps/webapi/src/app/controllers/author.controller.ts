import { Request, Response } from 'express';
import { ILike } from 'typeorm';

import { ApiRoutes, ResponseStatuses, SortDirections } from '@core/enums';
import { IListApiView } from '@core/interfaces';
import { connection } from '@core/connection';
import { environment } from '@environments/environment';
import { AuthorEntity } from '@entities/author.entity';
import { authorService } from '@services/author.service';
import { imageService } from '@services/image.service';

class AuthorController {
  public async createAuthor(request: Request, response: Response, next: Function): Response {
    const author: AuthorEntity = authorService.buildAuthorFromBody(request.body);

    await connection.manager.save(author);
    return response.status(ResponseStatuses.STATUS_CREATED).json(author);
  }

  public async updateAuthor(request: Request, response: Response, next: Function): Response {
    const authorId = +request.params.id;

    const currentAuthor = await connection.manager.findOne(AuthorEntity, authorId);
    if(currentAuthor.image !== request.body.imageUrl && currentAuthor.image.includes(`${environment.selfUrl}/v1/${ApiRoutes.IMAGE}`)) {
      await imageService.deleteImage(currentAuthor.image);
    }

    const author: AuthorEntity = authorService.buildAuthorFromBody(request.body);

    await connection.manager.update(AuthorEntity, authorId, author);
    return response.status(ResponseStatuses.STATUS_OK).json(author);
  }

  public async getAuthor(request: Request, response: Response, next: Function): Response {
    const authorId = +request.params.id;
    const author = await connection.manager.findOne(AuthorEntity, authorId);

    return response.status(ResponseStatuses.STATUS_OK).json(author);
  }

  public async getAuthors(request: Request, response: Response, next: Function): Response {
    const requestParams = request.query;

    const [authors, count] = await connection.getRepository(AuthorEntity).findAndCount({
      select: ['id', 'surname', 'name', 'createdAt', 'updatedAt'],
      order: {
        ...(requestParams.orderBy && requestParams.orderBy !== 'fullName' ? {
          [requestParams.orderBy]: requestParams.order || SortDirections.ASC
        }: {
          surname: requestParams.order || SortDirections.ASC,
          name: requestParams.order || SortDirections.ASC,
        })
      },
      take: +requestParams.pageSize,
      skip: (+requestParams.pageSize * +requestParams.page),
      where: [
        { surname: ILike(`%${requestParams.searchTerm || ''}%`) },
        { name: ILike(`%${requestParams.searchTerm || ''}%`) },
      ]
    });

    authors.map((author: AuthorEntity) => {
      author.fullName = `${author.name || ''} ${author.surname || ''}`
    });

    const result: IListApiView<AuthorEntity> = {
      data: authors,
      count: count
    }

    return response.status(ResponseStatuses.STATUS_OK).json(result);
  }

  public async deleteAuthor(request: Request, response: Response, next: Function): Response {
    const authorId = +request.params.id;

    await connection.manager.delete(AuthorEntity, authorId);

    return response.status(ResponseStatuses.STATUS_NO_CONTENT).json({});
  }
}

export const authorController = new AuthorController();
