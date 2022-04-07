import { Request, Response } from 'express';
import * as moment from 'moment';

import { connection } from '@core/connection';
import { DATE_API_FORMAT, DATE_DATABASE_FORMAT } from '@core/constants';
import { ResponseStatuses, SortDirections } from '@core/enums';
import { BookEntity } from '@entities/book.entity';

class StatisticsController {
  public async getGenresStatistics(request: Request, response: Response, next: Function): Response {
    const date = moment(request.query.date, DATE_API_FORMAT).toDate();
    const startDate = moment(date).startOf('month').startOf('date').format(DATE_DATABASE_FORMAT);
    const endDate = moment(date).endOf('month').endOf('date').format(DATE_DATABASE_FORMAT);

    try {
      const genres = await connection.createQueryBuilder(BookEntity, 'book')
        .leftJoinAndSelect('book.genres', 'genres')
        .groupBy('genres.id')
        .select('COUNT(book.id)', 'amount')
        .addSelect('genres.id', 'id')
        .addSelect('genres.name', 'name')
        .orderBy('amount', SortDirections.DESC)
        .where(`book.createdAt BETWEEN '${startDate}' AND '${endDate}'`)
        .limit(10)
        .getRawMany();

      return response.status(ResponseStatuses.STATUS_OK).json(genres);
    } catch (error) {
      next(error)
    }
  }
}

export const statisticsController = new StatisticsController();
