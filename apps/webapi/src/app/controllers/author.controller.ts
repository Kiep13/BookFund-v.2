import { Request, Response } from 'express';

import { ApiRoutes, ResponseStatuses } from '@core/enums';
import { IListApiView, ICustomRequest, ISearchOptions } from '@core/interfaces';
import { connection } from '@core/connection';
import { environment } from '@environments/environment';
import { AuthorEntity } from '@entities/author.entity';
import { authorService } from '@services/author.service';
import { imageService } from '@services/image.service';

class AuthorController {
  public async createAuthor(request: Request, response: Response, next: Function): Promise<Response> {
    try {
      const author: AuthorEntity = authorService.buildAuthorFromBody(request.body);

      await connection.manager.save(author);
      return response.status(ResponseStatuses.STATUS_CREATED).json(author);
    } catch (error) {
      next(error)
    }
  }

  public async updateAuthor(request: Request, response: Response, next: Function): Promise<Response> {
    try {
      const authorId = +request.params.id;

      const currentAuthor = await connection.manager.findOne(AuthorEntity, authorId);
      if (currentAuthor.image !== request.body.imageUrl && currentAuthor.image.includes(`${environment.selfUrl}/v1/${ApiRoutes.IMAGE}`)) {
        await imageService.deleteImage(currentAuthor.image);
      }

      const author: AuthorEntity = authorService.buildAuthorFromBody(request.body);

      await connection.manager.update(AuthorEntity, authorId, author);
      return response.status(ResponseStatuses.STATUS_OK).json(author);
    } catch (error) {
      next(error)
    }
  }

  public async getAuthor(request: Request, response: Response, next: Function): Promise<Response> {
    try {
      const authorId = +request.params.id;

      const author = await connection.createQueryBuilder(AuthorEntity, 'author')
        .leftJoinAndSelect('author.books', 'book')
        .groupBy('author.id')
        .select('COUNT(book.id)', 'amountBooks')
        .addSelect('CONCAT(author.name, \' \', author.surname)', 'fullName')
        .addSelect('author.id', 'id')
        .addSelect('author.name', 'name')
        .addSelect('author.surname', 'surname')
        .addSelect('author.image', 'image')
        .addSelect('author.biography', 'biography')
        .addSelect('author.createdAt', 'createdAt')
        .addSelect('author.updatedAt', 'updatedAt')
        .where(`author.id = ${authorId}`)
        .getRawOne()

      return response.status(ResponseStatuses.STATUS_OK).json(author);
    } catch (error) {
      next(error)
    }
  }

  public async getAuthors(request: ICustomRequest, response: Response, next: Function): Promise<Response> {
    try {
      const requestParams: ISearchOptions = request.query;

      const result: IListApiView<AuthorEntity> = await authorService.getAuthors(requestParams);

      return response.status(ResponseStatuses.STATUS_OK).json(result);
    } catch (error) {
      next(error)
    }
  }

  public async deleteAuthor(request: Request, response: Response, next: Function): Promise<Response> {
    try {
      const authorId = +request.params.id;

      const author = await connection.manager.findOne(AuthorEntity, authorId);
      await connection.manager.remove(author);

      if(author.image.includes(`${environment.selfUrl}/v1/${ApiRoutes.IMAGE}`)) {
        await imageService.deleteImage(author.image);
      }

      return response.status(ResponseStatuses.STATUS_NO_CONTENT).json({});
    } catch (error) {
      next(error)
    }
  }
}

export const authorController = new AuthorController();
