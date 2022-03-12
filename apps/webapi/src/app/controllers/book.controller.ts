import { Request, Response } from 'express';
import { ILike } from 'typeorm';

import { IListApiView } from '@core/interfaces';
import { ApiRoutes, ResponseStatuses, SortDirections } from '@core/enums';
import { connection } from '@core/connection';
import { environment } from '@environments/environment';
import { BookEntity } from '@entities/book.entity';
import { bookService } from '@services/book.service';
import { imageService } from '@services/image.service';

class BookController {
  public async createBook(request: Request, response: Response, next: Function): Response {
    try {
      const book: BookEntity = bookService.buildBookFromBody(request.body);
      book.genres = request.body.genres;

      await connection.manager.save(book);
      return response.status(ResponseStatuses.STATUS_CREATED).json(book);
    } catch (error) {
      next(error)
    }
  }

  public async updateBook(request: Request, response: Response, next: Function): Response {
    try {
      const bookId = +request.params.id;

      const currentBook = await connection.manager.findOne(BookEntity, bookId, {
        relations: ['genres']
      });
      if (currentBook.image !== request.body.imageUrl && currentBook.image.includes(`${environment.selfUrl}/v1/${ApiRoutes.IMAGE}`)) {
        await imageService.deleteImage(currentBook.image);
      }

      await connection.manager.createQueryBuilder(BookEntity, 'book')
        .relation(BookEntity, 'genres')
        .of(currentBook)
        .addAndRemove(request.body.genres, currentBook.genres);

      const book: BookEntity = bookService.buildBookFromBody(request.body);
      delete book.genres;

      await connection.manager.update(BookEntity, bookId, book);

      return response.status(ResponseStatuses.STATUS_OK).json(book);
    } catch (error) {
      next(error)
    }
  }

  public async getBook(request: Request, response: Response, next: Function): Response {
    try {
      const bookId = +request.params.id;
      const book = await connection.manager.getRepository(BookEntity).findOne({
        relations: ['author', 'genres'],
        where: {
          id: bookId
        }
      });

      return response.status(ResponseStatuses.STATUS_OK).json(book);
    } catch (error) {
      next(error)
    }
  }

  public async getBooks(request: Request, response: Response, next: Function): Response {
    try {
      const requestParams = request.query;

      requestParams.orderBy = requestParams.orderBy && requestParams.orderBy !== 'authorFullName' ?
        `book.${requestParams.orderBy}` : requestParams.orderBy;

      const [books, count] = await connection.createQueryBuilder(BookEntity, 'book')
        .select([
          'book.id',
          'book.title',
          'book.amountPages',
          'book.year',
          'book.image',
          'book.description',
          'book.createdAt',
          'book.updatedAt'
        ])
        .leftJoinAndSelect('book.author', 'author')
        .orderBy({
          ...(
            requestParams.orderBy && requestParams.orderBy === 'authorFullName' ?
              {
                'author.surname': requestParams.order || SortDirections.ASC,
                'author.name': requestParams.order || SortDirections.ASC,
              } :
              {
                [requestParams.orderBy || 'book.title']: requestParams.order || SortDirections.ASC
              }
          )
        })
        .take(+requestParams.pageSize)
        .skip(+requestParams.pageSize * (+requestParams.page || 0))
        .where({
          title: ILike(`%${requestParams.searchTerm || ''}%`),
          ...( requestParams.keyId ? {
            author: {
              id: +requestParams.keyId
          }} : {})
        })
        .getManyAndCount();

      const result: IListApiView<BookEntity> = {
        data: books,
        count: count
      }

      return response.status(ResponseStatuses.STATUS_OK).json(result);
    } catch (error) {
      next(error)
    }
  }

  public async deleteBook(request: Request, response: Response, next: Function): Response {
    try {
      const bookId = +request.params.id;

      const book = await connection.manager.findOne(BookEntity, bookId);
      await connection.manager.remove(book);

      return response.status(ResponseStatuses.STATUS_NO_CONTENT).json({});
    } catch (error) {
      next(error)
    }
  }
}

export const bookController = new BookController();
