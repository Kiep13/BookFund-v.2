import { Request, Response } from 'express';

import { IListApiView } from '@core/interfaces';
import { ResponseStatuses, SortDirections } from '@core/enums';
import { connection } from '@core/connection';
import { BookEntity } from "@entities/book.entity";

class BookController {
  public async createBook(request: Request, response: Response, next: Function): Response {
    try {
      const book: BookEntity = new BookEntity();

      book.title = request.body.title;
      book.amountPages = request.body.amountPages;
      book.year = request.body.year;
      book.author = request.body.author;
      book.genres = request.body.genres;
      book.description = request.body.description;

      if (request.body.imageUrl) {
        book.image = request.body.imageUrl;
      }

      await connection.manager.save(book);
      return response.status(ResponseStatuses.STATUS_CREATED).json(book);
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
        .select(['book.id', 'book.title', 'book.amountPages', 'book.year', 'book.createdAt', 'book.updatedAt'])
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
        .skip(+requestParams.pageSize * +requestParams.page)
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
}

export const bookController = new BookController();
