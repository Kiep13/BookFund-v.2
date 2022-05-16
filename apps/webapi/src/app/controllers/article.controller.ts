import { Request, Response } from 'express';

import { ResponseStatuses } from '@core/enums';

class ArticleController {
  public async createArticle(request: Request, response: Response, next: Function): Response {
    try {
      const url = request.body.url;

      return response.status(ResponseStatuses.STATUS_CREATED).json(request.body);
    } catch (error) {
      next(error)
    }
  }
}

export const articleController = new ArticleController();
