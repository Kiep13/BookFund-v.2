import { connection } from '@core/connection';
import { IDateRange, IOverallItem, IOverallRaw, IOverallStatistic } from '@core/interfaces';
import { AccountEntity } from '@entities/account.entity';
import { CommentEntity } from '@entities/comment.entity';
import { FavoriteEntity } from '@entities/favorite.entity';

class OverallStatisticService {
  public async getOverallStatistic(dateRange: IDateRange, currentMonth: number): Promise<IOverallStatistic> {
    const usersStatistic: IOverallRaw[] = await OverallStatisticService.getEntityChangesData(AccountEntity, dateRange, currentMonth);
    const favoritesStatistic = await OverallStatisticService.getEntityChangesData(FavoriteEntity, dateRange, currentMonth);
    const commentsStatistic = await OverallStatisticService.getEntityChangesData(CommentEntity, dateRange, currentMonth);

    const usersTotal: number = await OverallStatisticService.getTotalByPeriod(AccountEntity, dateRange.endDate);
    const favoritesTotal: number = await OverallStatisticService.getTotalByPeriod(FavoriteEntity, dateRange.endDate);
    const commentsTotal: number = await OverallStatisticService.getTotalByPeriod(CommentEntity, dateRange.endDate);

    return {
      users: OverallStatisticService.buildPositionResult(usersStatistic, usersTotal),
      favorites: OverallStatisticService.buildPositionResult(favoritesStatistic, favoritesTotal),
      comments: OverallStatisticService.buildPositionResult(commentsStatistic, commentsTotal)
    };
  }

  private static async getEntityChangesData(entity: any, dateRange: IDateRange, currentMonth: number): Promise<IOverallRaw[]> {
    return await connection.createQueryBuilder(entity, 'entity')
      .select('COUNT(entity.id)', 'amount')
      .where(`entity.createdAt BETWEEN '${dateRange.startDate}' AND '${dateRange.endDate}'`)
      .getRawMany()  as IOverallRaw[];
  }

  private static async getTotalByPeriod(entity: any, endDate): Promise<number> {
    return await connection.createQueryBuilder(entity, 'entity')
      .select('COUNT(entity.id)', 'amount')
      .where(`entity.createdAt <= '${endDate}'`)
      .getCount();
  }

  private static buildPositionResult(data: IOverallRaw[], total: number): IOverallItem {
    return {
      current: +data[0].amount || 0,
      total: total
    }
  }
}

export const overallStatisticService = new OverallStatisticService();
