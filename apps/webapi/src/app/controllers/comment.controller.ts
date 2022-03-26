import { Request, Response } from 'express';

import { connection } from '@core/connection';
import { ResponseStatuses } from '@core/enums';
import { CommentEntity } from '@entities/comment.entity'
import { bookService } from '@services/book.service';

class CommentController {
  public async createComment(request: Request, response: Response, next: Function): Response {
    try {
      const comment: CommentEntity = new CommentEntity();
      comment.account = request.account;
      comment.book = request.body.book;
      comment.rate = request.body.rate;
      request.body.text && (comment.text = request.body.text);

      await connection.manager.insert(CommentEntity, comment);

      await bookService.updateBookAverageRate(request.body.book.id);

      return response.status(ResponseStatuses.STATUS_CREATED).json(comment);
    } catch (error) {
      next(error)
    }
  }
}

export const commentController = new CommentController();
