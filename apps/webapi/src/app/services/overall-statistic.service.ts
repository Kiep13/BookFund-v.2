import { connection } from '@core/connection';
import { MonthTypes } from '@core/enums';
import { IDateRange, IOverallItem, IOverallRaw, IOverallStatistic } from '@core/interfaces';
import { AccountEntity } from '@entities/account.entity';
import { CommentEntity } from '@entities/comment.entity';
import { FavoriteEntity } from '@entities/favorite.entity';

class OverallStatisticService {
  public async getOverallStatistic(dateRange: IDateRange, currentMonth: number): Promise<IOverallStatistic> {
    const usersStatistic: IOverallRaw[] = await OverallStatisticService.getEntityChangesData(AccountEntity, dateRange, currentMonth);
    const favoritesStatistic = await OverallStatisticService.getEntityChangesData(FavoriteEntity, dateRange, currentMonth);
    const commentsStatistic = await OverallStatisticService.getEntityChangesData(CommentEntity, dateRange, currentMonth);

    const usersTotal: number = await connection.manager.count(AccountEntity);
    const favoritesTotal: number = await connection.manager.count(FavoriteEntity);
    const commentsTotal: number = await connection.manager.count(CommentEntity);

    return {
      users: OverallStatisticService.buildPositionResult(usersStatistic, usersTotal),
      favorites: OverallStatisticService.buildPositionResult(favoritesStatistic, favoritesTotal),
      comments: OverallStatisticService.buildPositionResult(commentsStatistic, commentsTotal)
    };
  }

  private static async getEntityChangesData(entity: any, dateRange: IDateRange, currentMonth: number): Promise<IOverallRaw[]> {
    return await connection.createQueryBuilder(entity, 'entity')
      .select('COUNT(entity.id)', 'amount')
      .addSelect(`CASE
            WHEN EXTRACT(MONTH FROM entity.createdAt) = ${currentMonth} THEN \'${MonthTypes.CURRENT}\'
            ELSE \'${MonthTypes.PREVIOUS}\'
            END
         `, 'type')
      .groupBy('type')
      .where(`entity.createdAt BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'`)
      .getRawMany()  as IOverallRaw[];
  }

  private static buildPositionResult(data: IOverallRaw[], total: number): IOverallItem {
    return {
      previous: OverallStatisticService.getFieldValue(data, MonthTypes.PREVIOUS),
      current: OverallStatisticService.getFieldValue(data, MonthTypes.CURRENT),
      total: total
    }
  }

  private static getFieldValue(data: IOverallRaw[], field: MonthTypes): number {
    return +data.find((item) => item.type === field)?.amount || 0;
  }
}

export const overallStatisticService = new OverallStatisticService();
