import { Request, Response } from 'express';

import { ResponseStatuses } from '@core/enums';
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
}

export const bookController = new BookController();
