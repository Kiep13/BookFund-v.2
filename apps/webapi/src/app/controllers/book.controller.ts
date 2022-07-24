import { Request, Response } from 'express';

import { IListApiView, ICustomRequest, ISearchOptions } from '@core/interfaces';
import { ApiRoutes, ResponseStatuses } from '@core/enums';
import { connection } from '@core/connection';
import { environment } from '@environments/environment';
import { BookEntity } from '@entities/book.entity';
import { CommentEntity } from '@entities/comment.entity';
import { bookService } from '@services/book.service';
import { imageService } from '@services/image.service';
import { fileService } from '@services/file.service';
import { tokenService } from '@services/token.service';

class BookController {
  public async createBook(request: Request, response: Response, next: Function): Promise<Response> {
    try {
      const book: BookEntity = bookService.buildBookFromBody(request.body);
      book.genres = request.body.genres;

      await connection.manager.save(book);
      return response.status(ResponseStatuses.STATUS_CREATED).json(book);
    } catch (error) {
      next(error)
    }
  }

  public async updateBook(request: Request, response: Response, next: Function): Promise<Response> {
    try {
      const bookId = +request.params.id;

      const currentBook = await connection.manager.findOne(BookEntity, bookId, {
        relations: ['genres']
      });

      if (currentBook.image !== request.body.imageUrl && currentBook.image.includes(`${environment.selfUrl}/v1/${ApiRoutes.IMAGE}`)) {
        await imageService.deleteImage(currentBook.image);
      }

      if (currentBook.fileUrl !== request.body.fileUrl) {
        await fileService.deleteFile(currentBook.fileUrl, environment.booksFolder);
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
      next(error);
    }
  }

  public async getBook(request: Request, response: Response, next: Function): Promise<Response> {
    try {
      const bookId = +request.params.id;
      const book = await connection.manager.getRepository(BookEntity).findOne({
        relations: ['author', 'genres'],
        where: {
          id: bookId
        }
      });

      book.ratesAmount = await connection.manager.getRepository(CommentEntity).count({
        where: {
          book: {
            id: bookId
          }
        }
      });

      const { refreshToken }  = request.cookies;

      if(refreshToken) {
        const account = await tokenService.validateRefreshToken(refreshToken);
        book.isCommented = await bookService.isCommentedByUser(bookId, account.id);
        book.favorite = await bookService.getFavoriteStatus(bookId, account.id);
      }

      return response.status(ResponseStatuses.STATUS_OK).json(book);
    } catch (error) {
      next(error)
    }
  }

  public async getBooks(request: ICustomRequest, response: Response, next: Function): Promise<Response> {
    try {
      const requestParams: ISearchOptions = request.query;

      requestParams.orderBy = requestParams.orderBy && requestParams.orderBy !== 'authorFullName' ?
        `book.${requestParams.orderBy}` : requestParams.orderBy;

      const result: IListApiView<BookEntity> = await bookService.getBooks(requestParams);

      return response.status(ResponseStatuses.STATUS_OK).json(result);
    } catch (error) {
      next(error)
    }
  }

  public async deleteBook(request: Request, response: Response, next: Function): Promise<Response> {
    try {
      const bookId = +request.params.id;

      const book = await connection.manager.findOne(BookEntity, bookId);
      await fileService.deleteFile(book.fileUrl, environment.booksFolder);

      if(book.image.includes(`${environment.selfUrl}/v1/${ApiRoutes.IMAGE}`)) {
        await imageService.deleteImage(book.image);
      }

      await connection.manager.remove(book);

      return response.status(ResponseStatuses.STATUS_NO_CONTENT).json({});
    } catch (error) {
      next(error)
    }
  }
}

export const bookController = new BookController();
