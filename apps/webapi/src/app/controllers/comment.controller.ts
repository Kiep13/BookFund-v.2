import { IsNull, Not } from 'typeorm';
import { Request, Response } from 'express';

import { connection } from '@core/connection';
import { ResponseStatuses, SortDirections } from '@core/enums';
import { IListApiView, ICustomRequest, ISearchOptions } from '@core/interfaces';
import { CommentEntity } from '@entities/comment.entity'
import { bookService } from '@services/book.service';

class CommentController {
  public async createComment(request: ICustomRequest, response: Response, next: Function): Promise<Response> {
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

  public async getComments(request: ICustomRequest, response: Response, next: Function): Promise<Response> {
    try {
      const requestParams: ISearchOptions = request.query;

      requestParams.orderBy = requestParams.orderBy ? `comment.${requestParams.orderBy}` : requestParams.orderBy;

      const [comments, count] = await connection.createQueryBuilder(CommentEntity, 'comment')
        .select([
          'comment.id',
          'comment.rate',
          'comment.text',
          'comment.account',
          'comment.createdAt'
        ])
        .leftJoinAndSelect('comment.account', 'account')
        .orderBy({
          ...(
            requestParams.orderBy ?
              {
                [requestParams.orderBy]: requestParams.order || SortDirections.ASC
              } :
              {
                'comment.id': requestParams.order || SortDirections.DESC
              }
          )
        })
        .take(+requestParams.pageSize)
        .skip((+requestParams.pageSize * (+requestParams.page || 0)) + (+requestParams.skip || 0))
        .where({
          book: {
            id: +requestParams.keyId
          },
          text: Not(IsNull())
        })
        .getManyAndCount();

      const result: IListApiView<CommentEntity> = {
        data: comments,
        count: count
      }

      return response.status(ResponseStatuses.STATUS_OK).json(result);
    } catch (error) {
      next(error)
    }
  }
}

export const commentController = new CommentController();
