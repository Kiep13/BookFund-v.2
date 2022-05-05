import { Request, Response } from 'express';

import { BookStatuses, ResponseStatuses } from '@core/enums';
import { readingService } from '@services/reading.service';

class ReadController {
  public async getFile(request: Request, response: Response, next: Function): Response {
    try {
      const bookId = +request.params.id;
      const accountId = request.account.id;

      let favorite = await readingService.getActualReadingInfo(bookId, accountId);

      if(!favorite) {
        favorite = await readingService.createFavorite(bookId, request.account);
      } else if(favorite.status === BookStatuses.WANT_TO_READ || favorite.status === BookStatuses.DONE) {
        favorite = await readingService.updateFavoriteStatus(favorite);
      }

      return response.status(ResponseStatuses.STATUS_OK).json(favorite);
    } catch (error) {
      next(error)
    }
  }
}

export const readController = new ReadController();
