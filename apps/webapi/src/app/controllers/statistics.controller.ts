import { Request, Response } from 'express';

import { connection } from '@core/connection';
import { DATE_API_FORMAT } from '@core/constants';
import { RateTypes, ResponseStatuses, SortDirections } from '@core/enums';
import {
  IActionsStatistic,
  IActionStatistic,
  IDateRange,
  IRateStatisticResponse,
  ITypedRateStatistic
} from '@core/interfaces';
import { AccountEntity } from '@entities/account.entity';
import { BookEntity } from '@entities/book.entity';
import { CommentEntity } from '@entities/comment.entity';
import { FavoriteEntity } from '@entities/favorite.entity';
import { dateService } from '@services/date.service';
import { overallStatisticService } from '@services/overall-statistic.service';

class StatisticsController {
  public async getOverallStatistics(request: Request, response: Response, next: Function): Response {
    const dateRange: IDateRange = dateService.transformFromApiToRangeDatesWithPreviousMonth(request.query.date);
    const currentMonth: number = dateService.getMonthFromDbDate(dateRange.endDate);

    try {
      const result = await overallStatisticService.getOverallStatistic(dateRange, currentMonth);

      return response.status(ResponseStatuses.STATUS_OK).json(result);
    } catch (error) {
      next(error)
    }
  }

  public async getGenresStatistics(request: Request, response: Response, next: Function): Response {
    const dateRange = dateService.transformFromApiToRangeDates(request.query.date);

    try {
      const genres = await connection.createQueryBuilder(BookEntity, 'book')
        .leftJoinAndSelect('book.genres', 'genres')
        .groupBy('genres.id')
        .select('COUNT(book.id)', 'amount')
        .addSelect('genres.id', 'id')
        .addSelect('genres.name', 'name')
        .orderBy('amount', SortDirections.DESC)
        .where(`book.createdAt BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'`)
        .limit(10)
        .getRawMany();

      return response.status(ResponseStatuses.STATUS_OK).json(genres);
    } catch (error) {
      next(error)
    }
  }

  public async getActionsStatistics(request: Request, response: Response, next: Function): Response {
    const dateRange = dateService.transformFromApiToRangeDates(request.query.date);

    try {
      const users: IActionStatistic[] = await connection.createQueryBuilder(AccountEntity, 'account')
        .groupBy('account.createdAt')
        .select('COUNT(account.id)', 'amount')
        .addSelect(`TO_CHAR(account.createdAt,\'${DATE_API_FORMAT}\')`, 'date')
        .orderBy('date', SortDirections.DESC)
        .where(`account.createdAt BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'`)
        .getRawMany();

      const favorites: IActionStatistic[]  = await connection.createQueryBuilder(FavoriteEntity, 'favorite')
        .groupBy('favorite.createdAt')
        .select('COUNT(favorite.id)', 'amount')
        .addSelect(`TO_CHAR(favorite.createdAt,\'${DATE_API_FORMAT}\')`, 'date')
        .orderBy('date', SortDirections.DESC)
        .where(`favorite.createdAt BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'`)
        .getRawMany();

      const comments: IActionStatistic[]  = await connection.createQueryBuilder(CommentEntity, 'comment')
        .groupBy('comment.createdAt')
        .select('COUNT(comment.id)', 'amount')
        .addSelect(`TO_CHAR(comment.createdAt,\'${DATE_API_FORMAT}\')`, 'date')
        .orderBy('date', SortDirections.DESC)
        .where(`comment.createdAt BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'`)
        .getRawMany();

      const result: IActionsStatistic = {
        users,
        favorites,
        comments
      }

      return response.status(ResponseStatuses.STATUS_OK).json(result);
    } catch (error) {
      next(error)
    }
  }

  public async getPopularBook(request: Request, response: Response, next: Function): Response {
    const dateRange = dateService.transformFromApiToRangeDates(request.query.date);

    try {
      const mostPopularBook = await connection.createQueryBuilder(FavoriteEntity, 'favorite')
        .leftJoinAndSelect('favorite.book', 'book')
        .leftJoinAndSelect('book.author', 'author')
        .groupBy('book.id')
        .select('COUNT(favorite.id)', 'amount')
        .addSelect('book.id', 'id')
        .orderBy('amount', SortDirections.DESC)
        .where(`favorite.createdAt BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'`)
        .limit(1)
        .getRawOne();

      if(!mostPopularBook?.id) {
        return response.status(ResponseStatuses.STATUS_OK).json(mostPopularBook);
      }

      const result = await connection.manager.findOne(BookEntity, mostPopularBook.id, {
        relations: ['author']
      });

      return response.status(ResponseStatuses.STATUS_OK).json(result);
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  public async getProvidersStatistic(request: Request, response: Response, next: Function): Response {
    const dateRange = dateService.transformFromApiToRangeDates(request.query.date);

    try {
      const statistics: IActionStatistic[] = await connection.createQueryBuilder(AccountEntity, 'account')
        .select('COUNT(account.id)', 'amount')
        .addSelect(`account.provider`, 'provider')
        .groupBy('account.provider')
        .orderBy('provider', SortDirections.DESC)
        .where(`account.createdAt BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'`)
        .getRawMany();

      return response.status(ResponseStatuses.STATUS_OK).json(statistics);
    } catch (error) {
      next(error)
    }
  }

  public async getRatesStatistic (request: Request, response: Response, next: Function): Response {
    const dateRange = dateService.transformFromApiToRangeDates(request.query.date);

    try {
      const rates: ITypedRateStatistic[] = await connection.createQueryBuilder(CommentEntity, 'comment')
        .select(`CASE
            WHEN comment.rate < 3 THEN \'${RateTypes.NEGATIVE}\'
            WHEN comment.rate >= 3 AND comment.rate < 4 THEN \'${RateTypes.NEUTRAL}\'
            WHEN comment.rate >= 4 THEN \'${RateTypes.POSITIVE}\'
            END
         `, 'type')
        .addSelect(`TO_CHAR(comment.createdAt,\'${DATE_API_FORMAT}\')`, 'date')
        .groupBy('date')
        .addGroupBy('type')
        .addSelect('COUNT(comment.id)', 'amount')
        .orderBy('date', SortDirections.DESC)
        .where(`comment.createdAt BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'`)
        .getRawMany();

    const statistic: IRateStatisticResponse = {
      positive: rates.filter((rate: ITypedRateStatistic) => rate.type === RateTypes.POSITIVE),
      neutral: rates.filter((rate: ITypedRateStatistic) => rate.type === RateTypes.NEUTRAL),
      negative: rates.filter((rate: ITypedRateStatistic) => rate.type === RateTypes.NEGATIVE),
    }

      return response.status(ResponseStatuses.STATUS_OK).json(statistic);
    } catch (error) {
      next(error)
    }
  }
}

export const statisticsController = new StatisticsController();
